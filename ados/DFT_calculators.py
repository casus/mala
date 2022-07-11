import math
import numpy as np
import scipy as sp
from scipy import integrate
from scipy import interpolate
from scipy.optimize import minimize
from scipy.optimize import root_scalar
from scipy.optimize import bisect
from scipy.optimize import toms748
from scipy.special import spence
import mpmath as mp
import matplotlib.pyplot as plt
from ase import Atoms
from ase.io import read
from functools import partial

# Constants


# Default temp (K)
temp = 298
#temp = 933

# Default gcc
gcc = 2.699

# Default Gaussian smearing in QE-DOS
sigma_qe = 0.032

# Boltzmann's constant
kB = 8.617333262145e-5

# Conversion factor from Rydberg to eV
Ry2eV = 13.6056980659

# Conversion factor from Bohr to Angstroms
Br2AA = 0.52917721



# Class that encapsulates the relevant results of a DFT calculation read from a file
class DFT_results:
    def __init__(self, out_file):
        # input:
        ## out_file: path to the output file from a DFT run using a code that 
        ## ase.io.read can read
        # attributes (you probably should consider all of these to be read only):
        ## out_file: the DFT output file used to construct the object
        ## eigs: the Kohn-Sham eigenvalues
        ### eigs rows: band index, row i: eigs[i , :]
        ### eigs cols: k points,   col j: eigs[: , j]
        ## kpoints: the kpoints used in the calculation
        ## kweights: the kweights for the kpoints used in the calculation
        ## fermi_energy: the Fermi energy printed in the output file
        ### note that the Fermi energy is not printed to enought digits to give 
        ### an accurate number of electrons
        
        atoms = read(filename=out_file)
        self.out_file = out_file
        self.eigs = np.transpose(atoms.get_calculator().band_structure().energies[0,:,:])
        self.kpoints = atoms.get_calculator().get_ibz_k_points()
        self.kweights = atoms.get_calculator().get_k_point_weights()
        self.fermi_energy = atoms.get_calculator().get_fermi_level()
        self.volume = atoms.get_volume()
        self.num_atoms = len(atoms)

        self.cell = atoms.get_cell()
        self.positions = atoms.get_positions()
        self.scaled_positions = atoms.get_scaled_positions()


        # I'd rather not do the following "grep" type search, but I can't find a 
        # ASE command to get n_electrons
        with open(out_file) as out:
            for line in out:
                if "number of electrons       =" in line:
                    self.n_electrons = np.float64(line.split('=')[1])
                    break




