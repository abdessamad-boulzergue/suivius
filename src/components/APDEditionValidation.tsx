import { View } from "react-native";
import SButton from "./common/SButton";
import { Project } from "../database/dao/ProjectDao";
import { useDao, useStores } from "../stores/context";
import {  ETUDE_STATUS, ROUTES } from "../constants";
import { projectObjectStore } from "../stores/objectsStore";
import { observer } from "mobx-react-lite";
import { showAlert } from "./toast";
import { StatusUpdateResponseDto } from "../database/types";

const  APDEditionValidation= observer(({project,navigation}:{project:Project,navigation:any})=>{
    const {rightsStore} = useStores()
    const{projectDao} = useDao();
    const currentProject        =  projectObjectStore.getProject(project.id) ;
    console.log("match " ,ETUDE_STATUS.EDITION_APD,ETUDE_STATUS.MAJ_APD,currentProject.id_step_status)
    const canedit        = rightsStore.hasPermission(currentProject.id_step,currentProject.id,"EDITER_APD") &&  [ETUDE_STATUS.EDITION_APD,ETUDE_STATUS.MAJ_APD].indexOf(currentProject.id_step_status)!=-1;;
    const canValidateAPD = rightsStore.hasPermission(currentProject.id_step,currentProject.id,'VALIDATION_APD') && currentProject.id_step_status ===ETUDE_STATUS.VALIDATION_APD;
    const canValidate    = rightsStore.hasPermission(currentProject.id_step,currentProject.id,'PRE_VALIDATION_APD') && currentProject.id_step_status ===ETUDE_STATUS.PRE_VALIDATION_APD;
   
    const validateAPD = ()=>{
        projectDao.validateAPD(currentProject).then((response)=>{ 
            projectObjectStore.updateProject(projectObjectStore.getProjectUpdate({...currentProject },response));
            showAlert("validation APD","la validation est effectué",()=>{
                navigation.navigate(ROUTES.PROJECTS)
            })
        })
    }
    const preValidateAPD = ()=>{
        projectDao.preValidateAPD(currentProject).then((response)=>{    
            projectObjectStore.updateProject(projectObjectStore.getProjectUpdate({...currentProject },response));
             showAlert("validation APD","la validation est effectué",()=>{
                navigation.navigate(ROUTES.PROJECTS)
            })
          });
    }
    const rejectAPD = ()=>{
        navigation.navigate(ROUTES.REJECT,{project:currentProject});
    }
    const sendAPD = ()=>{
      projectDao.sendAPD(currentProject).then((response)=>{ 
        projectObjectStore.updateProject(projectObjectStore.getProjectUpdate({...currentProject },response));
        showAlert(" APD","est envoyé",()=>{
            navigation.navigate(ROUTES.PROJECTS)
        })
      })
     }
     
    return(
        <View style={{padding:10}}>
            { canedit && 
                 <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <SButton disabled={canedit}  style={{ color:"#E55959",height:50,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="Bloquer" 
                                onPress={()=>{}}>
                            </SButton>
                <SButton disabled={canedit} style={{ alignSelf:"center", height:50,  width:"50%", }} title="Envoyer" 
                        onPress={()=>sendAPD()}></SButton>
                </View>
            }
            { canValidate && 
                  <View style={{flexDirection:"row", alignItems:"center"}}>
              
                <SButton disabled={canValidate} style={{ alignSelf:"center", height:50,  width:"50%", }} title="Valider" 
                        onPress={()=>preValidateAPD()}></SButton>
                </View>
            }
            
            { canValidateAPD && 
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
               <SButton disabled={canValidateAPD}  style={{ color:"#E55959",height:50,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="Rejeter" 
                               onPress={()=>rejectAPD()}>
                           </SButton>
               <SButton disabled={canValidateAPD} style={{ alignSelf:"center", height:50,  width:"50%", }} title="Valider" 
                       onPress={()=>validateAPD()}></SButton>
               </View>
                
            }
                </View>
    )

})
export default APDEditionValidation;