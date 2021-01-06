from fesl.common.parameters import Parameters
from fesl.targets.dos import DOS
import numpy as np
from scipy.optimize import toms748
from ase.units import Rydberg

"""
ex07_dos_analysis.py: Shows how the FESL code can be used to further process the DOS. 
"""


def dos_analysis(dos, dos_data, integration, ref):
    # DFT values.

    nr_electrons_dft = dos.get_number_of_electrons(dos_data, integration_method=integration)
    e_band_dft = dos.get_band_energy(dos_data, integration_method=integration)
    fermi_dft = dos.fermi_energy_eV

    # self-consistent values.

    fermi_sc = toms748(lambda fermi_sc: (dos.get_number_of_electrons(dos_data, fermi_energy_eV=fermi_sc,
                                                                     integration_method=integration) - dos.number_of_electrons),
                       a=-5, b=9)
    nr_electrons_sc = dos.get_number_of_electrons(dos_data, integration_method=integration, fermi_energy_eV=fermi_sc)
    e_band_sc = dos.get_band_energy(dos_data, integration_method=integration, fermi_energy_eV=fermi_sc)

    print("Used integration method: ", integration)
    print("Method\t#Electrons\tE_band[eV]\tE_Fermi[eV]\tError_E_band[eV]")
    print("DFT\t{0:12.4f}{1:12.4f}{2:12.4f}{3:12.4f}".format(nr_electrons_dft, e_band_dft, fermi_dft, e_band_dft - ref))
    print("SC\t{0:12.4f}{1:12.4f}{2:12.4f}{3:12.4f}".format(nr_electrons_sc, e_band_sc, fermi_sc, e_band_sc - ref))


print("Welcome to FESL.")
print("Running ex07_dos_analysis.py")

# This is done manually at the moment.
eband_exact_rydberg = 737.79466828 + 4.78325172 - 554.11311050
eband_exact_ev = eband_exact_rydberg * Rydberg

####################
# PARAMETERS
# All parameters are handled from a central parameters class that contains subclasses.
####################
test_parameters = Parameters()
test_parameters.targets.ldos_gridsize = 250
test_parameters.targets.ldos_gridspacing_ev = 0.1
test_parameters.targets.ldos_gridoffset_ev = -10

# Create a DOS object and provide additional parameters.
dos = DOS(test_parameters)
dos.read_additional_calculation_data("qe.out", "./data/QE_Al.scf.pw.out")

# Load a precalculated DOS file.
dos_data = np.load("./data/Al_DOS_nr0.npy")

dos_analysis(dos, dos_data, "quad", eband_exact_ev)
dos_analysis(dos, dos_data, "analytical", eband_exact_ev)

print("Successfully ran ex07_dos_analysis.py.")
print("Parameters used for this experiment:")
test_parameters.show()