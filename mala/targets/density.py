"""Electronic density calculation class."""
import os
import warnings

import ase.io
from ase.units import Rydberg, Bohr
try:
    import total_energy as te
except ModuleNotFoundError:
    pass

from mala.common.parameters import printout
from mala.targets.target import Target
from mala.targets.calculation_helpers import *
from mala.targets.cube_parser import read_cube, write_cube
from mala.targets.atomic_force import AtomicForce
from mala.common.parallelizer import get_rank


class Density(Target):
    """Postprocessing / parsing functions for the electronic density.

    Parameters
    ----------
    params : mala.common.parameters.Parameters
        Parameters used to create this Target object.
    """

    te_mutex = False

    def __init__(self, params):
        super(Density, self).__init__(params)

    def get_feature_size(self):
        """Get dimension of this target if used as feature in ML."""
        return 1

    def read_from_cube(self, file_name, directory, units=None):
        """
        Read the density data from a cube file.

        Parameters
        ----------
        file_name :
            Name of the cube file.

        directory :
            Directory containing the cube file.

        units : string
            Units the density is saved in. Usually none.
        """
        printout("Reading density from .cube file in ", directory, min_verbosity=0)
        data, meta = read_cube(os.path.join(directory, file_name))
        return data

    def write_as_cube(self, file_name, density_data, atoms=None,
                      grid_dimensions=None):
        """
        Write the density data in a cube file.

        Parameters
        ----------
        file_name : string
            Name of the file.

        density_data : numpy.ndarray
            1D or 3D array of the density.

        atoms : ase.Atoms
            Atoms to be written to the file alongside the density data.
            If None, and the target object has an atoms object, this will
            be used.

        grid_dimensions : list
            Grid dimensions. Only necessary if a 1D density is provided.
        """
        if grid_dimensions is None:
            grid_dimensions = self.grid_dimensions
        if atoms is None:
            atoms = self.atoms
        if len(density_data.shape) != 3:
            if len(density_data.shape) == 1:
                density_data = np.reshape(density_data, grid_dimensions)
            else:
                raise Exception("Unknown density shape provided.")
        # %%
        meta = {}
        atom_list = []
        for i in range(0, len(atoms)):
            atom_list.append(
                (atoms[i].number, [4.0, ] + list(atoms[i].position / Bohr)))

        meta["atoms"] = atom_list
        meta["org"] = [0.0, 0.0, 0.0]
        meta["xvec"] = self.voxel_Bohr[0]
        meta["yvec"] = self.voxel_Bohr[1]
        meta["zvec"] = self.voxel_Bohr[2]
        write_cube(density_data, meta, file_name)


    def get_number_of_electrons(self, density_data, voxel_Bohr=None,
                                integration_method="summation"):
        """
        Calculate the number of electrons from given density data.

        Parameters
        ----------
        density_data : numpy.array
            Electronic density on the given grid. Has to either be of the form
            gridpoints or (gridx, gridy, gridz).

        voxel_Bohr : ase.cell.Cell
            Voxel to be used for grid intergation. Needs to reflect the
            symmetry of the simulation cell. In Bohr.

        integration_method : str
            Integration method used to integrate density on the grid.
            Currently supported:

            - "trapz" for trapezoid method (only for cubic grids).
            - "simps" for Simpson method (only for cubic grids).
            - "summation" for summation and scaling of the values (recommended)
        """
        if voxel_Bohr is None:
            voxel_Bohr = self.voxel_Bohr

        # Check input data for correctness.
        data_shape = np.shape(np.squeeze(density_data))
        if len(data_shape) != 3:
            if len(data_shape) != 1:
                raise Exception("Unknown Density shape, cannot calculate "
                                "number of electrons.")
            elif integration_method != "summation":
                raise Exception("If using a 1D density array, you can only"
                                " use summation as integration method.")

        # We integrate along the three axis in space.
        # If there is only one point in a certain direction we do not
        # integrate, but rather reduce in this direction.
        # Integration over one point leads to zero.

        grid_spacing_bohr_x = np.linalg.norm(voxel_Bohr[0])
        grid_spacing_bohr_y = np.linalg.norm(voxel_Bohr[1])
        grid_spacing_bohr_z = np.linalg.norm(voxel_Bohr[2])

        number_of_electrons = None
        if integration_method != "summation":
            number_of_electrons = density_data

            # X
            if data_shape[0] > 1:
                number_of_electrons = \
                    integrate_values_on_spacing(number_of_electrons,
                                                grid_spacing_bohr_x, axis=0,
                                                method=integration_method)
            else:
                number_of_electrons =\
                    np.reshape(number_of_electrons, (data_shape[1],
                                                     data_shape[2]))
                number_of_electrons *= grid_spacing_bohr_x

            # Y
            if data_shape[1] > 1:
                number_of_electrons = \
                    integrate_values_on_spacing(number_of_electrons,
                                                grid_spacing_bohr_y, axis=0,
                                                method=integration_method)
            else:
                number_of_electrons = \
                    np.reshape(number_of_electrons, (data_shape[2]))
                number_of_electrons *= grid_spacing_bohr_y

            # Z
            if data_shape[2] > 1:
                number_of_electrons = \
                    integrate_values_on_spacing(number_of_electrons,
                                                grid_spacing_bohr_z, axis=0,
                                                method=integration_method)
            else:
                number_of_electrons *= grid_spacing_bohr_z
        else:
            if len(data_shape) == 3:
                number_of_electrons = np.sum(density_data, axis=(0, 1, 2)) \
                                      * voxel_Bohr.volume
            if len(data_shape) == 1:
                number_of_electrons = np.sum(density_data, axis=0) * \
                                      voxel_Bohr.volume

        return number_of_electrons

    def get_density(self, density_data, convert_to_threedimensional=False,
                    grid_dimensions=None):
        """
        Get the electronic density, based on density data.

        This function only does reshaping, no calculations.

        Parameters
        ----------
        density_data : numpy.array
            Electronic density data, this array will be returned unchanged
            depending on the other parameters.

        convert_to_threedimensional : bool
            If True, then a density saved as a 1D array will be converted to
            a 3D array (gridsize -> gridx * gridy * gridz)

        grid_dimensions : list
            Provide a list of dimensions to be used in the transformation
            1D -> 3D. If None, MALA will attempt to use the values read with
            Target.read_additional_read_additional_calculation_data .
            If that cannot be done, this function will raise an exception.

        Returns
        -------
        density_data : numpy.array
            Electronic density data in the desired shape.
        """
        if len(density_data.shape) == 3:
            return density_data
        elif len(density_data.shape) == 1:
            if convert_to_threedimensional:
                if grid_dimensions is None:
                    grid_dimensions = self.grid_dimensions
                return density_data.reshape(grid_dimensions)
            else:
                return density_data
        else:
            raise Exception("Unknown density data shape.")

    def get_energy_contributions(self, density_data, create_file=True,
                                 atoms_Angstrom=None, qe_input_data=None,
                                 qe_pseudopotentials=None):
        r"""
        Extract density based energy contributions from Quantum Espresso.

        Done via a Fortran module accesible through python using f2py.
        Returns: e_rho_times_v_hxc, e_hartree,  e_xc, e_ewald

        Parameters
        ----------
        density_data : numpy.array
            Density data on a grid.

        create_file : bool
            If False, the last mala.pw.scf.in file will be used as input for
            Quantum Espresso. If True (recommended), MALA will create this
            file according to calculation parameters.

        atoms_Angstrom : ase.Atoms
            ASE atoms object for the current system. If None, MALA will
            create one.

        qe_input_data : dict
            Quantum Espresso parameters dictionary for the ASE<->QE interface.
            If None (recommended), MALA will create one.

        qe_pseudopotentials : dict
            Quantum Espresso pseudopotential dictionaty for the ASE<->QE
            interface. If None (recommended), MALA will create one.

        Returns
        -------
        energies : list
            A list containing, in order, the following energy contributions:

                - :math:`n\,V_\mathrm{xc}`
                - :math:`E_\mathrm{H}`
                - :math:`E_\mathrm{xc}`
                - :math:`E_\mathrm{Ewald}`
        """
        if atoms_Angstrom is None:
            atoms_Angstrom = self.atoms
        self.__setup_total_energy_module(density_data, atoms_Angstrom,
                                         create_file=create_file,
                                         qe_input_data=qe_input_data,
                                         qe_pseudopotentials=
                                         qe_pseudopotentials)

        # Get and return the energies.
        energies = np.array(te.get_energies())*Rydberg
        return energies

    def get_atomic_forces(self, density_data, create_file=True,
                          atoms_Angstrom=None, qe_input_data=None,
                          qe_pseudopotentials=None):
        """
        Calculate the atomic forces.

        This function uses an interface to QE. The atomic forces are
        calculated via the Hellman-Feynman theorem, although only the local
        contributions are calculated. The non-local contributions, as well
        as the SCF correction (so anything wavefunction dependent) are ignored.
        Therefore, this function is best used for data that was created using
        local pseudopotentials.

        Parameters
        ----------
        density_data : numpy.array
            Density data on a grid.

        create_file : bool
            If False, the last mala.pw.scf.in file will be used as input for
            Quantum Espresso. If True (recommended), MALA will create this
            file according to calculation parameters.

        atoms_Angstrom : ase.Atoms
            ASE atoms object for the current system. If None, MALA will
            create one.

        qe_input_data : dict
            Quantum Espresso parameters dictionary for the ASE<->QE interface.
            If None (recommended), MALA will create one.

        qe_pseudopotentials : dict
            Quantum Espresso pseudopotential dictionaty for the ASE<->QE
            interface. If None (recommended), MALA will create one.

        Returns
        -------
        atomic_forces : numpy.ndarray
            An array of the form (natoms, 3), containing the atomic forces
            in eV/Ang.

        """
        # First, set up the total energy module for calculation.
        if atoms_Angstrom is None:
            atoms_Angstrom = self.atoms
        self.__setup_total_energy_module(density_data, atoms_Angstrom,
                                         create_file=create_file,
                                         qe_input_data=qe_input_data,
                                         qe_pseudopotentials=
                                         qe_pseudopotentials)

        # Now calculate the forces.
        atomic_forces = np.array(te.calc_forces(len(atoms_Angstrom))).transpose()

        # QE returns the forces in Ry/Bohr.
        atomic_forces = AtomicForce.convert_units(atomic_forces,
                                                  in_units="Ry/Bohr")
        return atomic_forces

    def __setup_total_energy_module(self, density_data, atoms_Angstrom,
                                    create_file=True, qe_input_data=None,
                                    qe_pseudopotentials=None):
        if create_file:
            # If not otherwise specified, use values as read in.
            if qe_input_data is None:
                qe_input_data = self.qe_input_data
            if qe_pseudopotentials is None:
                qe_pseudopotentials = self.qe_pseudopotentials

            self.write_tem_input_file(atoms_Angstrom, qe_input_data,
                                      qe_pseudopotentials,
                                      self.grid_dimensions,
                                      self.kpoints)

        # initialize the total energy module.
        # FIXME: So far, the total energy module can only be initialized once.
        # This is ok when the only thing changing
        # are the atomic positions. But no other parameter can currently be
        # changed in between runs...
        # There should be some kind of de-initialization function that allows
        # for this.

        if Density.te_mutex is False:
            printout("MALA: Starting QuantumEspresso to get density-based"
                     " energy contributions.", min_verbosity=0)
            te.initialize()
            Density.te_mutex = True
            printout("MALA: QuantumEspresso setup done.", min_verbosity=0)
        else:
            printout("MALA: QuantumEspresso is already running. Except for"
                     " the atomic positions, no new parameters will be used.",
                     min_verbosity=0)

        # Before we proceed, some sanity checks are necessary.
        # Is the calculation spinpolarized?
        nr_spin_channels = te.get_nspin()
        if nr_spin_channels != 1:
            raise Exception("Spin polarization is not yet implemented.")

        # If we got values through the ASE parser - is everything consistent?
        number_of_atoms = te.get_nat()
        if create_file is True:
            if number_of_atoms != atoms_Angstrom.get_global_number_of_atoms():
                raise Exception("Number of atoms is inconsistent between MALA "
                                "and Quantum Espresso.")

        # We need to find out if the grid dimensions are consistent.
        # That depends on the form of the density data we received.
        number_of_gridpoints = te.get_nnr()
        if len(density_data.shape) == 3:
            number_of_gridpoints_mala = density_data.shape[0] * \
                                        density_data.shape[1] * \
                                        density_data.shape[2]
        elif len(density_data.shape) == 1:
            number_of_gridpoints_mala = density_data.shape[0]
        else:
            raise Exception("Density data has wrong dimensions. ")
        if number_of_gridpoints_mala != number_of_gridpoints:
            raise Exception("Grid is inconsistent between MALA and"
                            " Quantum Espresso")

        # Now we need to reshape the density.
        density_for_qe = None
        if len(density_data.shape) == 3:
            density_for_qe = np.reshape(density_data, [number_of_gridpoints,
                                                       1], order='F')
        elif len(density_data.shape) == 1:
            warnings.warn("Using 1D density to calculate the total energy"
                          " requires reshaping of this data. "
                          "This is unproblematic, as long as you provided t"
                          "he correct grid_dimensions.")
            density_for_qe = self.get_density(density_data,
                                              convert_to_threedimensional=True)
            density_for_qe = np.reshape(density_for_qe, [number_of_gridpoints,
                                                         1], order='F')
        # Reset the positions. Some calculations (such as the Ewald sum)
        # is directly performed here, so it is not enough to simply
        # instantiate the process with the file.
        positions_for_qe = self.get_scaled_positions_for_qe(atoms_Angstrom)
        te.set_positions(np.transpose(positions_for_qe), number_of_atoms)
        # Now we can set the new density.
        te.set_rho_of_r(density_for_qe, number_of_gridpoints, nr_spin_channels)
        return atoms_Angstrom

    @staticmethod
    def get_scaled_positions_for_qe(atoms):
        """
        Get the positions correctly scaled for QE.

        QE (for ibrav=0) scales a little bit different then ASE would.
        ASE uses all provided cell parameters, while QE simply sets the
        first entry in the cell parameter matrix as reference and divides
        all positions by this value.

        Parameters
        ----------
        atoms : ase.Atoms
            The atom objects for which the scaled positions should be
            calculated.

        Returns
        -------
        scaled_positions : numpy.array
            The scaled positions.
        """
        principal_axis = atoms.get_cell()[0][0]
        scaled_positions = atoms.get_positions()/principal_axis
        return scaled_positions

    @classmethod
    def from_ldos(cls, ldos_object):
        """
        Create a density object from an LDOS object.

        Parameters
        ----------
        ldos_object : mala.targets.ldos.LDOS
            LDOS object used as input.

        Returns
        -------
        dos_object : Density
            Density object created from LDOS object.


        """
        return_density_object = Density(ldos_object.parameters)
        return_density_object.fermi_energy_eV = ldos_object.fermi_energy_eV
        return_density_object.temperature_K = ldos_object.temperature_K
        return_density_object.voxel_Bohr = ldos_object.voxel_Bohr
        return_density_object.number_of_electrons = ldos_object.\
            number_of_electrons
        return_density_object.band_energy_dft_calculation = ldos_object.\
            band_energy_dft_calculation
        return_density_object.grid_dimensions = ldos_object.grid_dimensions
        return_density_object.atoms = ldos_object.atoms
        return_density_object.qe_input_data = ldos_object.qe_input_data
        return_density_object.qe_pseudopotentials = ldos_object.\
            qe_pseudopotentials
        return_density_object.total_energy_dft_calculation = \
            ldos_object.total_energy_dft_calculation
        return_density_object.kpoints = ldos_object.kpoints
        return_density_object.number_of_electrons_from_eigenvals = \
            ldos_object.number_of_electrons_from_eigenvals
        return return_density_object
