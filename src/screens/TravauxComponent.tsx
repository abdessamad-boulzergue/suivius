import { View,Text, ScrollView } from "react-native";
import SuiviInputText from "../components/InputText";
import SButton from "../components/common/SButton";
import { Project } from "../database/dao/ProjectDao";
import {useState,useEffect} from 'react'
import { Localisation } from "../database/dao/LocalisationDao";
import { useDao, useStores } from "../stores/context";
import { projectObjectStore } from "../stores/objectsStore";
import { WorkDetails } from "../database/types";
import TssEditionValidation from "../components/TssEditionValidation";
import { observer } from "mobx-react-lite";

const TravauxComponent=observer(({route,navigation}:any)=>{
    
   const{localisationDao,projectWorkDetailsDao} = useDao();
   const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);
   const project = route.params?.project;

   useEffect(()=>{
    localisationDao.getByIdProject(project.id).then(localiz=>{
        setLocalisation(localiz);
    })
   },[])

   const getWorkValue = (infoId:number)=>{
     const idx = projectObjectStore.getProjectsWorkDetails(project).findIndex(info=>info.infoId===infoId);
     return (idx!=-1) ? projectObjectStore.getProjectsWorkDetails(project)[idx].value : "";
   }

   const setWorkValue = async(info:WorkDetails,newValue:string)=>{
        projectObjectStore.setProjectsWorkDetails(project,info,newValue)
        const wdt = await projectWorkDetailsDao.get(project.id,info.id)
        if(wdt){
            projectWorkDetailsDao.update({...wdt , value:newValue})
        }else{
            projectWorkDetailsDao.add({id_project:project.id, id_info : info.id,value:newValue,title:info.title});
        }
    }

    return(
        <ScrollView style={{padding:10,marginBottom:10}}>
            {
                projectObjectStore.detailsWork.map(wdt=>{
                    return <SuiviInputText 
                    onChangeText={(txt:string)=>setWorkValue(wdt,txt)}
                    key={wdt.id} style={{color:'#2F3437'}}
                    title={wdt.title} 
                    value={getWorkValue(wdt.id)} />
                })
            }
            <TssEditionValidation
            navigation={navigation}
                 project={project}
                />
        </ScrollView>
    )

})

export default TravauxComponent;