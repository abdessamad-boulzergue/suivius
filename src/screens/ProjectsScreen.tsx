// src/screens/ProjectScreen.js
import React, {useContext, useEffect, useRef, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListProjectsOverViews from './ListProjectsOverViews';
import {inwi} from '../assets';
import { Project } from '../database/dao/ProjectDao';

import { useStores } from '../stores/context';
 
const Tab = createMaterialTopTabNavigator();

export default function ProjectScreen({navigation,route}:any) {
    const { next } = route.params;
    const nextRouteRef = useRef(next);
    const {rightsStore} = useStores();
    useEffect(() => {
      
        nextRouteRef.current = next;
    }, [next]);  // This effect runs whenever 'next' changes

   
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
        options={commonTopBarOptions}
          initialParams={{
            interact:true,
            categorie:"1",
          }}
        />
        <Tab.Screen name="B2B" component={ListProjectsOverViews} 
        options={commonTopBarOptions}
          initialParams={{ 
            interact:true,
            categorie:"2",
          }}
        />
        <Tab.Screen name="FTTH" component={ListProjectsOverViews} 
        options={commonTopBarOptions}
          initialParams={{ 
            interact:true,
            categorie:"3",
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
});
