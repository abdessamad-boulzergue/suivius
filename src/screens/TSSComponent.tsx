import { View,Text } from "react-native";
import SuiviInputText from "../components/InputText";
import SButton from "../components/common/SButton";
import { Project } from "../database/dao/ProjectDao";
import { useDao } from "../stores/daoStores";
import {useState,useEffect} from 'react'
import { Localisation } from "../database/dao/LocalisationDao";

export default function  TSSComponent({route}:any){

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
        <View style={{padding:15}}>
            <Text style={{color:"#000"}}>Compte rendu de visite technique</Text>
            <SuiviInputText style={{color:'#2F3437'}} title="Site" value={localisation?.site} />
            <SuiviInputText style={{color:"#000"}} title="Region" value={localisation?.region}> </SuiviInputText>
            <SuiviInputText style={{color:"#000"}} title="Province" value={localisation?.province}> </SuiviInputText>
            <SuiviInputText style={{color:"#000"}} title="Addresse" value={localisation?.addresse}> </SuiviInputText>
            
            <SuiviInputText style={{color:"#000"}} title="Latitude" value={localisation?.site}> </SuiviInputText>
            <SuiviInputText style={{color:"#000"}} title="Longitude" value={localisation?.site}> </SuiviInputText>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>

            <SButton style={{ color:"#E55959",margin:15,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="Bloquer" 
                            onPress={()=>{}}>
                        </SButton>
            <SButton style={{ alignSelf:"center", width:"50%", }} title="Envoyer" 
                     onPress={()=>{}}></SButton>
                     </View>
        </View>
    )

}