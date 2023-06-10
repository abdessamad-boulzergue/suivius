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
                        <View>

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

                <Button onPress={()=>closeModal()}> <Icon size={20} name="search"/> </Button>

                        </View>
                    </View>
                </Modal>
        );
    
}

const StaffActivityComponent = ({route,navigation}:any) => {

    const selectedOption="";
    const  project:Project = route.params.project;
    const {workDao,staffDao} = useDao();
    const [pages, setPages] = useState<Array<{title:string,data:Array<Work>}>>([]);
    const [filtredStaff, setFiltredStaff] = useState<Array<{title:string,data:Array<StaffMember>}>>([]);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(()=>{
        getStaffWOrk();
    },[])
    const  getStaffWOrk= () => {
        workDao.getByIdProject(project.id).then(
            (work)=>{
                console.log(work)
                setPages([{title:"", data:work}]);
            }
        );
    }
    const  filterStaff= async (name:string) => {
       const filtered = await staffDao.getWithFilter({name:name})
        setFiltredStaff([{title:"", data:filtered}]);
        console.log("FILTERED : " , filtered)
        setModalVisible(true)

    }
    const getDate=(time:string):Date=>{
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date(); // Create a new Date object
        date.setHours(hours||0, minutes||0);
        return date;
    }
   const  addStaffWork=(staff:Array<StaffMember>)=>{
        setModalVisible(false)
        staff.filter(member=> pages.length===0 || pages[0].data.length ===0 || pages[0].data.find(it=>it.id_staff===member.id)===undefined)
        .forEach(async member=>{
            const work :Work ={
                id_project : project.id,
                id_staff:member.id,
                nbr_add_hour:"",
                nbr_hour:"",
                staff:member
            }
            pages[0].data.push(work)
            await workDao.add(work);
        })
        setPages(pages)
    }
    const onDateChange =(date:Date,id_staff:number,key:string)=>{
    
        const fields :{[key:string]:any} ={};
        fields[key]=format(date,"HH:mm");
        workDao.updateDate(project.id,id_staff,fields)
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

                <ModalStaff pages={filtredStaff} visible={modalVisible} onClose={(selectedMembers:Array<StaffMember>)=>{
                    addStaffWork(selectedMembers)
                }}></ModalStaff>

                { 
                    <SectionList sections={pages}
                    renderItem={({item}:{item: Work}) =>{ 
                        
                        return(
                            <View style ={styles.listItem}>
                                <View style={{width:"25%"}}>
                                    <Text style ={styles.listItemTitle}>{(item.staff?.name)}</Text>
                                </View>
                                <View style={{width:"30%"}}>
                                    <SuiviInputDate onChange={(date:Date)=>onDateChange(date,item.id_staff,TABLES.Work.fields.NBR_HOUR.name)} date={getDate(item.nbr_hour)} title="Nbr H.N" mode="time" style={styles.inputDate}></SuiviInputDate>
                                </View>
                                <View style={{width:"30%"}}>
                                    <SuiviInputDate  onChange={(date:Date)=>onDateChange(date,item.id_staff,TABLES.Work.fields.NBR_ADD_HOUR.name)} date={getDate(item.nbr_add_hour)}  title="Nbr H.SUPP"  mode="time"style={styles.inputDate} ></SuiviInputDate>
                                </View>
                                <Text style={{color:"black"}}>5h30</Text>
                            </View>
                        )
                    }}
                    renderSectionHeader={({section}) => {
                                    return(section.title?  (<Text style ={styles.sectionTitle}></Text>) : null)
                                }}
                    keyExtractor={(item, index) => index.toString()}
                
                    ItemSeparatorComponent={renderSeparator}

                    />
                }
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
