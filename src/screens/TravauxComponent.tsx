import { View,Text, ScrollView } from "react-native";
import SuiviInputText from "../components/InputText";
import SButton from "../components/common/SButton";
import { Project } from "../database/dao/ProjectDao";
import { useDao } from "../stores/daoStores";
import {useState,useEffect} from 'react'
import { Localisation } from "../database/dao/LocalisationDao";

export default function  TravauxComponent({route}:any){
    const detailsWork=[
        "Chambre de source",
        "Tranché mecanisée",
        "tranché traditionnelle",
        "Percement",
        "PEHD 40",
        "chambre",
        "Flexible armé",
        "TAG",
        "PVC",
        "Boite Jonction 144 FO",
        "Cable 144 FO",
        "Cable 24 FO",
        "Emplacement ODF",
        "Install de l'ODF"
    ]
    const{localisationDao} = useDao();
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);
   const project = route.params?.project;
   useEffect(()=>{
    localisationDao.getByIdProject(project.id).then(localiz=>{
        setLocalisation(localiz);
        console.log(localiz)
    })
   },[])

    return(
        <ScrollView style={{padding:15}}>
            {
                detailsWork.map(title=>{
                    return             <SuiviInputText style={{color:'#2F3437'}} title={title} />
                })
            }
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>

            <SButton style={{ color:"#E55959",margin:15,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="Bloquer" 
                            onPress={()=>{}}>
                        </SButton>
            <SButton style={{ alignSelf:"center", width:"50%", }} title="Envoyer" 
                     onPress={()=>{}}></SButton>
                     </View>
        </ScrollView>
    )

}