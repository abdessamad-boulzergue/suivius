import React, {useEffect, useState} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView, FlatList
} from 'react-native';

import SuiviInputText from '../components/InputText';
import SuiviInputDate from '../components/InputDate';
import ProjectDao, { Project } from '../database/dao/ProjectDao';
import { useDao } from '../stores/context';
import { ArticleConsume } from '../database/dao/ArticleConsumeDao';
import InputSearch from '../components/InputSearch';
import WorkToolsUsageDao from '../database/dao/WorkToolsUsageDao';
import { WorkToolsUsage } from '../database/dao/WorkToolsUsageDao';
import { format } from 'date-fns';
import { TABLES } from '../database/dao/constants';
import SButton from '../components/common/SButton';
import { projectObjectStore } from '../stores/objectsStore';
import { observer } from 'mobx-react-lite';
import { ToolDto, ToolUsageDto } from '../services/types';
import { SIMPLE_DATE_FORMAT, SIMPLE_TIME_FORMAT } from '../constants';
import { SIMPLE_DATE_TIME_FORMAT } from '../constants';
import { ModalList, ModalListItem } from '../components/ModalList';


interface ListOverViewState {
    pages:Array<{title:string,data:Array<ArticleConsume>}>,
    selectedOption:string,
    selectData:Array<any>
  }

const ToolsActivityComponent = observer( ({route,navigation}:any) => {

     const [modalVisible, setModalVisible] = useState<boolean>(false);
     const [tools,setTools] = useState<ModalListItem[]>([])

    const  project:Project = route.params.project;
    const {workToolsUsageDao, projectDao} = useDao();
    const [toolUsage, setToolUsage] = useState<ToolUsageDto[]>([]);

    useEffect(()=>{
      const tools = projectObjectStore.getTools();
      if(tools)
          setTools(tools.map(data=>{
            return {...data}
          }))
        const usages = projectObjectStore.getProjectsToolsUsage(project)
        if(usages){
          setToolUsage(usages)
        }
    },[])

    const getDate=(time:string):Date=>{
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date(); // Create a new Date object
        date.setHours(hours||0, minutes||0);
        return date;
    }
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };
  
  const sendToolUsage =()=>{
    const usages = projectObjectStore.getProjectsToolsUsage(project)
     projectDao.sendToolUsage(project.id,usages)
  }
  const  addTool=(tools:Array<ModalListItem>)=>{
    setModalVisible(false)
    const newTools :ToolUsageDto[ ]= tools.filter(tool=> toolUsage.length===0 || toolUsage.find(it=>it.toolId===tool.id)===undefined)
                                      .map(tool=>{
                                        return { date: format(new Date(),SIMPLE_DATE_FORMAT), 
                                                 title:tool.title,
                                                 timeUsage:'',
                                                 toolId:tool.id
                                                }
                                      })
      setToolUsage([...toolUsage,...newTools]);
      projectObjectStore.setProjectsToolsUsage(project,[...toolUsage,...newTools])       
  }
  const filterTools=(title:string)=>{
    setModalVisible(true);
  }
  const onDateChange =(date:Date,tool:ToolUsageDto)=>{
    const index = toolUsage.findIndex(usage=> usage.toolId ==tool.toolId);
    let   usages :ToolUsageDto[] = [];
    const update:ToolUsageDto= { toolId:tool.toolId,
                                  title :tool.title, 
                                  timeUsage : format(date,SIMPLE_TIME_FORMAT),  
                                  date : format(new Date(),SIMPLE_DATE_FORMAT)
                                }

       usages  = [ ...toolUsage.slice(0,index),update, ...toolUsage.slice(index+1)]
    
    console.log("tool ", tool,"  index ",usages)
    setToolUsage(usages)
    projectObjectStore.setProjectsToolsUsage(project,usages)

    /*const fields :{[key:string]:any} ={};
    fields[key]=format(date,"HH:mm");
    workToolsUsageDao.updateDate(project.id,id_tool,fields)*/
}

        return (
            <View style={{flex: 1,}}>
                <View style={styles.dropdownContainer}>
                <Text style={styles.label}>rechercher collaborateur :</Text>
                        <InputSearch onSearch={(text:string)=> {
                            filterTools(text)
                        }} 
                            value="" placeholder="recherher un collaborateur"></InputSearch>
                </View>

                <ModalList data={tools} visible={modalVisible} onClose={addTool} ></ModalList>
                <FlatList data={toolUsage}
                 renderItem={({item}:{item: ToolUsageDto}) =>{ 
                    
                    return(
                        <View style ={styles.listItem}>
                            <View style={{width:"25%"}}>
                                <Text style ={styles.listItemTitle}>{(item.title)}</Text>
                            </View>
                            <View style={{width:"30%"}}>
                                 <SuiviInputDate onChange={(date:Date)=>onDateChange(date,item)} date={getDate(item.timeUsage)} title="Nbr H.N" mode="time" style={styles.inputDate}></SuiviInputDate>
                             </View>
                        </View>
                    )
                }} 
                keyExtractor={(item, index) => index.toString()}
               
                ItemSeparatorComponent={renderSeparator}

                 />
                 <SButton  style={{ alignSelf:"center", height:50,  width:"60%",margin:15 }} title="Envoyer" 
                        onPress={()=>sendToolUsage()}></SButton>
            </View>
        );
    
})
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
      inputDate:{
        borderColor:"#cacaca",
        backgroundColor:"transparent",
        borderWidth:0.3,
        titleColor:"#aeaeca"
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
        fontSize:15,
    },
    listItem:{
    flex:1,
     flexDirection:'row',
     padding:10,
     justifyContent:'space-between',
     alignItems: 'center',
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

export default ToolsActivityComponent;
