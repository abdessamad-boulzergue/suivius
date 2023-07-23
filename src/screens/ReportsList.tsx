import React, {useEffect, useState} from 'react';
import {
    Text,  StyleSheet,  TouchableOpacity,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView, FlatList
} from 'react-native';
 
import { projectObjectStore } from '../stores/objectsStore';
import { observer } from 'mobx-react-lite';
import { ReportDto} from '../services/types'; 
import { Button, Image } from 'native-base';
import { non_demarre, plus_circle_outlined ,circle_valid_ok, valid} from '../assets';
import { ROUTES, SIMPLE_DATE_FORMAT } from '../constants';
import { format } from 'date-fns';
import { dateToString, stringToDate, uid } from '../utils';
import { showAlert, showError, showToast } from '../components/toast';
 

import DateTimePicker from '@react-native-community/datetimepicker';
import SuiviInputDate from '../components/InputDate';
import SButton from '../components/common/SButton';
import { useDao } from '../stores/context';

const ReportsList = observer(({route,navigation}:any) => {

    const currentProject  = projectObjectStore.getProject(route.params.project.id);
    
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [filterDate, setFilterDate] = useState<Date|undefined>(new Date());
    let reports  = projectObjectStore.getProjectReports(currentProject);
    const canEndActivity= true;
    const{projectDao} = useDao();
    const [filtredReport, setFiltredReport] = useState<ReportDto[]>([]);
    const addReport=()=>{
      setShowPicker(true);
    }

    useEffect(()=>{
     
      let sorted = reports.slice().sort((r1,r2)=> stringToDate(r2.date).getTime() -stringToDate(r1.date).getTime())
      setFiltredReport(sorted);


    },[reports])

    const endActivity = ()=>{
      projectDao.validateTss(currentProject).then((response)=>{
          projectObjectStore.updateProject(projectObjectStore.getProjectUpdate(currentProject,response));
          showAlert("Activité"," est terminer. le projet est en attent de reception",()=>{
              navigation.navigate(ROUTES.PROJECTS)
          })
    })
     }

    const createReport=(date:Date)=>{
      const existReport=  projectObjectStore.getProjectReports(currentProject);
      const report:ReportDto = {
        uid:uid(),
        date : dateToString(date),
        squads:[],
        usages:[],
        userId:0,
        status:"",
        consumes:[]
      }
 
     if(existReport.find(r=>r.date===report.date) === undefined){
         projectObjectStore.addProjectReport(currentProject,report);
         return report;
     }else{
        showError("date du rapport invalid : ","un rapport du "+ report.date+" exist")
     }
     return null;
    }
    const handleReportDateSelected = (event:any, newDate:any) => {
      setShowPicker(false);
      if( event.type==="set"){
          setSelectedDate(newDate)
         const report =  createReport(newDate)
         if(report){
          let reports  = projectObjectStore.getProjectReports(currentProject);
          reports = reports.slice().sort((r1,r2)=> stringToDate(r2.date).getTime() -stringToDate(r1.date).getTime())
          setFiltredReport(reports);
            navigation.navigate(ROUTES.WORK_EDIT,{project:currentProject,report:report})
         }
      }
  };
  const filtreReportByDate=(date:Date)=>{
    let reports  = projectObjectStore.getProjectReports(currentProject);
    let sorted = reports.slice().sort((r1,r2)=> stringToDate(r2.date).getTime() -stringToDate(r1.date).getTime())
    
    if(date){
      sorted = sorted.slice().filter(r=>r.date===format(date,SIMPLE_DATE_FORMAT));
    }
    setFiltredReport(sorted);
  }
  const isValid=(item:ReportDto)=>{
    return  item && item.status==="VALID";
  }
    const renderSeparator = () => {
      return <View style={styles.separator} />;
    };

    
        return (
            <View style={{flex: 1,padding:15}}>  

                <Button onPress={addReport}  style={{alignSelf:'flex-end', backgroundColor:"transparent",
                    borderWidth:0.5, borderRadius:6, height:25, margin:10}} >
                     <View style={{ flexDirection:'row',width:75, alignItems:'center' ,justifyContent:'space-between' }}>
                        <Image alt='plus image' source={plus_circle_outlined.imageSource} style={{width:15,height:15}} />
                        <Text style={{color:"#326972", height:20 }}>Ajouter</Text>
                    </View>
                </Button>
                {showPicker && (
                    <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    onChange={handleReportDateSelected}
                    />
                )}
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <View style={{width:'100%'}}>
                     <SuiviInputDate  onChange={filtreReportByDate} key={"dateDemande"} title="afficher par date : " date={filterDate} />
                  </View>
                  <View style={{marginTop:17, marginLeft:-60}}>
                  <TouchableOpacity onPress={ ()=>{setFilterDate(undefined)}}>
                            <Image alt='non valid report' source={non_demarre.imageSource} style={{width:20,height:20}}/>
                  </TouchableOpacity>
                  </View>
                  </View>
                  <Text></Text>
                 <FlatList data={filtredReport}
                    renderItem={({item}:{item: ReportDto}) =>{ 
                        
                        return(
                          <TouchableOpacity onPress={ ()=>{
                            if(item.uid)
                              navigation.navigate(ROUTES.WORK_EDIT,{project:currentProject,report:item})}
                            }>
                          <View style ={styles.listItem}> 
                             
                                  <Text style ={styles.listItemTitle}>{("rapport du  : " + item.date)}</Text>
                                  {isValid(item) &&
                                     <Image alt='valid report' source={valid.imageSource} style={styles.interactInput}/>
                                  }
                                  {!isValid(item) &&
                                    <Image alt='non valid report' source={non_demarre.imageSource} style={styles.interactInput}/>
                                  }
                            
                          </View>
                      </TouchableOpacity>
                        )
                    }} 
                    keyExtractor={(item, index) => index.toString()} 
                    ItemSeparatorComponent={renderSeparator}

                 /> 
                 <SButton disabled={canEndActivity} style={{ alignSelf:"center", height:50,  width:"50%", }} title="Valider" 
                       onPress={()=>endActivity()}></SButton>
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
        height: 10,
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
      fontFamily:'Gothic A1',
      fontWeight:"bold",
      color:"#4a545a",
      paddingLeft:10,
     
  },
  interactInput:{
    width:25,
    height:25,
    marginRight:10
},
    titleGroup:{
      flexDirection:'column' , 
    },
    listItem:{
      height: 60,
      display:"flex",
      flexDirection: 'row',
      padding:10,
      alignItems: 'center',
      justifyContent:'space-between',
      backgroundColor:'#FFFFFF'
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

export default ReportsList;
