import {useEffect} from 'react';
import { View, } from "react-native";
import SButton from "./common/SButton";
import { Project } from "../database/dao/ProjectDao";
import { useDao, useStores } from "../stores/context";
import { ETUDE_STATUS, ROUTES } from "../constants";
import { useState } from "react";
import { projectObjectStore } from "../stores/objectsStore";
import { observer } from "mobx-react-lite";
import { showAlert, showToast } from './toast';
import { StatusUpdateResponseDto } from '../database/types';


const  TssEditionValidation =observer(({project,navigation,style}:{project:Project,navigation:any,style:any})=>{
    const {rightsStore} = useStores()
    const{projectDao} = useDao();
    const currentProject        =  projectObjectStore.getProject(project.id) ;
    const [canedit, setCanEdit]        = useState(false);
    const [ canValidateTSS, setCanValidateTSS] = useState(false);
    const [ canValidate,setCanValidate]    = useState(false);


    const setRights = ()=>{
        const canedit        = rightsStore.hasPermission(currentProject.id_step,currentProject.id,"EDITER_TSS") &&  [ETUDE_STATUS.EDITION_TSS,ETUDE_STATUS.MAJ_TSS].indexOf(currentProject.id_step_status)!=-1;
        const canValidateTSS = rightsStore.hasPermission(currentProject.id_step,currentProject.id,'VALIDATION_TSS') && currentProject.id_step_status ===ETUDE_STATUS.VALIDATION_TSS;
        const canValidate    = rightsStore.hasPermission(currentProject.id_step,currentProject.id,'PRE_VALIDATION_TSS') && currentProject.id_step_status ===ETUDE_STATUS.PRE_VALIDATION_TSS;
        setCanEdit(canedit)
        setCanValidateTSS(canValidateTSS)
        setCanValidate(canValidate)
    }
    useEffect(()=>{
        setRights();
    },[currentProject])
    const preValidateTss = ()=>{
        projectDao.preValidateTss(project).then((response)=>{ 
            projectObjectStore.updateProject(projectObjectStore.getProjectUpdate(project,response));
            showAlert("validation Tss","la validation est effectué",()=>{
                navigation.navigate(ROUTES.PROJECTS)
            })
      })
     }
    
       const sendTss = ()=>{
        projectDao.syncTss(project).then((response)=>{
              
               projectObjectStore.updateProject(projectObjectStore.getProjectUpdate(project,response));
               showAlert("Tss"," est envoyé",()=>{
                navigation.navigate(ROUTES.PROJECTS)
            })
            
        })
      }

      const addIssue = ()=>{
        navigation.navigate(ROUTES.BLOCAGE,{project:project});

      }
       const rejectTSS = ()=>{
        navigation.navigate(ROUTES.REJECT,{project:project});
       }
       const validateTSS = ()=>{
        projectDao.validateTss(project).then((response)=>{
            projectObjectStore.updateProject(projectObjectStore.getProjectUpdate(project,response));
            showAlert("Tss"," est validé",()=>{
                navigation.navigate(ROUTES.PROJECTS)
            })
      })
       }
    return(
        <View style={{marginTop:style?.marginTop, padding:10}}>
            { canedit && 
                 <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <SButton disabled={canedit}  style={{ color:"#E55959",height:50,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="Bloquer" 
                                onPress={addIssue}>
                            </SButton>
                <SButton disabled={canedit} style={{ alignSelf:"center", height:50,  width:"50%", }} title="Envoyer" 
                        onPress={()=>sendTss()}></SButton>
                </View>
            }
            { canValidate && 
                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <SButton disabled={canValidate} style={{ alignSelf:"center", height:50,  width:"50%", }} title="Valider" 
                        onPress={()=>preValidateTss()}></SButton>
                </View>
            }
            
            { canValidateTSS && 
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
               <SButton disabled={canValidateTSS}  style={{ color:"#E55959",height:50,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="Rejeter" 
                               onPress={()=>rejectTSS()}>
                           </SButton>
               <SButton disabled={canValidateTSS} style={{ alignSelf:"center", height:50,  width:"50%", }} title="Valider" 
                       onPress={()=>validateTSS()}></SButton>
               </View>
                
            }
                </View>
    )

});
export default TssEditionValidation