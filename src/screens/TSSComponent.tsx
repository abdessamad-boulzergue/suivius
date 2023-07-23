import { View,Text, StyleSheet } from "react-native";
import SuiviInputText from "../components/InputText";
import SButton from "../components/common/SButton";
import { Project } from "../database/dao/ProjectDao";
import { useDao } from '../stores/context';
import {useState,useEffect} from 'react'
import { Localisation } from "../database/dao/LocalisationDao";
import { useStores } from "../stores/context";
import { observer } from "mobx-react-lite";
import { projectObjectStore } from "../stores/objectsStore";
import { ETUDE_STATUS } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import { Tss } from "../database/dao/TssDao";
import TssEditionValidation from "../components/TssEditionValidation";
import { TssDto } from "../services/types";

const  TSSComponent = observer(({route,navigation}:any) => {

    const{ tssDao} = useDao();
    const [project, setProject] =  useState<Project>(projectObjectStore.getProject(route.params.project.id))
    const tss = projectObjectStore.getProjectTss(project);

    console.log("TSSSSSSSSSSSSSSSSSSSSSSSSSSSSS,",'params : ',route.params.project.id,', store : ',project.id," \n")

    const {rightsStore} = useStores()
    const [cableType,setCableType] = useState<number>(tss?.cableTypeId);
    const [siteType,setSiteType] = useState<number>(tss?.siteTypeId);
    const [equipmentType,setEquipmentType] = useState<number>(tss?.equipmentTypeId);
    const [connectionType,setConnectionType] = useState<number>(tss?.connectionTypeId);
    console.log(rightsStore.hasPermission(project.id_step,project.id,"EDITER_TSS"),  [ETUDE_STATUS.EDITION_TSS,ETUDE_STATUS.MAJ_TSS],project.id_step_status,[ETUDE_STATUS.EDITION_TSS,ETUDE_STATUS.MAJ_TSS].indexOf(project.id_step_status)!=-1)
    const canedit        = rightsStore.hasPermission(project.id_step,project.id,"EDITER_TSS") &&  [ETUDE_STATUS.EDITION_TSS,ETUDE_STATUS.MAJ_TSS].indexOf(project.id_step_status)!=-1;
    const canValidate    = rightsStore.hasPermission(project.id_step,project.id,'PRE_VALIDATION_TSS') && project.id_step_status ===ETUDE_STATUS.PRE_VALIDATION_TSS;

    const canView= rightsStore.hasPermission(project.id_step,project.id,'CONSULTATION') || canedit || canValidate;

   useEffect(() => {
    saveTss();
  }, [cableType,siteType,equipmentType,connectionType]);

   const saveTss =async ()=>{
        let tss :Tss ={
            id:project.id,
            cableType:cableType,
            connectionType:connectionType,
            equipmentType:equipmentType,
            siteType:siteType
        };


        const savedTss=await  tssDao.getById(project.id);
        const tssDto : TssDto ={
                              cableTypeId:cableType, 
                              connectionTypeId:connectionType,
                               equipmentTypeId:equipmentType, 
                               siteTypeId:siteType
                              }
        if(savedTss){
            tssDao.update(tss).then(()=> projectObjectStore.setProjectTss(project,tssDto))
        }else{
            tssDao.create(tss).then(()=> projectObjectStore.setProjectTss(project,tssDto));
        }
   }
 
    return(
       
            <ScrollView  >
                 <View style={{padding:15}}pointerEvents={canedit||canValidate? 'auto':'none'} >
                <Text style={{color:"#000"}}>Compte rendu de visite technique</Text>
                <Text></Text>  
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>type de câble site / odf</Text>
                        <View style={styles.pickerContainer}>
                                    <Picker
                                            style={styles.picker}
                                            dropdownIconColor= 'black'
                                            selectedValue={cableType}
                                            onValueChange={(itemValue) =>{ setCableType(itemValue) }}
                                        >
                                            <Picker.Item label=" " value={0} />
                                            {
                                              projectObjectStore.cableTypes.map(type=>{
                                                return <Picker.Item label={type.title} value={type.id} />
                                              })
                                            }
                                    </Picker>
                            </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>type de raccordement</Text>
                        <View style={styles.pickerContainer}>
                                    <Picker
                                            style={styles.picker}
                                            dropdownIconColor= 'black'
                                            selectedValue={connectionType}
                                            onValueChange={(itemValue) =>{ setConnectionType(itemValue) }}
                                        >
                                        <Picker.Item label=" " value={0} />
                                            {
                                              projectObjectStore.connectionTypes.map(type=>{
                                                return <Picker.Item label={type.title} value={type.id} />
                                              })
                                            }
                                    </Picker>
                            </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>type de site</Text>
                        <View style={styles.pickerContainer}>
                                    <Picker
                                            style={styles.picker}
                                            dropdownIconColor= 'black'
                                            selectedValue={siteType}
                                            onValueChange={(itemValue) =>{ setSiteType(itemValue) }}
                                        >
                                       <Picker.Item label=" " value={0} />
                                            {
                                              projectObjectStore.siteTypes.map(type=>{
                                                return <Picker.Item label={type.title} value={type.id} />
                                              })
                                            }
                                    </Picker>
                            </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>type d'equipemet</Text>
                        <View style={styles.pickerContainer}>
                                    <Picker
                                            style={styles.picker}
                                            dropdownIconColor= 'black'
                                            selectedValue={equipmentType}
                                            onValueChange={(itemValue) =>{ setEquipmentType(itemValue) }}
                                        >
                                        <Picker.Item label=" " value={0} />
                                            {
                                              projectObjectStore.equipementTypes.map(type=>{
                                                return <Picker.Item label={type.title} value={type.id} />
                                              })
                                            }
                                    </Picker>
                            </View>
                </View>
                </View>
                <TssEditionValidation
                style={{}}
                navigation={navigation}
                 project={project}
                />
                
    </ScrollView>
    )

});
const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
        color:'black'
      },
      separator: {
        height: 1,
        backgroundColor: '#ccc',
      },
      dropdownContainer: {
        marginBottom:15,
      },
      label: {
        marginBottom: 8,
        color:"#2F3437"
      },
      pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
        height:40,
        backgroundColor:'#fff'
      },
      picker: {
        flex: 1,
        color: '#2F3437',
      },
      pickerItem: {
        color: 'black', // Replace with the desired color
      },
    })
export default TSSComponent;