// src/screens/ProjectScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {inwi} from '../assets';
import ImageGrid from './ImageGridComponent';
import TSSComponent from './TSSComponent';
import TravauxComponent from './TravauxComponent';
import DocumentSelectorDisplay from './DocumentPicker';
import { DOC_TYPES } from '../constants';
import PrestationProjet from '../components/PresentationProjet';
import CroquisComponent from './CroquisComponent';
import TssPhotoComponent from './TssPhotoComponent';

const Tab = createMaterialTopTabNavigator();

export default function EtudeReportScreen({route}:any) {

    const project = route.params.project;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
           
           <PrestationProjet project = {project}></PrestationProjet>
           
        </View>
      <Tab.Navigator
      >
        <Tab.Screen name="TSS" component={TSSComponent} 
         options={commonTopBarOptions}
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="Details Travaux" component={TravauxComponent} 
          options={commonTopBarOptions}
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="Croquis" component={CroquisComponent} 
        options={commonTopBarOptions}
          initialParams={{ 
            project:project,
          }}
        />
        <Tab.Screen name="Photos" component={TssPhotoComponent} 
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
    height:48,
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
    height:210
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
});