#----------------------------------------------------------------------------------------#
# Class that encapsulates the results of a Density-of-States calculation
class DOS:
    def __init__(self, dft, e_grid, dos):
        # You probably should not call this constructer directly.
        # Instead you should call one of the factory methods:
        ## DOS.from_calculation(dft, e_grid, delta_f)
        ## DOS.from_dos_file(dft, file)
        ## DOS.from_ldos_data(dft,e_grid,ldos_data)
        ## DOS.from_ados_data(dft,e_grid,ados_data)
        # attributes (you probably should consider all of these to be read only):
        ## dft: the DFT_results instance used to generate the DOS
        ## e_grid: the array of energy values at which the DOS is evauated
        ## dos: the DOS evaluated at the energies in e_grid
        
        self.dft = dft
        self.e_grid = e_grid
        self.dos = dos
            
    @classmethod
    def from_calculation(cls, dft, e_grid, delta_f):
        # input:
        ## dft: a DFT_results instance
        ## e_grid: energy grid [eV] on which to evaluate the DOS
        ## delta_f: a function that represents a delta function on a grid
        
        dos_per_band = delta_f(e_grid,dft.eigs)
        dos_per_band = dft.kweights[np.newaxis,:,np.newaxis]*dos_per_band
        dos = np.sum(dos_per_band,axis=(0,1))

        return cls(dft, e_grid, dos)
    
    @classmethod
    def from_dos_file(cls, dft, filename):
        # input:
        ## dft: a DFT_results instance
        ## file: a file containing an energy grid and a dos as columns
        ##       The first line of this file is considered a comment and skipped.
        
        data = np.loadtxt(filename, skiprows=1)
        e_grid = data[:,0]
        dos = data[:,1]

        return cls(dft, e_grid, dos)
    
    @classmethod
    def from_ldos_data(cls, dft, e_grid, ldos_data):
        # input:
        ## dft: a DFT_results instance
        ## e_grid: energy grid [eV] on which the LDOS has been evaluated
        ## ldos_data: a 4-dimensional Numpy array containing LDOS results
        
        if ldos_data.shape[3] != e_grid.shape[0]:
            raise ValueError('Size of e_grid does not match length of 4th axis ' \
                             'of ldos_data')
        cell_volume = dft.volume / \
            (ldos_data.shape[0] * ldos_data.shape[1] * ldos_data.shape[2] * Br2AA**3)

        dos = np.sum(ldos_data, axis=(0,1,2))*cell_volume

        return cls(dft, e_grid, dos) 

    @classmethod
    def from_ados_data(cls, dft, e_grid, ados_data):
        # input:
        ## dft: a DFT_results instance
        ## e_grid: energy grid [eV] on which the LDOS has been evaluated
        ## ados_data: a 2-dimensional Numpy array containing ADOS results

        if ados_data.shape[1] != e_grid.shape[0]:
            raise ValueError('Size of e_grid does not match length of 2nd axis ' \
                             'of ados_data')

        dos = np.sum(ados_data, axis=0)

        return cls(dft, e_grid, dos)


#----------------------------------------------------------------------------------------#
# Class that encapsulates the results of a Local-Density-of-States calculation
class LDOS:
    def __init__(self, dft, e_grid, ldos_filename, temperature = temp, integration = "analytic"):
        # input:
        ## dft: a DFT_results instance
        ## e_grid: energy grid [eV] on which the LDOS has been evaluated
        ## file: a file containing LDOS results in numpy format
        # attributes (you probably should consider all of these to be read only):
        ## dft: the DFT_results instance used to generate the DOS
        ## e_grid: the array of energy values at which the DOS is evauated
        ## ldos: the LDOS read from the file
        ## dos: the DOS evaluated from the LDOS
        
        self.dft = dft
        self.e_grid = e_grid
        self.temperature = temperature
        self.integration = integration

        if (isinstance(ldos_filename, str)):
            self.ldos = np.load(ldos_filename)
        # Quick-Fix for inference
        elif (type(ldos_filename) == np.ndarray):
            self.ldos = ldos_filename
        else: 
            raise ValueError('LDOS must be a filename string or numpy ndarray')

        # Quick fix for ldos_predictions saved as [8mil samples x 250elvls]
        if (len(self.ldos.shape) == 2):
            nxyz = round(self.ldos.shape[0] ** (1/3.))
            self.ldos = np.reshape(self.ldos, [nxyz, nxyz, nxyz, len(e_grid)])


    def do_calcs(self):
        # Quantum Espresso calculates LDOS per Ry.  We use per eV units.
        self.ldos = self.ldos / Ry2eV

        self.cell_volume = self.dft.volume / \
                (self.ldos.shape[0] * self.ldos.shape[1] * self.ldos.shape[2] * Br2AA**3)

        self.dos = DOS.from_ldos_data(self.dft, self.e_grid, self.ldos)
       
        self.e_fermi = dos_2_efermi(self.dos, \
                                    temperature=self.temperature, \
                                    integration=self.integration)
       
        self.eband = dos_2_eband(self.dos, \
                                 e_fermi=self.e_fermi, \
                                 temperature=self.temperature, \
                                 integration=self.integration)
       
        self.enum = dos_2_enum(self.dos, \
                               e_fermi=self.e_fermi, \
                               temperature=self.temperature, \
                               integration=self.integration)

        dw = get_density_weights(self.e_grid, self.e_fermi, temperature=self.temperature)
        self.density = np.sum(self.ldos * dw[np.newaxis, np.newaxis, np.newaxis, :], axis=(3))


