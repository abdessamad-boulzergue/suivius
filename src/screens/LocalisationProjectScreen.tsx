import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, Button,View,TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

import { RouteProp } from '@react-navigation/native';
import { Project } from '../database/dao/ProjectDao';

import { Localisation } from '../database/dao/LocalisationDao';
import { useDao } from '../stores/daoStores';
import MapView, { Marker,LatLng } from 'react-native-maps';
import { observer } from "mobx-react-lite";
import SButton from '../components/common/SButton';
import { projectObjectStore } from '../stores/objectsStore';
type RootStackParamList = {
    InfoProjectScreen: { project: Project }; 
};

type DestinationScreenRouteProp = RouteProp<RootStackParamList, 'InfoProjectScreen'>;

type Props = {
  route: DestinationScreenRouteProp;
};
const  LocalisationProjectScreen = observer(({route}:any) => {
    const {projectDao} = useDao();
    const [mapReady, setMapReady] = useState(false);
    const [position,setPosition]=useState<LatLng|null>(null)
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const{localisationDao} = useDao();
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);
    const [project, setProject] = useState<Project>(route.params?.project)
    console.log("project ======> ",project.id_step_status)
   useEffect(()=>{
    localisationDao.getByIdProject(project.id).then(localiz=>{
        setLocalisation(localiz);
        setRegion({
            latitude: localiz.lat,
            longitude: localiz.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        })

        setPosition({ latitude: localiz.lat, longitude:localiz.lng})
    })
   },[])

   const updateProjectStepStatus=()=>{
    projectDao.nextStep(project.id).then(projectUpdate=>{
        console.log("updateProjectStepStatus",projectUpdate )
        setProject(projectUpdate)
        projectObjectStore.updateProject(projectUpdate);
    });
   }

   return(
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.text}>client/site</Text>
                    <Text style={styles.text}>{localisation?.site}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>region</Text>
                    <Text style={styles.text}>{localisation?.region}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>province</Text>
                    <Text style={styles.text}>{localisation?.province}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>address</Text>
                    <Text style={styles.text}>{localisation?.addresse}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
                </View>
                <View style={{flex:1,marginTop:10,marginBottom:20 }}>
                    <MapView
                        style={{ flex: 1}}
                        region={region}
                        onMapReady={() => setMapReady(true)}
                    >
                         {mapReady && position &&(
                            <Marker
                                coordinate={position}
                            />
                         )}
                    </MapView>
                </View>
                <View >
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    {project.id_step_status === 1 &&
                     <SButton style={{ alignSelf:"flex-start", width:"50%", }} title="demarer" 
                     onPress={()=>updateProjectStepStatus()}></SButton>
                    }
                    {project.id_step_status !== 1 &&
                        <SButton style={{ color:"#E55959",alignSelf:"flex-end", backgroundColor:"transparent", width:"40%", }} title="Bloquer" 
                        onPress={()=>{}}>

                        </SButton>
                    }
                    {project.id_step_status === 2 &&
                        <SButton style={{ alignSelf:"flex-start", width:"50%", }} title="arriver" 
                            onPress={()=>updateProjectStepStatus()}>
                        </SButton>
                    }
                </View> 
                </View>
            </View>
    )

})
export default LocalisationProjectScreen
const styles = StyleSheet.create({
    container: {
        padding:10,
        width:"100%",
        height:"100%",
        borderColor:"black",
    
    },
    map:{

    },
    info:{ 
        padding:10,
        flex:1, 
        flexDirection: 'row',
        justifyContent:'space-between',
        maxHeight:50,
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
    },
    text:{
        color:"black"
    }
})
