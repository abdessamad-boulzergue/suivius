// src/screens/ProjectScreen.js
import React, {useContext, useEffect, useRef, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListProjectsOverViews from './ListProjectsOverViews';
import {liked} from '../assets';
import { Project } from '../database/dao/ProjectDao';

const Tab = createMaterialTopTabNavigator();

export default function ProjectScreen({navigation,route}:any) {
    const { next } = route.params;
    const nextRouteRef = useRef(next);

    useEffect(() => {
        console.log("NEXT" ,next);
        nextRouteRef.current = next;
    }, [next]);  // This effect runs whenever 'next' changes

    const onProjectView = (item: Project) => {
        console.log("GO TO", nextRouteRef.current);
        navigation.navigate(nextRouteRef.current, { project: item })
      };
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
        <Text style={styles.headerText}>Project Screen</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="FTTS" component={ListProjectsOverViews}
          
          initialParams={{ 
            interact:true,
            pages:pages,
            categorie:"1",
            onProjectView:onProjectView
          }}
        />
        <Tab.Screen name="B2B" component={ListProjectsOverViews} 
          initialParams={{ 
            interact:true,
            pages:pages,
            categorie:"2",
            onProjectView:onProjectView
          }}
        />
        <Tab.Screen name="FTTH" component={ListProjectsOverViews} 
          initialParams={{ 
            interact:true,
            pages:pages,
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
  },
  headerImage: {
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"black"
  },
});