#----------------------------------------------------------------------------------------#
# Class that encapsulates the results of a Local-Density-of-States calculation
class ADOS:
    def __init__(self, ldos, sigma = 1.3):

        self.sigma = sigma

        #  Construct an array with the positions of the grid points in scaled coordinates
        #  Note this makes an assumption about the ordering of ldos.ldos that may be wrong!
        grid_coord = np.mgrid[0:ldos.ldos.shape[0],0:ldos.ldos.shape[1],0:ldos.ldos.shape[2]]
        grid_coord = np.double(grid_coord)
        grid_coord[0,:,:,:] = grid_coord[0,:,:,:]/np.double(ldos.ldos.shape[0])
        grid_coord[1,:,:,:] = grid_coord[1,:,:,:]/np.double(ldos.ldos.shape[1])
        grid_coord[2,:,:,:] = grid_coord[2,:,:,:]/np.double(ldos.ldos.shape[2])

        # Flatten over the grid dimensions
        grid_coord = np.reshape(grid_coord,(3,-1)) # [3, N_grid]

        # Get the cell shape for conversion to unscaled coordinates
        # The transpose is used since the vector dimension is the first dimension of grid_coord
        lattice = np.array(ldos.dft.cell)
        lattice = np.transpose(lattice)

        # Loop through the atoms and calculate the partition of unity weights
        weights = np.zeros((ldos.dft.num_atoms,grid_coord.shape[1])) # [N_atoms, N_grid]
        # dip_weights = np.zeros((3,ldos.dft.num_atoms,grid_coord.shape[1]))

        print("Beginning loop through atoms to construct partition of unity")
        for i_a in range(ldos.dft.num_atoms):
           print("Calculating weights for atom", i_a)
           apos = ldos.dft.scaled_positions[i_a,:]

           r_coord = grid_coord - apos[:,np.newaxis] # [3, N_grid]

           # Note that the following is being sloppy with periodic boundary conditions
           # It should work when all box dimensions are much larger than the Gaussian width
           # But it will fail otherwise
           r_coord = r_coord - np.rint(r_coord) # max distance any axis is 0.5 (scaled) with this wrap-around
          
           # Convert to unscaled coordinates.  I tried to sum over the correct dimensions,
           #   but if I messed up, this will break for a non-orthogonal cell
           r_coord = lattice @ r_coord # TODO: check

           # Calculate the unnormalized Gaussian weights
           weights[i_a,:] = np.exp(-np.sum(r_coord**2,axis=0)/(2.0*sigma**2))

           # Save the relative coordinates in dip_weights for use in calculating dip_weights
           # dip_weights[:,i_a,:] = r_coord

        # Normalize the weights
        print("Normalizing the weights")
        cell_volume = ldos.dft.volume / \
           (ldos.ldos.shape[0] * ldos.ldos.shape[1] * ldos.ldos.shape[2] * Br2AA**3)
        normalization = cell_volume/np.sum(weights,axis=0) # [N_grid]
        weights = normalization[np.newaxis,:]*weights

        # Calculate the dipole weights
        # print("Calculating the dipole weights")
        # dip_weights = dip_weights * weights[np.newaxis,:,:]

        # Flatten the LDOS so that we can sum over grid points using a matrix multiply
        print("Flattening the ldos")
        fldos = np.reshape(ldos.ldos,(-1,ldos.ldos.shape[3]))

        # Calculate the ADOS
        print("Calculating the ADOS with a big matrix multiply")
        self.ados = weights @ fldos # [N_atoms, E]

        # Calculate the ADIP_DOS
        # print("Calculating the ADIP_DOS with a big matrix multiply")
        # self.adip = dip_weights @ fldos

