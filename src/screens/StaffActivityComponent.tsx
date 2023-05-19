import React, {useEffect, useState} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView
} from 'react-native';


import SuiviInputDate from '../components/InputDate';
import InputSearch from '../components/InputSearch';
import { Project } from '../database/dao/ProjectDao';
import { useDao } from '../stores/daoStores';
import { Work } from '../database/dao/WorkDao';
import { TABLES } from '../database/dao/constants';
import { format } from 'date-fns';

const StaffActivityComponent = ({route,navigation}:any) => {

    const selectedOption="";
    const  project:Project = route.params.project;
    const {workDao} = useDao();
    const [pages, setPages] = useState<Array<{title:string,data:Array<any>}>>([]);

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
    const getDate=(time:string):Date=>{
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date(); // Create a new Date object
        date.setHours(hours||0, minutes||0);
        return date;
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
                        <InputSearch placeholder="recherher un collaborateur"></InputSearch>
                </View>
                <SectionList sections={pages}
                 renderItem={({item}:{item: Work}) =>{ 
                    
                    return(
                        <View style ={styles.listItem}>
                            <View style={{width:"25%"}}>
                                <Text style ={styles.listItemTitle}>{(item.id_staff)}</Text>
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
