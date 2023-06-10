import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, Button,View,TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AutorizationScreen from './AutorizationScreen';
import EtudeComponentSummary from './EtudeComponentSummary';
import TravauxComponent from './TravauxComponent';

const Tab = createMaterialTopTabNavigator();

import { RouteProp } from '@react-navigation/native';
import { Project } from '../database/dao/ProjectDao';

import { Localisation } from '../database/dao/LocalisationDao';
import { useDao, useStores } from '../stores/context';

type RootStackParamList = {
    InfoProjectScreen: { project: Project }; 
};

type DestinationScreenRouteProp = RouteProp<RootStackParamList, 'InfoProjectScreen'>;

type Props = {
  route: DestinationScreenRouteProp;
};
export default function InfoProjectScreen({route}:any) {

    const{daoStores} = useStores();
    const{localisationDao,projectDao} = daoStores;
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);
   const project = route.params?.project;
   useEffect(()=>{
    localisationDao.getByIdProject(project.id).then(localiz=>{
        setLocalisation(localiz);
        console.log(localiz)
    })
   },[])
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
                <Tab.Navigator>
                    <Tab.Screen name="Autorization" component={AutorizationScreen} 
                    options={commonTopBarOptions}
                      initialParams={{
                        project:project
                       }}
                    />
                    <Tab.Screen name="Etude" component={EtudeComponentSummary}
                    options={commonTopBarOptions}
                    initialParams={{
                        project:project
                       }}
                    />
                    <Tab.Screen name="Travaux" component={TravauxComponent}
                    options={commonTopBarOptions}
                     />
                </Tab.Navigator>
            </View>
    )

}
const commonTopBarOptions= {
    tabBarStyle:{
      borderBottomColor:'#F4F1F1',
      borderBottomWidth:1,
      height:40,
    },
    tabBarIndicatorStyle: { 
      backgroundColor: '#326972' 
    },
  }
const styles = StyleSheet.create({
    container: {
        padding:10,
        width:"100%",
        height:"100%",
        borderColor:"black",
    
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