#----------------------------------------------------------------------------------------#
# General functions


def set_temp(new_temp):
    print("Changing temp from %sK to %sK" % (temp, new_temp))
    temp = new_temp

def set_gcc(new_gcc):
    print("Changing gcc from %fgcc to %fgcc" % (gcc, new_gcc))
    gcc = new_gcc

def set_sigma_qe(new_sigma):
    print("Changing temp from %f to %f" % (sigme_qe, new_sigma))
    sigma_qe = new_sigma

def get_Ry2eV():
    return Ry2eV

def get_kB():
    return kB

def get_Br2AA():
    return Br2AA


#----------------------------------------------------------------------------------------#
# Fermi-Dirac distribution function
def fd_function(energies, e_fermi, temperature):
    if temperature == 0.0:
        n = np.ones_like(energies)
        n[energies > e_fermi] = 0.0
    else:
        n = 1.0 / (1.0 + np.exp((energies - e_fermi) / (kB * temperature)))
    return n

#----------------------------------------------------------------------------------------#
# Define the integral of the Fermi Function
## Note that this could be written as an array operation in Numpy using ln(exp(2*cosh(x/2))),
## but I am using the mpmath polylog() function for consistency and to avoid over/underflow
def fermi_integral_0(energies, e_fermi, temperature):
    xa = (energies - e_fermi) / (kB * temperature)
    results = np.array([])
    for x in xa:
        results = np.append(results, \
                            np.float64(kB * temperature * \
                                      (x + mp.polylog(1,-mp.exp(x)))))
    return results


#----------------------------------------------------------------------------------------#
# Define the integral of the Fermi Function times the energy (relative to the Fermi energy)
## Note that this could be written as an array operation in Numpy using ln(exp(2*cosh(x/2))) 
## and np.spence() but I am using the mpmath polylog() function for consistency and to avoid 
## over/underflow
def fermi_integral_1(energies, e_fermi, temperature):
    xa = (energies - e_fermi) / (kB * temperature)
    results = np.array([])
    for x in xa:
        results = np.append(results, \
                            np.float64((kB * temperature)**2 * \
                                       (x**2 / 2.0 + x * mp.polylog(1,-mp.exp(x)) - \
                                        mp.polylog(2,-mp.exp(x)))))
    return results


#----------------------------------------------------------------------------------------#
# Define the integral of the Fermi Function times the energy 
# (relative to the Fermi energy) squared
## As far as I can tell, there is no polylog(3,x) function for Numpy so I am using mpmath
## This also helps avoid over/underflow.
def fermi_integral_2(energies, e_fermi, temperature):
    xa = (energies - e_fermi) / (kB * temperature)
    results = np.array([])
    for x in xa:
        results = np.append(results, \
                            np.float64((kB * temperature)**3 * \
                                       (x**3 / 3.0 + x**2 * mp.polylog(1,-mp.exp(x)) - \
                                        2.0 * x * mp.polylog(2,-mp.exp(x)) + \
                                        2.0 * mp.polylog(3,-mp.exp(x)))))
    return results


#----------------------------------------------------------------------------------------#
# Calculate weights that will compute the analytic integral of the Fermi function
#   times an arbitrary linearly interpolated function
def get_density_weights(energies, e_fermi, temperature):  
    fi_0 = fermi_integral_0(energies, e_fermi, temperature)
    fi_0 = fi_0[1:] - fi_0[:-1]
    fi_1 = fermi_integral_1(energies, e_fermi, temperature)
    fi_1 = fi_1[1:] - fi_1[:-1]
    
    weights = np.zeros(energies.size)
    delta_e = energies[1:] - energies[:-1]
    
    weights[1:] = weights[1:] + fi_1 / delta_e
    weights[1:] = weights[1:] + fi_0 * (1.0 + (e_fermi - energies[1:]) / delta_e)
    weights[:-1] = weights[:-1] - fi_1/delta_e
    weights[:-1] = weights[:-1] + fi_0 * (1.0 - (e_fermi - energies[:-1]) / delta_e)
    
    return weights


