import React, {Component, useContext} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView
} from 'react-native';
import OverViewItem from '../components/OverViewItem';
import { Picker } from '@react-native-picker/picker';
import {useEffect, useState} from 'react';
import { ROUTES } from '../constants/routes';
import ProjectDao, { Project } from '../database/dao/ProjectDao';
import DatabaseContext from '../database/DatabaseContext';
import StepDao, { Step } from '../database/dao/StepDao';
import { useDao } from '../stores/daoStores';


interface ListOverViewState {
    style: string;
    pages:Array<{title:string,data:Array<any>}>,
    selectedOption:string,
    steps: Array<Step>
    onProjectView:(project:Project)=>void
  }

const ListProjectsOverViews = ({route}:any) => {

    const style = route.params.style || styles ;
    const {interact,categorie,onProjectView,key} = route.params;
    const {projectDao,stepDao} = useDao()
    const [pages, setPages] = useState<Array<{title:string,data:Array<any>}>>([]);
    const [state, setState] = useState<ListOverViewState>({
        pages:[],
        style:style,
        selectedOption:"",
        steps:[],
        onProjectView:onProjectView || (()=>{})
    });

    const  getAllProjects = () => {
        projectDao.getByCategorie(categorie).then(
            (projects)=>{
                setPages([{title:"", data:projects}]);
            }
        );
    }

    const  getAllSteps = () => {
        stepDao.getAll()
        .then( steps=>{ setState({...state,steps})});
    }

    useEffect(() => {
       getAllProjects();
        getAllSteps();
      }, []);

   const  onStepChange =(item:string)=>{
    setState({...state,selectedOption:item});
    if(item!="-1"){
        projectDao.getByStepAndCategorie(item,categorie)
        .then( data=>{ setPages([{title:"", data:data}])});
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
                    <Text style={styles.label}>Select an option:</Text>
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
                <SectionList sections={pages}
                 renderItem={({item}) =>{ 
                    return(
                            <OverViewItem key={key}  style={state.style} item = {item} interact={interact}
                                            onView ={(vItem:any) => {   state.onProjectView(vItem)  }}
                                                            />
                            )}}
                        renderSectionHeader={({section}) => {
                                        return(section.title?  (<Text style ={styles.sectionTitle}> {section.title} </Text>) : <Text/>)
                                    }}
                        keyExtractor={(item, index) => index.toString()}
                    
                        ItemSeparatorComponent={renderSeparator}

                        />
                    </View>
                )}
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
        backgroundColor: '#ccc',
      },
      dropdownContainer: {
        margin: 20,
        marginBottom:0
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color:"black"
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
        color: '#000',
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
