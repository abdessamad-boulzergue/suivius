import React from 'react';
import { StyleSheet, Text, Button,View,TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AutorizationScreen from './AutorizationScreen';
import EtudeComponent from './EtudeScreen';
import TravauxComponent from './TravauxComponent';

const Tab = createMaterialTopTabNavigator();

import { RouteProp } from '@react-navigation/native';
import { Project } from '../database/dao/ProjectDao';

type RootStackParamList = {
    InfoProjectScreen: { project: Project }; 
};

type DestinationScreenRouteProp = RouteProp<RootStackParamList, 'InfoProjectScreen'>;

type Props = {
  route: DestinationScreenRouteProp;
};

const  InfoProjectScreen =({ route }:Props)=>{

    const project = route.params?.project;

   return(
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.text}>client/site</Text>
                    <Text style={styles.text}>{project.title}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>region</Text>
                    <Text style={styles.text}>inwi</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>province</Text>
                    <Text style={styles.text}>inwi</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>address</Text>
                    <Text style={styles.text}>inwi</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
                </View>
                <Tab.Navigator>
                    <Tab.Screen name="Autorization" component={AutorizationScreen} />
                    <Tab.Screen name="Etude" component={EtudeComponent} />
                    <Tab.Screen name="Travaux" component={TravauxComponent} />
                </Tab.Navigator>
            </View>
    )

}
const styles = StyleSheet.create({
    container: {
        padding:10,
        width:"100%",
        height:"100%",
        borderColor:"black",
    
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
})
export default InfoProjectScreen