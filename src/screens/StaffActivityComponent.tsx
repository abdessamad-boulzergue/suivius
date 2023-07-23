import React, {useEffect, useState} from 'react';
import {
    Text,StyleSheet, SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView, Modal, FlatList, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';
import { plus_circle_outlined } from '../assets';
import SuiviInputDate from '../components/InputDate';
import InputSearch from '../components/InputSearch';
import { Project } from '../database/dao/ProjectDao';
import { useDao } from '../stores/context';
import { format } from 'date-fns';
import SButton from '../components/common/SButton';
import { ReportDto, SquadDto } from '../services/types';
import { projectObjectStore } from '../stores/objectsStore';
import {ROUTES, SIMPLE_DATE_FORMAT, SIMPLE_TIME_FORMAT } from '../constants';
import { ModalList, ModalListItem } from '../components/ModalList';
import { showAlert } from '../components/toast';
import ReportEditionValidation from '../components/ReportEditionValidation';
import { observer } from 'mobx-react-lite';
interface ListItem{
    
}

const StaffActivityComponent = observer(({route,navigation}:any) => {

    const  report:ReportDto = route.params.report;
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
     const squadData =  projectObjectStore.getProjectsSquad(project,report.uid)
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
        const squadData =  projectObjectStore.getProjectsSquad(project,report.uid)
        if(name)
           setSquad(squadData.filter(squad=>squad.name.indexOf(name)!=-1));
        else 
            setSquad(squadData);
    }
    const getDate=(time:string):Date|undefined=>{
        if(time==null)  time="00:00";
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date(); // Create a new Date object
        date.setHours(hours||0, minutes||0);
        return date;
    }
    const sendSquadWork =()=>{
        projectDao.sendReport(project.id,report).then(reportUpdate=>{
            if(reportUpdate ){
              projectObjectStore.updateReport(project,{...report})
              showAlert("Rapport d'activité","est envoyé",()=>{
                navigation.navigate(ROUTES.WORK_REPPORTS)
            })
            }
          });
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
                date: report.date
            }
        })
        setSquad([...squad, ...squadWork])    
        projectObjectStore.setProjectsSquad(project,report.uid,[...squad,...squadWork])       
    }

        const setNormalHours = (date:Date,id_staff:number)=>{
            const index = squad.findIndex(it=>it.memberId===id_staff) 
            const update :SquadDto = {
                ...squad[index], 
                normalHours:format(date,SIMPLE_TIME_FORMAT)
            }

            const squadUpdate = [ ...squad.slice(0,index),update, ...squad.slice(index+1)]
            setSquad(squadUpdate);
            projectObjectStore.setProjectsSquad(project ,report.uid,squadUpdate)
        }
    const setAditionalHours =(date:Date,id_staff:number)=>{
        const index = squad.findIndex(it=>it.memberId===id_staff) 
            const update :SquadDto = {
                ...squad[index], 
                additionalHours:format(date,SIMPLE_TIME_FORMAT)
            }

            const squadUpdate = [ ...squad.slice(0,index),update, ...squad.slice(index+1)]
            setSquad(squadUpdate);
            projectObjectStore.setProjectsSquad(project ,report.uid,squadUpdate)
    }
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };


        return (
            <View style={{flex: 1}}>
                <View style={styles.dropdownContainer}>
                        <InputSearch onSearch={(text:string)=> {
                            filterStaff(text)
                        }} 
                            value="" placeholder="recherher un collaborateur"></InputSearch>
                    <Button onPress={()=>setModalVisible(true)}  style={{alignSelf:'flex-end', backgroundColor:"transparent",
                    borderWidth:0.5, borderRadius:6, height:25}} >
                        <View style={{ flexDirection:'row',width:75, alignItems:'center' ,justifyContent:'space-between' }}>
                    <Image source={plus_circle_outlined.imageSource} style={{width:15,height:15}} />
                    <Text style={{color:"#326972", height:20 }}>Ajouter</Text>
                    </View>
                    </Button>
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
                    
          <ReportEditionValidation report={report} project={project} navigation={navigation}/>
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
        marginBottom:10
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
     backgroundColor: '#FFFFFF',
     height: 65, 
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
