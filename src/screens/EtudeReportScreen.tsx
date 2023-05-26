// src/screens/ProjectScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListOverViews from './ListProjectsOverViews';
import {inwi} from '../assets';
import StaffActivity from './StaffActivityComponent';
import ToolsActivityComponent from './ToolsActivityComponent';
import {ModalExample} from './Modal';
import ArticleConsumeComponent from './ArticleConsumeComponent';
import ImageGrid from './ImageGridComponent';
import TSSComponent from './TSSComponent';
import TravauxComponent from './TravauxComponent';
import DocumentSelectorDisplay from './DocumentPicker';

const Tab = createMaterialTopTabNavigator();

export default function EtudeReportScreen({route}:any) {

    const project = route.params?.project;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require('../assets/images/logo_primary.png')} 
        />
        <Text style={styles.headerText}>Rapport activité</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="TSS" component={TSSComponent} 
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="Details Travaux" component={TravauxComponent} 

          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="Croquis" component={DocumentSelectorDisplay} 
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="Photos" component={ImageGrid} 
          initialParams={{ 
            project:project
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerImage: {
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"black"
  },
});
