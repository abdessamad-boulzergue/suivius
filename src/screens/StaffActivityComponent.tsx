import React, {useEffect, useState} from 'react';
import {
    Text,  TouchableOpacity,StyleSheet, SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView, Modal, FlatList, Image
} from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


import SuiviInputDate from '../components/InputDate';
import InputSearch from '../components/InputSearch';
import { Project } from '../database/dao/ProjectDao';
import { useDao } from '../stores/context';
import { Work } from '../database/dao/WorkDao';
import { TABLES } from '../database/dao/constants';
import { format } from 'date-fns';
import { StaffMember } from '../database/dao/StaffDao';
import { CardSection, Input } from '../components/common';
import SButton from '../components/common/SButton';
import { SquadDto } from '../services/types';
import { projectObjectStore } from '../stores/objectsStore';
import {SIMPLE_DATE_FORMAT, SIMPLE_TIME_FORMAT } from '../constants';
import { ModalList, ModalListItem } from '../components/ModalList';
interface ListItem{
    
}

export const ModalStaff =({pages,visible, onClose}:any)=> {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [staffPage, setStaffPage] = useState<Array<{title:string,data:Array<StaffMember>}>>(pages || []);

    const [selectedMember, setSelectedMember] = useState<Array<StaffMember>>([]);

    onClose = onClose || (()=>{});
    useEffect(()=>{
        setModalVisible(visible)
        setStaffPage(pages)
    },[visible,pages])

    const closeModal=()=>{
        onClose(selectedMember)
        setSelectedMember([])
    }
    const onLongPress = (item:StaffMember) => {
        console.log(item)
        setSelectedMember((prevSelectedMember) => [...prevSelectedMember, item]);
      };
      const isItemSelected = (item:StaffMember) => {
        return selectedMember.some(member => member.id === item.id);
      };
    
        return (
                <Modal
                    style={{margin: 30, width:120,height:80}}
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => { }}>
                    <View style={{margin: 22}}>
                        <SectionList sections={staffPage}
                            renderItem={({item}:{item: StaffMember}) =>{ 
                                
                                return(
                                    <TouchableOpacity onLongPress={() => onLongPress(item)}>
                                        <CardSection style={{backgroundColor: isItemSelected(item) ? "#aeaebe" : "#ffffff"}}>
                                        <Input label="name" value={ item.name } editable={false} />
                                        </CardSection>
                                    </TouchableOpacity>
                                    
                                )
                            }}
                            ItemSeparatorComponent={()=> <View style={styles.separator} />}

                            keyExtractor={(item, index) => index.toString()}
                             />
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
                    <SButton  style={{ color:"#E55959",height:50,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="fermer" 
                        onPress={()=>onClose([])}></SButton>
                        <SButton  style={{ alignSelf:"center", height:50,  width:"50%", }} title="Ajouter" 
                        onPress={closeModal}></SButton>
                    </View>
                </Modal>
        );
    
}

const StaffActivityComponent = ({route,navigation}:any) => {

    const  project:Project = route.params.project;
    const {workDao,projectDao} = useDao();
    const [squad, setSquad] = useState<SquadDto[]>([]);
    const [staff,setStaff] = useState<ModalListItem[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(()=>{
      const staffData = projectObjectStore.getStaff();
      if(staffData)
          setStaff(staffData.map(data=>{
            return { id:data.id, title:data.name}
          }))
     const squadData =  projectObjectStore.getProjectsSquad(project)
     setSquad(squadData);
    },[])
    const  getStaffWOrk= () => {
        workDao.getByIdProject(project.id).then(
            (work)=>{
                console.log(work)
            }
        );
    }
    const  filterStaff= async (name:string) => {

         setModalVisible(true)

    }
    const getDate=(time:string):Date=>{
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date(); // Create a new Date object
        date.setHours(hours||0, minutes||0);
        return date;
    }
    const sendSquadWork =()=>{
        const squadWork = projectObjectStore.getProjectsSquad(project)
         
        console.log(squadWork)
         projectDao.sendSquadWork(project.id,squadWork)
    }
   const  addStaffWork=(staff:Array<ModalListItem>)=>{
        setModalVisible(false)
       const squadWork :SquadDto[ ]= staff.filter(member=> squad.length===0 || squad.find(it=>it.memberId===member.id)===undefined)
        .map( member=>{
            return  {
                name:member.title,
                memberId:member.id,
                normalHours:"",
                additionalHours:"",
                date: format(new Date(),SIMPLE_TIME_FORMAT)
            }
        })
        setSquad([...squad, ...squadWork])    
        projectObjectStore.setProjectsSquad(project,[...squad,...squadWork])       

    }

        const setNormalHours = (date:Date,id_staff:number)=>{
            const index = squad.findIndex(it=>it.memberId===id_staff) 
            const update :SquadDto = {
                additionalHours :squad[index].additionalHours,
                normalHours:format(date,SIMPLE_TIME_FORMAT),
                memberId: squad[index].memberId,
                date : format(new Date(),SIMPLE_DATE_FORMAT),
                name: squad[index].name
            }

            const squadUpdate = [ ...squad.slice(0,index),update, ...squad.slice(index+1)]
            setSquad(squadUpdate);
            projectObjectStore.setProjectsSquad(project ,squadUpdate)
        }
    const setAditionalHours =(date:Date,id_staff:number)=>{
        const index = squad.findIndex(it=>it.memberId===id_staff) 
        const update :SquadDto = {
            additionalHours :format(date,SIMPLE_TIME_FORMAT),
            normalHours:squad[index].normalHours,
            memberId: squad[index].memberId,
            date : format(new Date(),SIMPLE_DATE_FORMAT),
            name: squad[index].name
        }

        const squadUpdate = [ ...squad.slice(0,index),update, ...squad.slice(index+1)]
        setSquad(squadUpdate);
        projectObjectStore.setProjectsSquad(project ,squadUpdate)
    }
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };


        return (
            <View style={{flex: 1,}}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>rechercher collaborateur :</Text>
                        <InputSearch onSearch={(text:string)=> {
                            filterStaff(text)
                        }} 
                            value="" placeholder="recherher un collaborateur"></InputSearch>
                </View>

                <ModalList data={staff} visible={modalVisible} onClose={addStaffWork} ></ModalList>


                    <FlatList data={squad}
                    renderItem={({item}:{item: SquadDto}) =>{ 
                        
                        return(
                            <View style ={styles.listItem}>
                                <View style={{width:"25%"}}>
                                    <Text style ={styles.listItemTitle}>{(item.name)}</Text>
                                </View>
                                <View style={{width:"30%"}}>
                                    <SuiviInputDate onChange={(date:Date)=>setNormalHours(date,item.memberId)} date={getDate(item.normalHours)} title="Nbr H.N" mode="time" style={styles.inputDate}></SuiviInputDate>
                                </View>
                                <View style={{width:"30%"}}>
                                    <SuiviInputDate  onChange={(date:Date)=>setAditionalHours(date,item.memberId)} date={getDate(item.additionalHours)}  title="Nbr H.SUPP"  mode="time"style={styles.inputDate} ></SuiviInputDate>
                                </View>
                                <Text style={{color:"black"}}>5h30</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                
                    ItemSeparatorComponent={renderSeparator}

                    />
                 <SButton  style={{ alignSelf:"center", height:50,  width:"60%",margin:15 }} title="Envoyer" 
                        onPress={ sendSquadWork }></SButton>
            </View>
        );
    
}
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

export default StaffActivityComponent;
