Search.setIndex({docnames:["CONTRIBUTE","api/mala","api/mala.common","api/mala.datahandling","api/mala.descriptors","api/mala.network","api/mala.targets","api/modules","features/background","features/neuralnetworks","features/overview","features/postprocessing","features/preprocessing","index","install/INSTALL_LAMMPS","install/INSTALL_TE_QE","install/README","install/sql_on_hpc","install/tensorboard_setup","install/tested_systems"],envversion:{"sphinx.domains.c":2,"sphinx.domains.changeset":1,"sphinx.domains.citation":1,"sphinx.domains.cpp":3,"sphinx.domains.index":1,"sphinx.domains.javascript":2,"sphinx.domains.math":2,"sphinx.domains.python":2,"sphinx.domains.rst":2,"sphinx.domains.std":2,"sphinx.ext.intersphinx":1,sphinx:56},filenames:["CONTRIBUTE.md","api/mala.rst","api/mala.common.rst","api/mala.datahandling.rst","api/mala.descriptors.rst","api/mala.network.rst","api/mala.targets.rst","api/modules.rst","features/background.rst","features/neuralnetworks.rst","features/overview.rst","features/postprocessing.rst","features/preprocessing.rst","index.md","install/INSTALL_LAMMPS.md","install/INSTALL_TE_QE.rst","install/README.md","install/sql_on_hpc.rst","install/tensorboard_setup.md","install/tested_systems.rst"],objects:{"":{mala:[1,0,0,"-"]},"mala.common":{parameters:[2,0,0,"-"],printout:[2,0,0,"-"]},"mala.common.parameters":{Parameters:[2,1,1,""],ParametersBase:[2,1,1,""],ParametersData:[2,1,1,""],ParametersDebug:[2,1,1,""],ParametersDescriptors:[2,1,1,""],ParametersHyperparameterOptimization:[2,1,1,""],ParametersNetwork:[2,1,1,""],ParametersRunning:[2,1,1,""],ParametersTargets:[2,1,1,""]},"mala.common.parameters.Parameters":{comment:[2,2,1,""],data:[2,2,1,""],debug:[2,2,1,""],descriptors:[2,2,1,""],hyperparameters:[2,2,1,""],load_from_file:[2,3,1,""],manual_seed:[2,2,1,""],network:[2,2,1,""],running:[2,2,1,""],save:[2,3,1,""],show:[2,3,1,""],targets:[2,2,1,""],use_gpu:[2,3,1,""],use_horovod:[2,3,1,""]},"mala.common.parameters.ParametersBase":{show:[2,3,1,""]},"mala.common.parameters.ParametersData":{data_splitting_snapshots:[2,2,1,""],data_splitting_type:[2,2,1,""],descriptors_contain_xyz:[2,2,1,""],input_rescaling_type:[2,2,1,""],output_rescaling_type:[2,2,1,""],snapshot_directories_list:[2,2,1,""],use_lazy_loading:[2,2,1,""]},"mala.common.parameters.ParametersDebug":{grid_dimensions:[2,2,1,""]},"mala.common.parameters.ParametersDescriptors":{descriptor_type:[2,2,1,""],lammps_compute_file:[2,2,1,""],rcutfac:[2,2,1,""],twojmax:[2,2,1,""]},"mala.common.parameters.ParametersHyperparameterOptimization":{direction:[2,2,1,""],hlist:[2,2,1,""],n_trials:[2,2,1,""],number_training_per_trial:[2,3,1,""],rdb_storage_heartbeat:[2,3,1,""],show:[2,3,1,""],trial_ensemble_evaluation:[2,3,1,""]},"mala.common.parameters.ParametersNetwork":{layer_activations:[2,2,1,""],layer_sizes:[2,2,1,""],loss_function_type:[2,2,1,""],nn_type:[2,2,1,""]},"mala.common.parameters.ParametersRunning":{after_before_training_metric:[2,3,1,""],checkpoint_name:[2,2,1,""],checkpoints_each_epoch:[2,2,1,""],during_training_metric:[2,3,1,""],early_stopping_epochs:[2,2,1,""],early_stopping_threshold:[2,2,1,""],inference_data_grid:[2,2,1,""],kwargs:[2,2,1,""],learning_rate:[2,2,1,""],learning_rate_decay:[2,2,1,""],learning_rate_patience:[2,2,1,""],learning_rate_scheduler:[2,2,1,""],max_number_epochs:[2,2,1,""],mini_batch_size:[2,2,1,""],sampler:[2,2,1,""],trainingtype:[2,2,1,""],use_compression:[2,2,1,""],use_shuffling_for_samplers:[2,2,1,""],verbosity:[2,2,1,""],visualisation:[2,2,1,""],weight_decay:[2,2,1,""]},"mala.common.parameters.ParametersTargets":{ldos_gridoffset_ev:[2,2,1,""],ldos_gridsize:[2,2,1,""],ldos_gridspacing_ev:[2,2,1,""],restrict_targets:[2,3,1,""],target_type:[2,2,1,""]},"mala.common.printout":{printout:[2,4,1,""],set_horovod_status:[2,4,1,""]},"mala.datahandling":{data_converter:[3,0,0,"-"],data_handler:[3,0,0,"-"],data_scaler:[3,0,0,"-"],lazy_load_dataset:[3,0,0,"-"],snapshot:[3,0,0,"-"]},"mala.datahandling.data_converter":{DataConverter:[3,1,1,""]},"mala.datahandling.data_converter.DataConverter":{add_snapshot_qeout_cube:[3,3,1,""],convert_single_snapshot:[3,3,1,""],convert_snapshots:[3,3,1,""],descriptor_calculator:[3,2,1,""],target_calculator:[3,2,1,""]},"mala.datahandling.data_handler":{DataHandler:[3,1,1,""]},"mala.datahandling.data_handler.DataHandler":{add_snapshot:[3,3,1,""],clear_data:[3,3,1,""],get_input_dimension:[3,3,1,""],get_output_dimension:[3,3,1,""],get_snapshot_calculation_output:[3,3,1,""],mix_datasets:[3,3,1,""],prepare_data:[3,3,1,""],prepare_for_testing:[3,3,1,""],raw_numpy_to_converted_scaled_tensor:[3,3,1,""],resize_snapshots_for_debugging:[3,3,1,""],test_data_inputs:[3,2,1,""],test_data_outputs:[3,2,1,""],training_data_inputs:[3,2,1,""],training_data_outputs:[3,2,1,""],validation_data_inputs:[3,2,1,""],validation_data_outputs:[3,2,1,""]},"mala.datahandling.data_scaler":{DataScaler:[3,1,1,""]},"mala.datahandling.data_scaler.DataScaler":{finish_incremental_fitting:[3,3,1,""],fit:[3,3,1,""],incremental_fit:[3,3,1,""],inverse_transform:[3,3,1,""],load_from_file:[3,3,1,""],save:[3,3,1,""],start_incremental_fitting:[3,3,1,""],transform:[3,3,1,""]},"mala.datahandling.lazy_load_dataset":{LazyLoadDataset:[3,1,1,""]},"mala.datahandling.lazy_load_dataset.LazyLoadDataset":{add_snapshot_to_dataset:[3,3,1,""],get_new_data:[3,3,1,""],mix_datasets:[3,3,1,""],return_outputs_directly:[3,3,1,""]},"mala.datahandling.snapshot":{Snapshot:[3,1,1,""]},"mala.descriptors":{descriptor_base:[4,0,0,"-"],descriptor_interface:[4,0,0,"-"],lammps_utils:[4,0,0,"-"],snap:[4,0,0,"-"]},"mala.descriptors.descriptor_base":{DescriptorBase:[4,1,1,""]},"mala.descriptors.descriptor_base.DescriptorBase":{backconvert_units:[4,3,1,""],calculate_from_atoms:[4,3,1,""],calculate_from_qe_out:[4,3,1,""],convert_units:[4,3,1,""],enforce_pbc:[4,3,1,""]},"mala.descriptors.descriptor_interface":{DescriptorInterface:[4,4,1,""]},"mala.descriptors.lammps_utils":{extract_compute_np:[4,4,1,""],set_cmdlinevars:[4,4,1,""]},"mala.descriptors.snap":{SNAP:[4,1,1,""]},"mala.descriptors.snap.SNAP":{backconvert_units:[4,3,1,""],calculate_from_atoms:[4,3,1,""],calculate_from_qe_out:[4,3,1,""],convert_units:[4,3,1,""]},"mala.network":{hyper_opt_base:[5,0,0,"-"],hyper_opt_interface:[5,0,0,"-"],hyper_opt_notraining:[5,0,0,"-"],hyper_opt_oat:[5,0,0,"-"],hyper_opt_optuna:[5,0,0,"-"],hyperparameter_interface:[5,0,0,"-"],hyperparameter_oat:[5,0,0,"-"],hyperparameter_optuna:[5,0,0,"-"],network:[5,0,0,"-"],no_training_pruner:[5,0,0,"-"],objective_base:[5,0,0,"-"],objective_no_training:[5,0,0,"-"],predictor:[5,0,0,"-"],runner:[5,0,0,"-"],tester:[5,0,0,"-"],trainer:[5,0,0,"-"]},"mala.network.hyper_opt_base":{HyperOptBase:[5,1,1,""]},"mala.network.hyper_opt_base.HyperOptBase":{add_hyperparameter:[5,3,1,""],clear_hyperparameters:[5,3,1,""],perform_study:[5,3,1,""],set_optimal_parameters:[5,3,1,""],set_parameters:[5,3,1,""]},"mala.network.hyper_opt_interface":{HyperOptInterface:[5,4,1,""]},"mala.network.hyper_opt_notraining":{HyperOptNoTraining:[5,1,1,""]},"mala.network.hyper_opt_notraining.HyperOptNoTraining":{perform_study:[5,3,1,""],set_optimal_parameters:[5,3,1,""]},"mala.network.hyper_opt_oat":{HyperOptOAT:[5,1,1,""]},"mala.network.hyper_opt_oat.HyperOptOAT":{add_hyperparameter:[5,3,1,""],checkpoint_exists:[5,3,1,""],get_best_trial_results:[5,3,1,""],get_optimal_parameters:[5,3,1,""],get_orthogonal_array:[5,3,1,""],load_from_file:[5,3,1,""],number_of_runs:[5,3,1,""],perform_study:[5,3,1,""],resume_checkpoint:[5,3,1,""],set_optimal_parameters:[5,3,1,""],show_order_of_importance:[5,3,1,""]},"mala.network.hyper_opt_optuna":{HyperOptOptuna:[5,1,1,""]},"mala.network.hyper_opt_optuna.HyperOptOptuna":{checkpoint_exists:[5,3,1,""],get_trials_from_study:[5,3,1,""],load_from_file:[5,3,1,""],perform_study:[5,3,1,""],resume_checkpoint:[5,3,1,""],set_optimal_parameters:[5,3,1,""]},"mala.network.hyperparameter_interface":{HyperparameterInterface:[5,4,1,""]},"mala.network.hyperparameter_oat":{HyperparameterOAT:[5,1,1,""]},"mala.network.hyperparameter_oat.HyperparameterOAT":{get_categorical:[5,3,1,""],get_parameter:[5,3,1,""]},"mala.network.hyperparameter_optuna":{HyperparameterOptuna:[5,1,1,""]},"mala.network.hyperparameter_optuna.HyperparameterOptuna":{get_categorical:[5,3,1,""],get_float:[5,3,1,""],get_int:[5,3,1,""],get_parameter:[5,3,1,""]},"mala.network.network":{Network:[5,1,1,""]},"mala.network.network.Network":{calculate_loss:[5,3,1,""],do_prediction:[5,3,1,""],forward:[5,3,1,""],load_from_file:[5,3,1,""],save_network:[5,3,1,""]},"mala.network.no_training_pruner":{NoTrainingPruner:[5,1,1,""]},"mala.network.no_training_pruner.NoTrainingPruner":{prune:[5,3,1,""]},"mala.network.objective_base":{ObjectiveBase:[5,1,1,""]},"mala.network.objective_base.ObjectiveBase":{parse_trial:[5,3,1,""],parse_trial_oat:[5,3,1,""],parse_trial_optuna:[5,3,1,""]},"mala.network.objective_no_training":{ObjectiveNoTraining:[5,1,1,""]},"mala.network.predictor":{Predictor:[5,1,1,""]},"mala.network.predictor.Predictor":{predict_for_atoms:[5,3,1,""],predict_from_qeout:[5,3,1,""]},"mala.network.runner":{Runner:[5,1,1,""]},"mala.network.tester":{Tester:[5,1,1,""]},"mala.network.tester.Tester":{test_snapshot:[5,3,1,""]},"mala.network.trainer":{Trainer:[5,1,1,""]},"mala.network.trainer.Trainer":{checkpoint_exists:[5,3,1,""],load_from_file:[5,3,1,""],resume_checkpoint:[5,3,1,""],train_network:[5,3,1,""]},"mala.targets":{calculation_helpers:[6,0,0,"-"],cube_parser:[6,0,0,"-"],density:[6,0,0,"-"],dos:[6,0,0,"-"],ldos:[6,0,0,"-"],target_base:[6,0,0,"-"],target_interface:[6,0,0,"-"]},"mala.targets.calculation_helpers":{analytical_integration:[6,4,1,""],entropy_multiplicator:[6,4,1,""],fermi_function:[6,4,1,""],fermi_function_eV:[6,4,1,""],gaussians:[6,4,1,""],get_beta:[6,4,1,""],get_f0_value:[6,4,1,""],get_f1_value:[6,4,1,""],get_f2_value:[6,4,1,""],get_s0_value:[6,4,1,""],get_s1_value:[6,4,1,""],integrate_values_on_spacing:[6,4,1,""]},"mala.targets.cube_parser":{CubeFile:[6,1,1,""],read_cube:[6,4,1,""],read_imcube:[6,4,1,""],write_cube:[6,4,1,""],write_imcube:[6,4,1,""]},"mala.targets.cube_parser.CubeFile":{readline:[6,3,1,""]},"mala.targets.density":{Density:[6,1,1,""]},"mala.targets.density.Density":{from_ldos:[6,3,1,""],get_density:[6,3,1,""],get_energy_contributions:[6,3,1,""],get_feature_size:[6,3,1,""],get_number_of_electrons:[6,3,1,""],get_scaled_positions_for_qe:[6,3,1,""],read_from_cube:[6,3,1,""],te_mutex:[6,2,1,""]},"mala.targets.dos":{DOS:[6,1,1,""]},"mala.targets.dos.DOS":{backconvert_units:[6,3,1,""],convert_units:[6,3,1,""],from_ldos:[6,3,1,""],get_band_energy:[6,3,1,""],get_density_of_states:[6,3,1,""],get_energy_grid:[6,3,1,""],get_entropy_contribution:[6,3,1,""],get_feature_size:[6,3,1,""],get_number_of_electrons:[6,3,1,""],get_self_consistent_fermi_energy_ev:[6,3,1,""],read_from_qe_dos_txt:[6,3,1,""],read_from_qe_out:[6,3,1,""]},"mala.targets.ldos":{LDOS:[6,1,1,""]},"mala.targets.ldos.LDOS":{backconvert_units:[6,3,1,""],convert_units:[6,3,1,""],get_and_cache_density_cached:[6,3,1,""],get_and_cache_density_of_states:[6,3,1,""],get_band_energy:[6,3,1,""],get_density:[6,3,1,""],get_density_of_states:[6,3,1,""],get_energy_grid:[6,3,1,""],get_feature_size:[6,3,1,""],get_number_of_electrons:[6,3,1,""],get_self_consistent_fermi_energy_ev:[6,3,1,""],get_total_energy:[6,3,1,""],read_from_cube:[6,3,1,""],uncache_density:[6,3,1,""],uncache_density_of_states:[6,3,1,""]},"mala.targets.target_base":{TargetBase:[6,1,1,""]},"mala.targets.target_base.TargetBase":{backconvert_units:[6,3,1,""],convert_units:[6,3,1,""],get_band_energy:[6,3,1,""],get_density:[6,3,1,""],get_density_of_states:[6,3,1,""],get_energy_grid:[6,3,1,""],get_feature_size:[6,3,1,""],get_number_of_electrons:[6,3,1,""],get_total_energy:[6,3,1,""],qe_input_data:[6,3,1,""],read_additional_calculation_data:[6,3,1,""],read_from_cube:[6,3,1,""],read_from_qe_dos_txt:[6,3,1,""],restrict_data:[6,3,1,""]},"mala.targets.target_interface":{TargetInterface:[6,4,1,""]},mala:{common:[2,0,0,"-"],datahandling:[3,0,0,"-"],descriptors:[4,0,0,"-"],network:[5,0,0,"-"],targets:[6,0,0,"-"],version:[1,0,0,"-"]}},objnames:{"0":["py","module","Python module"],"1":["py","class","Python class"],"2":["py","attribute","Python attribute"],"3":["py","method","Python method"],"4":["py","function","Python function"]},objtypes:{"0":"py:module","1":"py:class","2":"py:attribute","3":"py:method","4":"py:function"},terms:{"035120":13,"100":[2,17],"104":13,"1883":2,"2017":6,"2019":6,"2021":13,"25th":6,"2685":2,"60m":17,"67637":2,"abstract":[4,5,6],"boolean":5,"case":[2,3,5],"class":[0,2,3,4,5,6,9,10,12],"const":6,"default":[2,3,5,6,16,17],"export":19,"float":[2,4,5,6],"function":[0,2,3,4,5,6,9,10,13],"import":5,"int":[2,3,5,6],"long":[2,16],"new":[0,3,4,6,16,17],"return":[2,3,4,5,6],"static":[4,6],"true":[2,3,5,6,17],"while":[6,16,17],AND:[5,6],ASE:[4,5,6],BUT:6,DOS:[2,6,10,12,13],FOR:6,For:[2,3,5,6,12,16],Has:[3,5,6],Its:13,NAS:2,NOT:6,Not:19,Oles:13,One:6,THE:6,That:5,The:[0,2,3,4,5,6,8,10,11,12,15,16,18],These:[3,6,10,18],USE:6,Use:[0,2],Used:3,Useful:[2,3],Uses:3,Using:[2,13],WITH:6,Will:4,With:3,Yes:19,_build:16,_xxx:2,a_descriptive_server_nam:17,abc:[4,5,6],abl:0,about:[6,17],abov:[2,5,6,9,16],absolut:16,acceler:13,acces:6,access:[3,15,17,18],accompani:0,accord:6,account:6,accuraci:[2,5,8],achiev:[2,18],acitv:2,action:[2,6],activ:[0,2,16],actual:[3,5,17],actual_output:5,adam:[2,13],add:[0,2,3,4,5,17],add_hyperparamet:[5,9],add_snapshot:[3,9],add_snapshot_a:3,add_snapshot_qeout_cub:3,add_snapshot_to_dataset:3,added:[0,2,3,4,9,14],adding:[0,13],addit:[0,2,6,12,16,17],additon:2,addsa:3,adher:[0,4,16],aditya95sriram:6,adress:[2,19],advanc:13,advis:6,after:[0,2,9,10,15,16],after_before_training_metr:2,afterward:[3,9,16],again:[3,16],against:5,aggres:2,agre:0,aidan:13,algorihm:2,algorithm:[2,5,13],all:[0,2,3,4,5,6,9,10,16,17],allow:[2,10],allreduc:2,along:[6,16],alongsid:13,also:[2,3,5,16,17],altern:[5,16,18],alternative_storage_path:5,although:[5,12],alwai:[0,2,5,6,12],amd:15,analys:5,analysi:[2,5],analyt:6,analytical_integr:6,angstrom:[2,4],ani:[0,3,5,6,9],anyth:2,apidoc:16,appli:[2,3,6,12],applic:5,approach:[3,5],appropri:12,approxim:[6,9],architectur:[5,9,16],architecur:10,archtitectur:5,arg:[3,5,6],argdict:4,argument:[2,4,6],aris:6,around:10,arrai:[2,3,4,5,6,9,10],array_shap:4,art:13,as_numpi:3,ase:[4,5,6,16],ask:0,associ:6,assum:[2,3,4,5,6],athomp:14,atom:[2,4,5,6,10,12,16],atoms_angstrom:6,attempt:6,attila:13,attribut:[2,5],austin:13,author:6,automat:[4,12,16],avail:[3,4,5,6,17,19],averag:2,avoid:2,awar:5,axi:6,backconvert_unit:[4,6],background:13,band:[2,6,10,11],band_energi:[2,6],base:[0,2,3,4,5,6,10,11,13],bash:16,basi:[2,6,9],basic:16,batch:2,becaus:17,been:[0,3,4,15,16],beend:0,befor:[0,2,5,12],being:[3,5],below:[2,6,16],benchmark:5,benefici:3,best:[5,18],beta:[6,8],between:[2,3,5,6],bias:2,big:0,bigger:2,bind:[13,16,19],bit:6,bohr:6,boldsymbol:8,bool:[2,3,5,6],both:[6,10,11],bound:[5,16],boundari:2,branch:15,brillouin:6,bug:0,build:[3,10],built:[2,9],by_snapshot:2,bypass:13,cach:[3,6],calcul:[2,3,4,5,6,8,10,11,12,13,16],calculate_from_atom:4,calculate_from_qe_out:4,calculate_loss:5,calculation_help:[1,7],calculation_output:3,calculation_output_fil:3,calibr:5,call:[3,5,6,18],can:[1,2,3,4,5,8,9,10,11,12,13,15,16,17,18,19],candid:5,cangi:13,cannot:[6,16,19],capabl:[9,16],care:9,casu:[13,15,19],categor:[2,5],cell:[4,6,10,12],center:[6,13],central:[5,8,10],certain:[3,5,16],chanc:2,chang:[0,16,17],changelog:0,character:2,charg:6,check:[0,3,5,14,15,16],checkout:[14,16],checkpoint:[2,5,10],checkpoint_exist:5,checkpoint_nam:[2,5],checkpoints_each_epoch:2,checkpoints_each_tri:2,choic:[5,16],choos:[0,2],choosen:5,chosen:2,claim:6,classmethod:[2,3,5,6],clean:16,clear:[0,5],clear_data:3,clear_hyperparamet:5,clone:16,cluster:[5,13,16],cmdarg:4,code:[4,13,16],collect:[2,4],com:[2,6,14,15,16],combin:8,command:[4,18],comment:2,common:[1,3,4,5,6,7],commun:[2,17],compar:2,compat:5,compil:14,complei:6,complex:6,complianc:0,compress:2,comput:[2,3,4,8,14,17],computation:13,compute_typ:4,concern:5,conda:[17,19],condit:6,conf:17,configur:[4,5,17],connect:[6,17],conserve_dimens:6,consid:0,consist:[3,6],constant:6,constitu:0,constitut:0,construct:[2,6],constructor:6,consult:0,contain:[2,3,4,5,6,13,17],content:7,contract:6,contribut:[6,11],contributor:0,control:[2,3],convers:[3,4,6,9,10,13],convert3dto1d:3,convert:[3,4,6],convert_single_snapshot:3,convert_snapshot:3,convert_to_threedimension:6,convert_unit:[4,6],converted_arrai:[4,6],converted_tensor:3,convet:5,coordin:2,copi:[5,6],copyright:6,core:[0,19],correct:[5,6,16],correctli:[6,14],correspond:2,cost:8,could:2,counter:2,cpu:16,creat:[0,3,4,5,6,9,16,17],create_fil:6,createdb:17,creation:10,critic:6,crucial:16,cube:[3,6,12],cube_directori:3,cube_naming_schem:3,cube_pars:[1,7],cubefil:6,cubetool:6,current:[2,3,5,6,9,12,19],custom:9,cut:2,cutoff:2,damag:6,daniel:13,dara:3,data:[1,2,3,4,5,6,10,11,13],data_convert:[1,7],data_handl:[1,5,7],data_repo_link:16,data_repo_path:16,data_scal:[1,7],data_splitting_snapshot:2,data_splitting_typ:2,data_typ:[3,6],databas:17,dataconvert:[3,9,12],dataformat:6,datahandl:[1,5,7,9,12,14],dataload:3,datapoint:3,datasampl:3,datascal:[3,12],dataset:[3,9],datatyp:5,date:6,deactiv:16,deadlin:0,deal:6,debug:[2,16],decai:2,decreas:2,deep:13,defin:[5,6],delta:6,demand:[2,5],denot:8,densiti:[1,7,10,12,13],density_data:6,depend:[2,3,6,16],deriv:[3,6,8],descent:2,describ:15,descript:[0,6],descriptor:[1,2,3,7,10],descriptor_bas:[1,3,7],descriptor_calcul:3,descriptor_dimens:4,descriptor_interfac:[1,7],descriptor_typ:2,descriptorbas:[3,4],descriptorinterfac:4,descriptors_contain_xyz:[2,3],design:[10,13],desir:[3,4,5,6,16],detail:[2,3,16],determin:2,detriment:2,develop:[15,16],deviat:[2,3,12],devic:18,dft:[1,2,3,4,6,8,12],dicitionari:4,dict:[2,4,6],dictionari:[2,4,6],dictionati:6,differ:[5,6,10,16,19],differenti:2,dim:3,dimens:[2,3,4,6],direct:[0,2,3,16],directli:4,directori:[0,2,3,4,6,16,17],disabl:3,discard:3,discourag:3,distanc:6,distinct:5,distribut:[2,6,9,10],divid:6,do_predict:5,doc:[13,16],docstr:0,document:[0,6],documentaion:16,doe:[2,3,4,5,6,16],doesn:6,doing:[3,5],don:[2,16],done:[0,2,5,6,9,12,17,18],dos:[1,7],dos_data:6,dos_object:6,dos_valu:6,dot:6,download:[13,18],drive:3,driven:13,dtype:6,due:8,dummi:6,dure:[0,2,3,5,13],during_training_metr:2,dying:17,e_ewald:6,e_f:6,e_grid:6,e_hartre:6,e_rho_times_v_hxc:6,e_xc:6,eac:2,each:[2,5,12,16],earli:2,early_stopping_epoch:2,early_stopping_threshold:2,easi:5,easili:0,edit:17,effect:2,effici:12,eigenvalu:6,either:[2,3,5,6,11,18],electron:[1,6,8,10,11,12],elem_snapshot:3,element:2,elli:13,elsewis:6,empti:2,emul:3,enabl:[5,13,16],encod:[4,5],end:6,energi:[1,2,6,8,10,11,12,15],energy_ev:6,energy_grid:6,energy_integration_method:6,energy_unit:6,energygrid:6,enforc:[2,4,5,6],enforce_pbc:4,enforec:4,enhanc:0,enough:5,ensur:[0,2,3],enter:6,entir:[3,5,9,12,13],entri:[2,3,6],entropi:[6,11],entropy_contribut:6,entropy_multipl:6,env:16,environ:[17,19],epoch:2,epsilon_:6,epsilon_j:8,equat:[6,8],equidist:6,erro:16,error:[2,3,16],espresso:[3,4,6,13,16,19],essenti:2,establish:17,estim:2,etc:[0,2,5,16],evalu:[2,8,10],event:[6,18],everi:[0,10,17],everyth:[5,16],evid:2,ex02_preprocess_data:12,exact:6,exampl:[5,12,13],example_minimal_number_of_runs_oa:5,exce:17,except:6,exclud:[2,16],execut:[3,9],exist:[5,6],expect:2,expens:13,experi:[2,12],experiment:[2,9,10,19],experiment_ddmmyi:2,explicit:16,explicitli:4,explictli:4,express:6,extract:[4,5,6],extract_compute_np:4,f2py:6,factor:[2,5,6],fail:2,falkner18a:2,fals:[2,3,5,6],familiar:13,far:2,faruk:13,fashion:9,fast:10,featur:[0,2,3,6,12,16],feed:[2,9,10],feel:16,fermi:6,fermi_energi:6,fermi_energy_ev:6,fermi_energy_self_consist:6,fermi_funct:6,fermi_function_ev:6,fermi_v:6,few:13,ff_neurons_layer_001:5,ff_neurons_layer_002:5,ff_neurons_layer_xxx:2,fiedler:13,file:[0,2,3,4,5,6,10,12,16,17,18],file_index:3,file_nam:6,file_name_schem:6,file_path:5,filenam:[2,3,6],fill:2,find:[5,15,16,18],fingerprint:[2,3,4],finish_incremental_fit:3,finit:13,first:[2,3,5,6,16],fit:[3,6],fix:[0,16],fname:6,folder:[13,14,16,18],follow:[0,5,6,13,15,16,18],forc:[1,8,10],fork:[0,15],form:[0,2,6],format:[2,3,4,5,6],formula:6,fortran:6,forward:[2,5,9,10],found:[2,5,16],four:16,frac:8,framework:[1,5,8,13],free:[6,16],freedom:3,fro:12,from:[0,2,3,4,5,6,8,10,11,12,13,15,16,17],from_ldo:6,frozentri:5,fulfil:16,fulli:3,function_valu:6,fundament:0,furnish:6,further:2,futur:13,fwcc:18,gabriel:13,gain:15,ganular:16,gaussian:6,gcc:19,gener:[0,2,3,5,6,10,12,13,16],germani:13,get:[2,3,4,5,6,13,18],get_and_cache_density_cach:6,get_and_cache_density_of_st:6,get_band_energi:6,get_best_trial_result:5,get_beta:6,get_categor:5,get_dens:6,get_density_of_st:6,get_energy_contribut:6,get_energy_grid:6,get_entropy_contribut:6,get_f0_valu:6,get_f1_valu:6,get_f2_valu:6,get_feature_s:6,get_float:5,get_input_dimens:3,get_int:5,get_new_data:3,get_number_of_electron:6,get_optimal_paramet:5,get_orthogonal_arrai:5,get_output_dimens:3,get_paramet:5,get_s0_valu:6,get_s1_valu:6,get_scaled_positions_for_q:6,get_self_consistent_fermi_energy_ev:6,get_snapshot_calculation_output:3,get_total_energi:6,get_trials_from_studi:5,git:16,github:[2,14,16],gitlab:15,give:[8,12],given:[5,6,8,9,10,16],global:2,gmail:6,goal:10,good:[2,5],gpu:[2,16],gradient:2,grant:6,granular:16,greatli:2,grid:[2,3,4,6,10,11,12,14],grid_dimens:[2,3,4,6],grid_integration_method:6,grid_siz:3,grid_spacing_bohr:6,gridi:6,gridpoint:6,gridsiz:6,gridspac:2,gridx:6,gridz:6,guarante:16,guidelin:0,hand:2,handl:[3,13],handler:[5,9],hard:3,has:[0,2,3,5,9,15,16],have:[0,2,3,4,5,6,12,16,18,19],heartbeat:2,helper:6,hemera5:13,hemera:18,here:[3,5,6,8,12,18],herebi:6,high:[0,5],higher:[2,5],hlist:2,hoffmann:13,hold:[2,3,4,5,10,13],holder:6,home:17,horovod:[2,3,10],host:17,hotyp:5,how:[2,3,6,18],howev:0,hpc:[5,13,16],html:[2,5,16,18],http:[2,5,6,14,15,16,18],hyper_opt_bas:[1,7],hyper_opt_interfac:[1,7],hyper_opt_method:2,hyper_opt_notrain:[1,7],hyper_opt_oat:[1,7],hyper_opt_optuna:[1,7],hyperoptbas:5,hyperoptinterfac:5,hyperoptnotrain:5,hyperoptoat:5,hyperoptoptuna:[5,9],hyperparam:2,hyperparamet:[2,5,10,13,17],hyperparameter_interfac:[1,7],hyperparameter_oat:[1,7],hyperparameter_optim:5,hyperparameter_optuna:[1,7],hyperparameterinterfac:5,hyperparameteroat:5,hyperparameteroptuna:5,hyperparemet:2,hzdr:[13,19],i_0:6,i_1:6,ibrav:6,ident:2,idl:17,idx:5,ifnam:6,imag:6,imaginari:6,imped:2,implement:[3,5,9],impli:6,improv:[0,2],in_unit:[4,6],includ:[2,3,5,6],increas:17,increment:3,incremental_fit:3,indent:2,index:[5,13,16],indic:[3,5],individu:[9,10],infer:[2,5,6,12,13],inference_data_grid:2,infohub:18,inform:[3,12,18],infrastructur:[13,18],initdb:17,initi:17,initil:2,input:[2,3,5,6,10,12,16],input_data_scal:3,input_dimens:3,input_npy_directori:3,input_npy_fil:3,input_rescaling_typ:[2,12],input_unit:3,insid:16,instal:[15,17,19],instanc:[2,3],instead:[3,5,6],instruct:[0,15],integ:[2,3,5],integr:[6,11],integral_valu:6,integrate_values_on_spac:6,integration_method:6,integration_valu:6,intend:16,interact:8,interest:[5,8,9,10,11,12],interfac:[2,4,5,6,17],intern:[4,12],interv:2,inverse_transform:3,investig:[3,5,10],involv:6,ipv:17,issu:[2,19],its:[2,8,15,16],itself:[2,5,6,13,16],jacobian:[2,5],jmax:2,job:17,jointli:13,judg:5,june:6,just:16,k_b:6,keep:[0,3,6],kei:6,kept:[2,6],keyword:[2,12],kind:6,kindli:0,kohn:[8,13],kotik:13,kulkarni:13,kwarg:[2,3,5],laboratori:13,lammp:[2,4,12,13,19],lammps_compute_fil:2,lammps_util:[1,7],larg:[9,16],larger:[2,16],last:[3,5,6],last_trial:5,later:[3,5,10,12],latest:5,lattic:6,layer:[2,5],layer_activ:2,layer_activation_xxx:2,layer_s:2,lazi:[2,3],lazili:[2,3,9],lazy_load_dataset:[1,7],lazyloaddataset:3,ldo:[1,2,3,5,7,10,12,13],ldos_data:6,ldos_gridoffset_ev:2,ldos_grids:2,ldos_gridspacing_ev:2,ldos_object:6,leakyrelu:2,learn:[1,2,3,6,9,13],learning_r:2,learning_rate_decai:2,learning_rate_pati:2,learning_rate_schedul:2,least:2,leastearly_stopping_threshold:2,left:8,legaci:2,length:2,lenz:13,level:[3,5,6],liabil:6,liabl:6,liblammp:14,librai:13,librari:[3,5,14],licens:6,lie:4,like:[2,16,17],limit:[2,5,6],line:[4,6,13,17],link:16,link_data_repo:16,list:[2,3,4,5,6,13,16],listen_address:17,listen_adress:17,littl:6,lmod:19,lmp:4,load:[2,3,5,6,9,10,12,19],load_from_fil:[2,3,5],loaded_hyperopt:5,loaded_network:5,loaded_param:5,loaded_paramet:2,loaded_train:5,local:[6,12,17,18],locat:[6,17,18],log:6,logfil:17,longer:[0,2],loss:[2,5],loss_function_typ:2,loss_val:5,low:5,lower:5,lowest:2,machin:[9,13,16,18],mai:[3,16],maintain:0,mainten:17,major:0,make:[0,2,13,16],mala:[9,10,11,12,15,17,18],mala_cpu_base_environ:16,mala_cpu_environ:16,mala_gpu_base_environ:16,mala_gpu_environ:16,manag:2,mandatori:5,mani:2,manner:[10,12],manual:[2,16],manual_se:2,mass:6,massiv:16,master:0,match:6,materi:13,mathbf:8,mathrm:8,matrix:6,matter:3,max:[2,3,12],max_connect:17,max_number_epoch:2,maxim:2,maximum:[2,17],mean:[2,3,4,5,6,10,12],mean_std:2,meaning:6,mechan:5,memori:[2,3,4,6],mention:13,merchant:6,merg:[0,6],met:16,meta:6,metadata:6,method:[2,5,6,8,9,10,12],metric:2,might:[2,3,5,16],mimic:6,min:[2,3,12],mini:2,mini_batch_s:2,minim:[2,12],minimum:5,minor:0,mit:6,mix:3,mix_dataset:3,mlr:2,mode:14,model:[10,12,13,18],modifi:[5,6],modin:13,modul:[7,13,15,19],modular:[0,13],modulefil:19,modulepath:19,moham:13,molecular:16,moment:[2,3,5],more:[3,6],most:8,mount:18,move:[2,15],mpi:14,mpmath:16,mse:2,much:16,multipl:[2,3,5,6,12],multiple_gaussian:6,multiplicator_v:6,multiscal:13,multivari:2,must:2,mutat:4,n_e:8,n_trial:2,nabla:8,name:[0,2,3,4,5,6,16],naming_schem:3,naming_scheme_input:3,naming_scheme_output:3,naswot:5,nation:13,natur:2,necessari:[2,3,5,6,9,10,16],necessarili:16,need:[2,3,4,5,6,16,17],neg:6,neglect:2,net:6,netwok:2,network:[1,2,3,7,10,13],neural:[2,5,10,13],neuron:2,new_atom:4,new_datahandl:5,new_hyperopt:5,new_train:5,new_valu:2,newer:16,next:6,nil:13,nn_type:2,no_data:5,no_snapshot:2,no_training_cutoff:2,no_training_prun:[1,7],node:[5,17],non:[6,8,10],none:[2,3,4,5,6,12],noninfring:6,normal:[2,3,12],normand:13,note:[0,2,4,5,6,16,17],notebook:5,noth:4,notic:6,notrain:2,notrainingprun:5,now:[6,17],number:[0,1,2,3,4,5,6,10,11,17],number_of_electron:6,number_of_run:5,number_training_per_tri:2,numer:[3,5,6],numpi:[0,3,4,5,6,16],numpy_arrai:3,oak:13,oapackag:[5,16],oat:[2,5],object:[0,2,3,4,5,6,9,12],objective_bas:[1,7],objective_no_train:[1,7],objectivebas:5,objectivenotrain:5,obtain:6,occur:16,oeprat:12,off:[0,16],often:[12,18],omar:13,onc:6,one:[2,3,6,8],ones:[3,4],ongo:16,onli:[0,2,3,6,9,12,13,16],onto:[0,18],open:[0,6,13,16],openmpi:19,oper:[2,3,6,9,10,16],opt:16,optim:[2,5,10,12,13,17],optimis:5,optimizat:5,optimizer_dict:5,option:[2,3,5,6,14,17],opttyp:5,optuna:[2,5,9,10,13,16],order:[0,2,3,5,6,9,11,16,17],org:[6,16],orient:0,origin:[3,4,6],ornl:13,orthogon:[2,5,9,10],other:[4,6,8,16],otherwis:[5,6],otherwsi:3,our:16,ourselv:3,out:[3,5,6,14,15,16,17],out_unit:[4,6],outfil:[4,6],outlin:[6,9],output:[2,3,4,5,6,10,12,16],output_data_scal:3,output_dimens:3,output_npy_directori:3,output_npy_fil:3,output_rescaling_typ:[2,12],output_unit:3,outsid:4,overal:0,overview:13,overwritten:6,own:[5,15],packag:[7,13],packagenam:16,page:[13,18],pairs:6,paper:[5,13],parallel:[2,3,16],param:[4,5,6],paramet:[1,3,4,5,6,7,10,12,17],parametersbas:2,parametersdata:2,parametersdebug:2,parametersdescriptor:2,parametershyperparameteroptim:2,parametersnetwork:2,parametersrun:2,parameterstarget:[2,6],parametr:3,parent:5,pars:[2,3,4,5,6,10,12],parse_tri:5,parse_trial_oat:5,parse_trial_optuna:5,parser:6,part:6,particl:8,particular:[5,6],parvez:13,pass:[0,2,5,10],path:[3,4,5,6,9,14,16],path_to_fil:[5,6],patienc:2,paulbourk:6,pbc:4,peform:2,peopl:16,pep8:0,per:[2,3,9,10,12],perform:[2,3,4,5,6,9,13],perform_studi:5,permiss:6,permit:6,person:[6,13],pg_ctl:17,pg_hba:17,phi_j:8,phy:13,physic:[2,6,11],pickl:[2,3],pip:[16,19],pipelin:3,place:18,plain:16,plateau:2,pleas:[0,2,3,5,13,16],plu:2,point:[2,3,4,6,10,12],popoola:13,popular:8,portion:[3,6],posit:[1,3,4,5,6,10,12],possibl:[2,5,16],post:[3,6,16],postgr:13,postgres_loc:17,postgresql:[9,17],postprocess:[1,6,10,13],potenti:[0,4],power:9,pre:16,precict:5,precis:2,predict:[1,5,6],predict_for_atom:5,predict_from_qeout:5,predicted_arrai:5,predicted_ldo:5,predicted_output:5,predictor:[1,7],prepar:[3,5],prepare_data:[3,9],prepare_for_test:3,preproces:10,preprocess:[1,2,3,6,10,13,16],prerequisit:13,present:[5,9,12],press:2,principl:[5,9,10],print:[2,5],printout:[1,7],prior:0,proceed:2,process:[3,5,6,9,12,16],progress:10,project:16,properli:0,properti:[2,3,6],provid:[2,3,4,5,6,9,11,12,16],prune:5,pruner:[2,5],pseudopotenti:6,psql:17,publish:[6,13],pull:16,purpos:[5,6,13],put:[3,5],python3:14,python:[3,4,6,13,14,17,19],pytorch:[2,5,9,16],qe_input_data:6,qe_out_directori:[3,4],qe_out_fil:[3,4],qe_pseudopotenti:6,qualiti:0,quantit:2,quantiti:[2,3,6,8,10,11,12],quantum:[3,4,6,13,16,19],radiu:2,rais:6,rajamanickam:13,ram:[3,5,9,17],rang:[2,3,5,12],rate:2,rather:6,raw:[3,4,9,12],raw_numpy_to_converted_scaled_tensor:3,rcutfac:2,rdb:2,rdb_storag:[2,17],rdb_storage_heartbeat:2,read:[3,5,6,12,17],read_additional_calculation_data:6,read_additional_read_additional_calculation_data:6,read_cub:6,read_from_cub:6,read_from_qe_dos_txt:6,read_from_qe_out:6,read_imcub:6,readi:12,readlin:6,readthedoc:5,real:[3,6],realli:4,reason:[2,8],rebas:0,recogn:2,recommend:[2,6,17],reconstruct:5,record:2,reduc:2,reducelronplateau:2,refer:[2,6,16],reflect:16,regular:2,regularli:0,rel:6,relat:2,relev:18,relu:2,reorder:2,reparametrize_scal:3,replac:[3,6,16],repo:[0,14,16],report:[2,5],repositori:[2,13,16],repres:[2,3,5],reproduc:[0,6,8,16],request:[2,5,12],requir:[5,6,10,16],reset:3,reshap:6,resiz:3,resize_snapshots_for_debug:3,resp:2,respect:[2,3,11],respres:5,restrict:[2,6,8],restrict_data:6,restrict_target:2,result:[2,3,4,5,10],result_typ:4,resum:5,resume_checkpoint:5,resumpt:5,retain:6,return_outputs_directli:3,return_valu:5,retval:6,reusabl:0,rev:13,revis:16,rfname:6,ridg:13,right:[3,5,6,8],root:[0,3,16],rossendorf:18,routin:[9,11,12],row:[2,3,5,12],rst:16,run:[2,3,5,16],runner:[1,7],safe:2,same:[2,3,5,6,12,19],sampl:5,sampler:2,sandia:13,save:[2,3,5,6,10,12,18],save_format:[2,3],save_network:5,save_path:3,scalar:4,scale:[2,3,5,6,9,10,13,16],scaled_posit:6,scaler:3,scf:6,schedul:2,scheme:[3,6],schmerler:13,scikit:3,scipi:16,score:5,script:13,scriptscriptstyl:8,search:[9,10,13],search_paramet:5,second:2,see:[0,2,3,5,6,12,13,16],seed:2,select:2,self:[3,6],sell:6,sens:[2,5,6],sep:2,separ:[2,12],serv:5,server:[5,17],set:[0,2,3,4,5,6,12,13,16,17,19],set_cmdlinevar:4,set_horovod_statu:2,set_optimal_paramet:5,set_paramet:5,sever:6,sgd:2,shall:6,sham:[8,13],shape:[4,6],share:[14,19],shared_buff:17,shift:4,shlib:14,shortli:19,should:[0,2,3,4,5,6,17,18],should_prun:5,show:2,show_order_of_import:5,shown:2,shuffl:[2,3],sigma:6,sigmoid:2,simp:6,simpli:[2,3,5,6,18],simpson:6,simul:[6,9,10,12,13,16],simultan:9,sinc:[2,4,5,16],singl:3,siva:13,size:[2,3,5],skip:4,sleep:17,slightli:5,smaller:[2,3],smear:6,smearing_factor:6,snap:[1,2,7,12,14],snap_descriptor:4,snap_dimens:4,snapshot4:3,snapshot:[1,2,4,5,7,9],snapshot_directories_list:2,snapshot_numb:[3,5],snapsshot:3,sneha:13,snl:13,softwar:[0,6,12,16],solv:6,somashekhar:13,some:[2,3,5],someth:16,sometim:16,somewher:17,soon:1,sort:[3,5],sourc:[0,6,13],space:6,spatial:11,specif:[2,3,5,6,16],specifi:[2,3,4,6,16],sphere:2,sphinx:13,sphinxopt:16,split:2,sql:5,sqrt:6,squar:2,src:14,srcname:6,sshf:18,standard:[2,3,12],start:[3,9,13,16,17],start_incremental_fit:3,starts_at:3,state:[6,12,13],statu:[2,17],stem:6,step:[6,12,13,16],stephen:13,steve:13,still:5,stochast:2,stop:[2,16],storag:[2,5,18],str:6,strength:5,string:[2,3,4,5,6],structur:[1,8,10,12,13],studi:[2,5,9,17],study_nam:2,style:[0,5],sub:16,subject:[6,16],sublicens:6,submit:0,submodul:7,subpackag:7,subsequ:6,subset:[5,9],substanti:6,success:19,successfulli:[13,16],suffici:0,suggest:0,suit:0,suitabl:17,sum_i:6,sum_j:8,sum_k:6,summat:6,support:[2,3,5,6,9,12],suppos:[4,5,6],sure:[0,14,16],surog:10,surrog:[2,5,10,12,13,18],symbol:3,syntax:16,system:[0,6,8,10,11,13,16],tag:[0,16],take:[2,5,6,9,18],taken:[5,6],target:[1,2,3,5,7],target_bas:[1,3,7],target_calcul:3,target_interfac:[1,7],target_typ:2,targetbas:[3,6],targetinterfac:6,task:[2,6],te_mutex:6,team:[0,15,16,19],tem:6,tem_original_develop:15,temperatur:[6,10,13],temperature_k:6,tensor:[3,5],tensorboard:[2,13,16],term:[5,6],termin:2,test:[0,2,3,5,9,13,16],test_al_debug_2k_nr:3,test_data_input:3,test_data_output:3,test_snapshot:5,tester:[1,3,7,9],than:2,thei:[2,9,17,19],theiri:8,them:[6,16],theoret:13,theori:[10,12,13],therefor:3,therein:[2,15],thermodynam:6,thi:[0,2,3,4,5,6,8,12,13,15,16,17,18,19],thompson:13,those:5,three:[2,3],threshold:2,through:[5,6,10],throughout:5,thu:12,time:[2,5,6,12,17],tool:9,toolchain:13,torch:[3,5,16],torch_stabl:16,torchaudio:16,torchvis:16,tort:6,total:[2,6,8,10,11,15],total_energi:[2,6],total_energy_modul:15,train:[1,2,3,5,6,10,12,13,18],train_network:5,trainer:[1,7,9],training_data_input:3,training_data_output:3,trainingtyp:2,transform:[3,6],trapezoid:6,trapz:6,treat:16,tree:[0,14,15],trial:[2,5],trial_ensemble_evalu:2,trial_list:5,trial_typ:5,triniti:19,trust:17,tune:[2,5,9,10],two:[6,9],twojmax:2,txt:[6,16],type:[2,3,4,5,6],typestr:3,uncach:6,uncache_dens:6,uncache_density_of_st:6,unchang:6,under:[0,17],underlin:8,understand:13,uniform:6,unit:[3,4,5,6,9],unnecessari:3,unscal:3,until:3,updat:[0,16],usa:13,usag:[3,6,12,13],use:[2,3,4,5,6,10,12,16,18,19],use_compress:2,use_gpu:2,use_horovod:[2,3],use_lazy_load:2,use_multivari:2,use_shuffling_for_sampl:2,used:[1,2,3,4,5,6,9,10,11,12,13,19],useful:[4,5,13,16],user:[2,5,6,13],usernam:[17,18],uses:[6,12,13,16],using:[2,3,5,6,8,9,12,13,16,19],usual:[5,6,11],util:[3,16],v80:2,v_xc:6,vaidyanathan:6,valid:[2,3],validation_data_input:3,validation_data_output:3,validation_loss:2,validation_loss_old:2,valu:[2,3,5,6,17],variabl:2,varianc:3,variou:2,vector:[2,3,6],verbos:2,veri:[2,5],verma:13,version:[2,5,7,14,19],via:[2,6,9,11,12,17],view:4,virtual:19,visibl:13,visual:13,visualis:2,vladyslav:13,volumetr:6,w_k:6,wai:[0,2,16,18],want:[5,6,16],warn:16,warranti:6,wave:8,weight:[2,6],weight_decai:2,welcom:0,well:[2,9,11,12,16],were:3,what:[2,6,16],when:[0,2,3,4,5,6],where:5,whether:[2,3,5,6],which:[2,3,4,5,6,8,13,16],whl:16,whom:6,wide:16,wise:[2,3,12],within:[3,8,16,17,19],without:[2,5,6,9,10],won:5,work:[2,4,5,6,9,13,16],worker:17,workflow:[13,16],working_directori:4,world:3,would:6,wrap:0,write:6,write_cub:6,write_imcub:6,written:5,xvec:6,xyz:[2,3],yes:14,yet:[4,18],yield:11,yml:16,you:[0,2,5,13,15,16,17,18],your:[0,3,5,13,16,17,18],your_compute_nod:17,your_database_nam:17,your_server_nam:17,your_user_nam:17,yourself:[13,16],yourversionher:16,yvec:6,zero:10,zone:6,zvec:6},titles:["Contributing to MALA","mala package","mala.common package","mala.datahandling package","mala.descriptors package","mala.network package","mala.targets package","mala","Theoretical Background","Neural Networks","Overview","Postprocessing","Preprocessing","Welcome to MALA\u2019s documentation!","Setting up LAMMPS","Python bindings to Quantum Espresso","Installation of MALA","Using postgres on HPC infrastructure (for optuna)","Set up tensorboard to visualize data from HPC cluster","Successfully tested on"],titleterms:{"function":8,DOS:11,Using:17,_OS:19,adding:16,api:13,background:8,bind:15,branch:0,build:16,calculation_help:6,cento:19,cite:13,cluster:[18,19],code:0,common:2,conda:16,content:[1,2,3,4,5,6],contribut:[0,13],contributor:13,convers:12,core:13,cube_pars:6,data:[9,12,16,18],data_convert:3,data_handl:3,data_scal:3,datahandl:3,densiti:[6,8,11],descriptor:[4,12],descriptor_bas:4,descriptor_interfac:4,develop:[0,13],document:[13,16],dos:6,download:16,energi:16,environ:16,espresso:15,exampl:16,featur:[10,13],found:13,from:18,handl:9,hemera5:[17,18],hemera:19,hpc:[17,18,19],hyper_opt_bas:5,hyper_opt_interfac:5,hyper_opt_notrain:5,hyper_opt_oat:5,hyper_opt_optuna:5,hyperparamet:9,hyperparameter_interfac:5,hyperparameter_oat:5,hyperparameter_optuna:5,hzdr:[17,18],indic:13,infer:9,infrastructur:17,instal:[13,14,16],institut:13,issu:0,lammp:[14,16],lammps_util:4,lazy_load_dataset:3,ldo:[6,11],librai:14,licens:0,link:14,list:10,local:16,machin:19,maco:19,make:14,mala:[0,1,2,3,4,5,6,7,13,16],method:14,modul:[1,2,3,4,5,6,16],network:[5,9],neural:9,no_training_prun:5,objective_bas:5,objective_no_train:5,optim:9,option:16,optuna:17,overview:10,packag:[1,2,3,4,5,6,14,16],paramet:2,person:19,pop:19,postgr:17,postprocess:11,predictor:5,preprocess:12,prerequisit:16,printout:2,pull:0,python:[15,16],quantum:15,recommend:14,refer:13,releas:0,request:0,run:13,runner:5,scale:12,scientif:13,set:[14,18],snap:4,snapshot:3,strategi:0,submodul:[1,2,3,4,5,6],subpackag:1,successfulli:19,supervis:13,tabl:13,target:[6,12],target_bas:6,target_interfac:6,tensorboard:18,test:19,tester:5,theoret:8,theori:8,total:16,train:9,trainer:5,ubuntu:19,version:[0,1,16],visibl:14,visual:18,welcom:13,workflow:10}})