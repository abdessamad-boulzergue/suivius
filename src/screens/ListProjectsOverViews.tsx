import React, {Component, useContext} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView
} from 'react-native';
import OverViewItem from '../components/OverViewItem';
import { Picker } from '@react-native-picker/picker';
import {useEffect, useState} from 'react';
import  { Project } from '../database/dao/ProjectDao';

import { useDao } from '../stores/context';
import { projectObjectStore } from '../stores/objectsStore';
import { observer } from 'mobx-react-lite';
import { Step } from '../database/types';
import { useStores } from '../stores/context';
import ProjectOverView from '../components/ProjectOverView';


interface ListOverViewState {
    style: {};
    selectedOption:string,
    steps: Array<Step>
  }

const ListProjectsOverViews =  observer(({route,navigation}:any) => {

    const {interact,categorie,key} = route.params;
    const {projectDao,stepDao} = useDao()
    const {rightsStore} = useStores();
    const [state, setState] = useState<ListOverViewState>({
        style:styles,
        selectedOption:"",
        steps:[]
    });
    const onProjectView = (project: Project) => {
      const route = rightsStore.getRouteForStatus(project.id_step_status)
      navigation.navigate(route, { project: project })
    };

    const  getAllProjects = () => {
        projectDao.getForUserByCategorie(rightsStore.currentUser.id,categorie).then(
            (projs)=>{
                projectObjectStore.setProjects(categorie,projs)
            }
        );
    }

    const  getAllSteps = () => {
        stepDao.getAll()
        .then( steps=>{ setState({...state,steps})});
    }

    useEffect(() => {
        getAllSteps();
      }, []);

   const  onStepChange =(id_step:string)=>{
        setState({...state,selectedOption:id_step});
        if(id_step!="-1"){
            projectDao.getForUserByStepAndCategorie(rightsStore.currentUser.id,id_step,categorie)
            .then( projs=>{
                projectObjectStore.setProjects(categorie,projs)
            });
        }else{
            getAllProjects();
        }
   }

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

        return (
            <View style={{flex: 1,}}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>L'etap du projet * </Text>
                    <View style={styles.pickerContainer}>
                          <Picker
                            style={styles.picker}
                            selectedValue={state.selectedOption}
                            onValueChange={(itemValue) => onStepChange(itemValue)}
                            dropdownIconColor= 'black'
                        >
                             <Picker.Item label="tous les étapes" value="-1" key="-1" />
                            {
                            state.steps.map((step)=>{return (
                                <Picker.Item label={step.title} value={step.id} key={step.id} />
                            )})
                           }
                    </Picker>
                    </View> 
                </View>
                <SectionList sections={[{title:"",data:projectObjectStore.getCategorie(categorie)}]}
                 renderItem={({item}:{item:Project}) =>{ 
                    return(
                            <ProjectOverView key={key} item = {item} navigation={navigation}
                                            onView ={(vItem:any) => {   onProjectView(vItem)  }}
                                                            />
                            )}}
                        renderSectionHeader={({section}) => {
                                        return(section.title?  (<Text style ={styles.sectionTitle}> {section.title} </Text>) : <Text/>)
                                    }}
                        keyExtractor={(item, index) => index.toString()}
                    
                        ItemSeparatorComponent={renderSeparator}

                        />
                    </View>
                )})
const window = Dimensions.get('window')
const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
        color:'black'
      },
      separator: {
        height: 1,
        backgroundColor: '#ECECEC',
      },
      dropdownContainer: {
        margin: 20,
        marginBottom:0
      },
      label: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 8,
        color:"#2F3437"
      },
      pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
      },
      picker: {
        flex: 1,
        height: 40,
        color: '#75828A',
        backgroundColor:'#FFFFFF',
        borderColor:'#C8CDD0'
      },
      pickerItem: {
        color: 'black', // Replace with the desired color
      },
      arrowIcon: {
        marginRight: 8,
      },
      SectionStyle: {
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 15,
    },
    sectionTitle:{
        fontSize:30
    },
    listItemTitle:{
        color:"#4a545a",
        fontSize:25,
    },
    listItem:{
      marginLeft:3,
      marginBottom:10,
     alignItems: 'center',
     borderBottomWidth:1,
     borderBottomColor:"#4a545a"
    },
    listItemImage:{
        width:'98%',
        alignSelf: 'center',
        height:window.height/2,
        resizeMode: 'stretch',
    },
    listItemDescription:{
        marginLeft:5,
        marginBottom:5,
        fontSize:15,
        width:'85%'
    }
});

export default ListProjectsOverViews;
