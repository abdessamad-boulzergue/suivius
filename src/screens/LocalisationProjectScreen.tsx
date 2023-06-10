import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, Button,View,Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

import { RouteProp } from '@react-navigation/native';
import { Project } from '../database/dao/ProjectDao';

import { Localisation } from '../database/dao/LocalisationDao';
import { useDao } from '../stores/context';
import MapView, {Marker,LatLng,Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { observer } from "mobx-react-lite";
import SButton from '../components/common/SButton';
import { projectObjectStore } from '../stores/objectsStore';
import { ETUDE_STATUS, ROUTES } from '../constants';
import { showError } from '../components/toast';
type RootStackParamList = {
    InfoProjectScreen: { project: Project }; 
};

type DestinationScreenRouteProp = RouteProp<RootStackParamList, 'InfoProjectScreen'>;

type Props = {
  route: DestinationScreenRouteProp;
};
const  LocalisationProjectScreen = observer(({navigation,route}:any) => {
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
    const [currentPosition, setCurrentPosition] = useState<LatLng|null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

   useEffect(()=>{
    watchPosition();
      const localisation =projectObjectStore.getProjectLocalisation(project)
      if(localisation){
            setLocalisation({
                addresse:localisation?.address,
                province:localisation?.province,
                region:localisation?.region,
                lat:localisation?.lat,
                lng:localisation?.lng,
                id:0,
                site:localisation?.site
            })
            setRegion ({
                latitude: localisation?.lat,
                longitude: localisation?.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setPosition({ latitude: localisation.lat, longitude:localisation.lng})
        }

   },[])


   const watchPosition =( )=>{
     Geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ latitude, longitude });
                },
                error => Alert.alert("Geolocation error ",error.message),
                { enableHighAccuracy: true, interval:3000 }
            );
   }
   const getLocalisation =(onSuccess:(latLng:LatLng)=>void)=>{
      Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ latitude, longitude });
                    onSuccess( position.coords)
                },
                error => Alert.alert("Geolocation error ",error.message),
                { enableHighAccuracy: true, timeout:10000 }
            );
   }
   const startStudy=()=>{
    projectDao.startStudy(project.id)
    .then(response=>{
        projectObjectStore.updateProject(  {...project, id_step_status:response.stepStatusId});
        setProject(  {...project, id_step_status:response.stepStatusId});
    })
   }

   const startTssEditionEdition=()=>{
        getLocalisation((latLng)=>{
            projectDao.startTssEditionEdition(project.id)
            .then(response=>{
                projectObjectStore.updateProject(  {...project, id_step_status:response.stepStatusId});
                setProject(  {...project, id_step_status:response.stepStatusId});
            })
        })
   }
   const xstartTssEditionEdition=async ()=>{
    getLocalisation((latLng)=>{
        projectDao.toStepStatus(ETUDE_STATUS.EDITION_TSS,project.id)
        .then(projectUpdate=>{
            setProject(projectUpdate)
            projectObjectStore.updateProject(projectUpdate);
        })
    })
    


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
                        {position && <Marker coordinate={position} />}
                        {currentPosition &&<Marker  coordinate={currentPosition} /> }

                         {currentPosition&& position &&
                          <Polyline coordinates={[currentPosition, position]}  strokeWidth={2}/>
                        }

                    </MapView>
                </View>
                <View >
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    {project.id_step_status === 1 &&
                     <SButton style={{ alignSelf:"flex-start", width:"50%", }} title="demarrer" 
                     onPress={startStudy}></SButton>
                    }
                    {project.id_step_status !== 1 &&
                        <SButton style={{ color:"#E55959",alignSelf:"flex-end", backgroundColor:"transparent", width:"40%", }} title="Bloquer" 
                                onPress={()=>{ navigation.navigate(ROUTES.BLOCAGE,{project:project})}}>
                        </SButton>
                    }
                    {project.id_step_status === 2 &&
                        <SButton style={{ alignSelf:"flex-start", width:"50%", }} title="arriver" 
                            onPress={()=>startTssEditionEdition()}>
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