#----------------------------------------------------------------------------------------#
# Calculate weights that will compute the analytic integral of the Fermi function
# times the energy times an arbitrary linearly interpolated function
def get_energy_weights(energies, e_fermi, temperature):
    fi_1 = fermi_integral_1(energies, e_fermi, temperature)
    fi_1 = fi_1[1:] - fi_1[:-1]
    fi_2 = fermi_integral_2(energies, e_fermi, temperature)
    fi_2 = fi_2[1:] - fi_2[:-1]
    
    weights = np.zeros(energies.size)
    delta_e = energies[1:] - energies[:-1]
    
    weights[1:] = weights[1:] + fi_2/delta_e
    weights[1:] = weights[1:] + fi_1 * (1.0 + (e_fermi - energies[1:]) / delta_e)
    weights[:-1] = weights[:-1] - fi_2/delta_e
    weights[:-1] = weights[:-1] + fi_1 * (1.0 - (e_fermi - energies[:-1]) / delta_e)
    
    weights = weights + e_fermi * get_density_weights(energies, e_fermi, temperature)
    
    return weights


#----------------------------------------------------------------------------------------#
# Calculate the analytic integral of the Fermi function times the linearly interpolated dos
def analytic_enum(energies, dos, e_fermi, temperature):
    return np.sum(dos * get_density_weights(energies, e_fermi, temperature))


#----------------------------------------------------------------------------------------#
# Calculate the analytic integral of the Fermi function times the linearly interpolated dos
def analytic_enum2(energies, dos, e_fermi, temperature):
    fi_0 = fermi_integral_0(energies, e_fermi, temperature)
    fi_1 = fermi_integral_1(energies, e_fermi, temperature)
    
    delta_e = energies[1:] - energies[:-1]
    delta_dos = dos[1:] - dos[:-1]
    
    slope = delta_dos / delta_e
    fermi_intercept = (energies[1:]*dos[:-1] - energies[:-1]*dos[1:]) / delta_e + slope * e_fermi
    

    return np.sum((fi_0[1:] - fi_0[:-1]) * fermi_intercept + (fi_1[1:] - fi_1[:-1]) * slope)


#----------------------------------------------------------------------------------------#
# Calculate the analytic integral of the Fermi function times the linearly interpolated dos 
# times the energy
def analytic_eband(energies, dos, e_fermi, temperature):
    return np.sum(dos*get_energy_weights(energies, e_fermi, temperature))


#----------------------------------------------------------------------------------------#
# Calculate the analytic integral of the Fermi function times the linearly interpolated dos 
# times the energy
def analytic_eband2(energies, dos, e_fermi, temperature):
    fi_0 = fermi_integral_0(energies, e_fermi, temperature)
    fi_1 = fermi_integral_1(energies, e_fermi, temperature)
    fi_2 = fermi_integral_2(energies, e_fermi, temperature)
    
    delta_e = energies[1:] - energies[:-1]
    delta_dos = dos[1:] - dos[:-1]
    
    slope = delta_dos / delta_e
    fermi_intercept = (energies[1:] * dos[:-1] - energies[:-1] * dos[1:]) / \
            delta_e + slope * e_fermi
    
    eband = np.sum((fi_0[1:] - fi_0[:-1]) * fermi_intercept * e_fermi + \
                   (fi_1[1:] - fi_1[:-1]) * (fermi_intercept + slope * e_fermi) + \
                   (fi_2[1:] - fi_2[:-1]) * slope)

    return eband 


#----------------------------------------------------------------------------------------#
# Define Gaussian
## Note: Gaussian without factor of 1/sqrt(2)
def gaussian(e_grid, centers, sigma):
    result = 1.0 / np.sqrt(np.pi * sigma**2) * \
            np.exp(-1.0 * ((e_grid[np.newaxis] - centers[..., np.newaxis]) / sigma)**2)
    return result


