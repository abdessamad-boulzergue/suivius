// src/screens/ProjectScreen.js
import React, {useContext, useEffect, useRef, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListProjectsOverViews from './ListProjectsOverViews';
import {inwi} from '../assets';
import { Project } from '../database/dao/ProjectDao';
import { ROUTES } from '../constants/routes';

const Tab = createMaterialTopTabNavigator();

export default function ProjectScreen({navigation,route}:any) {
    const { next } = route.params;
    const nextRouteRef = useRef(next);

    useEffect(() => {
        console.log("NEXT" ,next);
        nextRouteRef.current = next;
    }, [next]);  // This effect runs whenever 'next' changes

    const onProjectView = (project: Project) => {
        console.log("onProjectView ",project)
        if(project.id_step_status===3)
          navigation.navigate(ROUTES.ETUDE_REPORT_SCREEN, { project: project })
        else
            navigation.navigate(ROUTES.PROJECT_LOCALISATION, { project: project })
      };

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
        <Tab.Screen name="FTTS" component={ListProjectsOverViews}
          
          initialParams={{ 
            interact:true,
            categorie:"1",
            onProjectView:onProjectView
          }}
        />
        <Tab.Screen name="B2B" component={ListProjectsOverViews} 
          initialParams={{ 
            interact:true,
            categorie:"2",
            onProjectView:onProjectView
          }}
        />
        <Tab.Screen name="FTTH" component={ListProjectsOverViews} 
          initialParams={{ 
            interact:true,
            categorie:"3",
            onProjectView:onProjectView
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
});
