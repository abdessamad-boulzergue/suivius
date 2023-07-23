// src/screens/ProjectScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {useStores } from '../stores/context';
import { Localisation } from '../database/dao/LocalisationDao';
import AutorizationScreen from './AutorizationScreen';
import { inwi } from '../assets';
import EtudeComponentSummary from './EtudeComponentSummary';

const Tab = createMaterialTopTabNavigator();

export default function WorkAndAuthorizationScreen({route}:any) {

    const project = route.params?.project;

    const{daoStores} = useStores();
    const{localisationDao} = daoStores;
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);
   useEffect(()=>{
    localisationDao.getByIdProject(project.id).then(localiz=>{
        setLocalisation(localiz);
    })
   },[])
  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <Image
              style={styles.headerImage}
              source={inwi.imageSource}
            />
            <Text style={styles.headerText}> Lorem ipsum dolor sit amet,consectetur </Text>
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
      </Tab.Navigator>
    </View>
  );
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
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height:"20%"
  },
  headerImage: {
  },
  headerText: {
    fontSize: 11,
    fontFamily:"inter",
    fontWeight: "500",
    color:"black",
    margin:5
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
});