#----------------------------------------------------------------------------------------#
# Define a discretized delta function that maintains 0th and 1st moments
def delta_M1(e_grid, centers):
    de = e_grid[np.newaxis]-centers[...,np.newaxis]
    de_above = np.min(de,axis=-1, initial=np.max(de), where=np.greater(de, 0.0))
    de_below = np.max(de,axis=-1, initial=np.min(de), where=np.less_equal(de, 0.0))
    e_spacing = de_above - de_below
    
    result = 1.0 - np.abs(de) / e_spacing[..., np.newaxis]
    result = result * np.greater_equal(result, 0.0) * np.less_equal(result, 1.0)
    result = result / e_spacing[..., np.newaxis]
    
    return result


#----------------------------------------------------------------------------------------#
# Function generating the number of electrons from DFT results
def dft_2_enum(dft, e_fermi = None, temperature = temp):
    # input:
    ## dft: a DFT_results instance
    ## e_fermi: Fermi energy used in generating the occupations, defaults to Fermi energy from dft
    ## temperature: temperature used in generating the occupations
    # output:
    ## enum: number of electrons

    if e_fermi is None:
        e_fermi = dft.fermi_energy
    elif e_fermi == "self-consistent" or e_fermi == "sc":
        e_fermi = toms748(lambda e_fermi: dft_2_enum(dft, e_fermi, temperature) - dft.n_electrons, \
                          a = np.min(dft.eigs), \
                          b = np.max(dft.eigs))

#    print("dft ef_enum: ", e_fermi)

    enum_per_band = fd_function(dft.eigs, e_fermi=e_fermi, temperature=temperature)
    enum_per_band = dft.kweights[np.newaxis,:] * enum_per_band
    enum = np.sum(enum_per_band)
    return enum


#----------------------------------------------------------------------------------------#
# Function generating band energy from DFT results
def dft_2_eband(dft, e_fermi = None, temperature = temp):
    # input:
    ## dft: a DFT_results instance
    ## e_fermi: Fermi energy used in generating the occupations, defaults to Fermi energy from dft
    ## temperature: temperature used in generating the occupations
    # output:
    ## eband: band energy

    if e_fermi is None:
        e_fermi = dft.fermi_energy
    elif e_fermi == "self-consistent" or e_fermi == "sc":
        e_fermi = toms748(lambda e_fermi: dft_2_enum(dft, e_fermi, temperature) - dft.n_electrons, \
                          a = np.min(dft.eigs), \
                          b = np.max(dft.eigs))
   
#    print("dft ef_eb: ", e_fermi)

    eband_per_band = dft.eigs * fd_function(dft.eigs, e_fermi=e_fermi, temperature=temperature)
    eband_per_band = dft.kweights[np.newaxis, :] * eband_per_band
    eband = np.sum(eband_per_band)
    
    return eband


#----------------------------------------------------------------------------------------#
# Function generating integrated density (electron number) from DOS
## Integrate DOS*FD to obtain band energy
def dos_2_enum(dos, e_fermi = None, temperature = temp, integration = 'analytic'):
    # input:
    ## dos: a DOS instance
    ## e_fermi: Fermi energy used in generating the occupations, defaults to Fermi energy from dft
    ## temperature: temperature used in generating the occupations
    ## integration: method of integration, which can be one of the following strings:
    ### 'trapz': sp.integrate.trapz
    ### 'simps': sp.integrate.simps
    ### 'quad': sp.integrate.quad with linear interpolation of dos using sp.interpolate.interp1d
    ### 'analytic': analytic integration of the Fermi function times the linearly interpolated dos
    # output:
    ## enum: number of electrons
    
    if e_fermi is None:
        e_fermi = dos.dft.fermi_energy
    if integration == 'trapz':
        occupations = fd_function(dos.e_grid, e_fermi, temperature)
        enum = sp.integrate.trapz(dos.dos * occupations, dos.e_grid)
    elif integration == 'simps':
        occupations = fd_function(dos.e_grid, e_fermi, temperature)
        enum = sp.integrate.simps(dos.dos * occupations, dos.e_grid)
    elif integration == 'quad':
        f_dos = sp.interpolate.interp1d(dos.e_grid,dos.dos)
        enum, abserr = sp.integrate.quad(
            lambda e: f_dos(e)*fd_function(e, e_fermi, temperature),
            dos.e_grid[0], dos.e_grid[-1], limit=500, points=(e_fermi))
    elif integration == 'analytic':
        enum = analytic_enum(dos.e_grid, dos.dos, e_fermi, temperature)
    else:
        raise ValueError('argument "integration" does not match an implemented method')
    return enum


