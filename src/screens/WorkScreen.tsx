// src/screens/ProjectScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 
import {  useStores } from '../stores/context';
import { Localisation } from '../database/dao/LocalisationDao'; 
import ToolsActivityComponent from './ToolsActivityComponent';
import StaffActivityComponent from './StaffActivityComponent'; 
import { inwi } from '../assets';
import { ReportDto } from '../services/types';
import BOQComponent from './BOQComponent';
import ArticleConsumeComponent from './ArticleConsumeComponent';
import { DOC_TYPES } from '../constants';
import ImageGrid from './ImageGridComponent';
import TotalArticleConsumeComponent from './TotalArticleConsumeComponent';
import TravauxPhotoComponent from './TravauxPhotoComponent';

const Tab = createMaterialTopTabNavigator();

export default function WorkScreen({route}:any) {

    const project = route.params?.project;
    const report :ReportDto = route.params?.report;

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
      <Tab.Screen name="ToolsUsage" component={ToolsActivityComponent} 
        options={{...commonTopBarOptions,
          tabBarLabel: props => <Text {...props} style={styles.tabBarTitle}>Materiaux</Text> 
        }}
          initialParams={{ 
            project:project,
            report:report
          }}
        /> 
      <Tab.Screen name="BOQ" component={ArticleConsumeComponent} 
           options={{...commonTopBarOptions,
            tabBarLabel: props => <Text {...props} style={styles.tabBarTitle}>BOQ</Text> 
          }}
          initialParams={{ 
            project:project,
            report:report
          }}
        />
       
        <Tab.Screen name="StaffActivity" component={StaffActivityComponent} 
          options={{...commonTopBarOptions,
            tabBarLabel: props => <Text {...props} style={styles.tabBarTitle}>collaborateurs</Text> 
          }}
          initialParams={{ 
            project:project,
            report:report
          }}
        />
         <Tab.Screen name="Photos" component={TravauxPhotoComponent} 
          options={{...commonTopBarOptions,
            tabBarLabel: props => <Text {...props} style={styles.tabBarTitle}>Photos</Text> 
          }}
          initialParams={{ 
            project:project,
           report:report
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
  tabBarTitle:{
    color:'#8D8585',
    textTransform: 'none'
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
