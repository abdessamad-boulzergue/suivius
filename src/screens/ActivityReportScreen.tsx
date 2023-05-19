// src/screens/ProjectScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListOverViews from './ListProjectsOverViews';
import {liked} from '../assets';
import StaffActivity from './StaffActivityComponent';
import ToolsActivityComponent from './ToolsActivityComponent';
import {ModalExample} from './Modal';
import ArticleConsumeComponent from './ArticleConsumeComponent';
import ImageGrid from './ImageGridComponent';

const Tab = createMaterialTopTabNavigator();

export default function ActivityReportScreen({route}:any) {

    const project = route.params?.project;

    const pages=[
        {
            title:"section1",
            data:[
                {
                    title:"Projet Inwi ",
                    description:"Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500",
                    avatar_url:liked.imageSource,
                },
                {
                    title:"Projet IAM ",
                    description:"Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500",
                    avatar_url:liked.imageSource,
                },
                {
                    title:"Projet Orange ",
                    description:"Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500",
                    avatar_url:liked.imageSource,
                },
                {
                    title:"Projet Oncf ",
                    description:"Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500",
                    avatar_url:liked.imageSource,
                }
            ]
        }
     ]

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
        <Tab.Screen name="Staff" component={StaffActivity} 
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="Materiaux" component={ToolsActivityComponent} 

          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="BQQ" component={ArticleConsumeComponent} 
          initialParams={{ 
            project:project
          }}
        />
        <Tab.Screen name="Photo" component={ImageGrid} 
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