#----------------------------------------------------------------------------------------#
# Calculate the self-consistent Fermi energy such that dos_2_enum(...) = dos.dft.n_electrons
def dos_2_efermi(dos, temperature = temp, integration = 'analytic', n_electrons = None):
    # input:
    ## dos: a DOS instance
    ## temperature: temperature used in generating the occupations
    ## integration: method of integration, which can be one of the following strings:
    ### 'trapz': sp.integrate.trapz
    ### 'simps': sp.integrate.simps
    ### 'quad': sp.integrate.quad with linear interpolation of dos using sp.interpolate.interp1d
    ### 'analytic': analytic integration of the Fermi function times the linearly interpolated dos
    # output:
    ## e_fermi: the self-consistent Fermi energy
    
    if n_electrons is None:
        n_electrons = dos.dft.n_electrons
    e_fermi = toms748(lambda e_fermi: dos_2_enum(dos, e_fermi, temperature, integration) - n_electrons, \
                          a = dos.e_grid[0], b = dos.e_grid[-1])

    return e_fermi


#----------------------------------------------------------------------------------------#
# Function generating band energy from DOS
## Integrate E*DOS*FD to obtain band energy
def dos_2_eband(dos, e_fermi = None, temperature = temp, integration = 'analytic'):
    # input:
    ## dos: a DOS instance
    ## e_fermi: Fermi energy used in generating the occupations, defaults to Fermi energy from dft
    ## temperature: temperature used in generating the occupations
    ## integration: method of integration, which can be one of the following strings:
    ### 'trapz': sp.integrate.trapz
    ### 'simps': sp.integrate.simps
    ### 'quad': sp.integrate.quad with linear interpolation of dos using sp.interpolate.interp1d
    ### 'analytic': analytic integration of the Fermi function times the energy times the linearly interpolated dos
    # output:
    ## eband: calculated band energy in eV
    
    if e_fermi is None:
        e_fermi = dos.dft.fermi_energy
    # Best
    elif e_fermi == "self-consistent" or e_fermi == "sc":
        e_fermi = dos_2_efermi(dos, temperature, integration)

    if integration == 'trapz':
        occupations = fd_function(dos.e_grid, e_fermi, temperature)
        eband = sp.integrate.trapz(dos.e_grid * dos.dos * occupations, dos.e_grid)
    elif integration == 'simps':
        occupations = fd_function(dos.e_grid, e_fermi, temperature)
        eband = sp.integrate.simps(dos.e_grid * dos.dos * occupations, dos.e_grid)
    elif integration == 'quad':
        f_dos = sp.interpolate.interp1d(dos.e_grid,dos.dos)
        eband, abserr = sp.integrate.quad(
            lambda e: f_dos(e)*e*fd_function(e, e_fermi, temperature),
            dos.e_grid[0], dos.e_grid[-1], limit=500, points=(e_fermi))
    # Best
    elif integration == 'analytic':
        eband = analytic_eband(dos.e_grid, dos.dos, e_fermi, temperature)
    else:
        raise ValueError('argument "integration" does not match an implemented method')

    return eband













