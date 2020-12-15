from mldft.common.parameters import Parameters
from mldft.datahandling.handler_interface import HandlerInterface
from mldft.descriptors.descriptor_interface import DescriptorInterface
from mldft.targets.target_interface import TargetInterface
from mldft.network.hyperparameter_optimizer import HyperparameterOptimizer
from mldft.network.optuna_parameter import OptunaParameter

"""
ex2_hyperparameter_optimization.py: Shows how a hyperparameter optimization can be done using this framework.
"""

print("Welcome to ML-DFT@CASUS.")
print("Running ex2_hyperparameter_optimization.py")

####################
# PARAMETERS
# All parameters are handled from a central parameters class that contains subclasses.
####################
test_parameters = Parameters()
test_parameters.data.datatype_in = "*.npy"
test_parameters.data.datatype_out = "*.npy"
test_parameters.data.data_splitting_percent = [80, 10, 10]
test_parameters.data.input_rescaling_type = "feature-wise-standard"
test_parameters.data.output_rescaling_type = "normal"
test_parameters.descriptors.twojmax = 11
test_parameters.targets.ldos_gridsize = 10
test_parameters.network.layer_activations = ["ReLU"]
test_parameters.training.max_number_epochs = 20
test_parameters.training.mini_batch_size = 40
test_parameters.training.learning_rate = 0.00001
test_parameters.training.trainingtype = "Adam"
test_parameters.hyperparameters.n_trials = 20
test_parameters.comment = "Test run of ML-DFT@CASUS."


####################
# DATA
# Read data into RAM.
# We have to specify the directories we want to read the snapshots from.
# The Handlerinterface will also return input and output scaler objects. These are used internally to scale
# the data. The objects can be used after successful training for inference or plotting.
####################
data_handler, input_scaler, output_scaler = HandlerInterface(test_parameters)

# Add all the snapshots we want to use in to the list.
# We are going to use a little more data here than for the first example.
data_handler.add_snapshot("Al_fp_200x200x200grid_94comps_snapshot0small.npy",
                          "/home/fiedlerl/data/test_fp_snap/2.699gcc/",
                          "Al_ldos_200x200x200grid_250elvls_snapshot0small.npy",
                          "/home/fiedlerl/data/test_fp_snap/2.699gcc/")
data_handler.add_snapshot("Al_fp_200x200x200grid_94comps_snapshot0small_copy.npy",
                          "/home/fiedlerl/data/test_fp_snap/2.699gcc/",
                          "Al_ldos_200x200x200grid_250elvls_snapshot0small_copy.npy",
                          "/home/fiedlerl/data/test_fp_snap/2.699gcc/")
data_handler.load_data()
data_handler.prepare_data()
print("Read data: DONE.")

####################
# HYPERPARAMETER OPTIMIZATION
# In order to perform a hyperparameter optimization,
# one has to simply create a hyperparameter optimizer
# and let it perform a "study".
# This class is nothing more than a wrapper to optuna.
# Via the hyperparameter_list one can add hyperparameters to be optimized.
# The network architecture optimization is VERY preliminary at the moment.
####################

# Add hyperparameters we want to have optimized to the list.
test_parameters.hyperparameters.hlist.append(OptunaParameter("float", "learning_rate", 0.0000001, 0.01))
test_parameters.hyperparameters.hlist.append(OptunaParameter("int", "number_of_hidden_neurons", 10, 100))
test_parameters.hyperparameters.hlist.append(
    OptunaParameter("categorical", "layer_activations", choices=["ReLU", "Sigmoid"]))

# Perform hyperparameter optimization.
print("Starting Hyperparameter optimization.")
test_hp_optimizer = HyperparameterOptimizer(test_parameters)
test_hp_optimizer.perform_study(data_handler)
print("Hyperparameter optimization: DONE.")

print("Successfully ran ex2_hyperparameter_optimization.py.")
print("Parameters used for this experiment:")
test_parameters.show()
