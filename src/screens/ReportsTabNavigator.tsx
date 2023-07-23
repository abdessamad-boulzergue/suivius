// src/screens/ProjectScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 
import { Localisation } from '../database/dao/LocalisationDao'; 
import { inwi } from '../assets';
import ReportsList from './ReportsList';
import EtudeComponentSummary from './EtudeComponentSummary';
import AutorizationScreen from './AutorizationScreen';
import TotalArticleConsumeComponent from './TotalArticleConsumeComponent';
import PrestationProjet from '../components/PresentationProjet';

const Tab = createMaterialTopTabNavigator();

export default function ReportsTabNavigator({route}:any) {

    const project = route.params?.project;
   
  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <PrestationProjet project={project}></PrestationProjet>
        </View>
      
      <Tab.Navigator>
      <Tab.Screen name="Les Travaux" component={ReportsList} 
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
         <Tab.Screen name="Autorisation" component={AutorizationScreen} 
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
    padding: 15,
    height:"30%"
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
