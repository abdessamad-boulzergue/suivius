// src/screens/ProjectScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BOQComponent from './BOQComponent';
import EtudeComponentSummary from './EtudeComponentSummary';
import DocumentSelectorDisplay from './DocumentPicker';
import { useDao, useStores } from '../stores/context';
import { Localisation } from '../database/dao/LocalisationDao';
import { DOC_TYPES } from '../constants';
import APDComponent from './APDComponent';

const Tab = createMaterialTopTabNavigator();

export default function EtudeAPDScreen({route}:any) {

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
          </View>
      
      <Tab.Navigator>
        <Tab.Screen name="Etude" component={EtudeComponentSummary} 
        options={commonTopBarOptions}
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="BOQ" component={BOQComponent} 
        options={commonTopBarOptions}
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="APD" component={APDComponent} 
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
    padding:10,
        width:"100%",
        height:250,
        borderColor:"black",
  },
  headerImage: {
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"black"
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
