import React, {Component, useEffect} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import SuiviInputDate from '../components/InputDate';
import { useDao, useStores } from '../stores/context';
import { Autorisation } from '../database/dao/AutorisationDao';
import { runInAction } from 'mobx';
import { TABLES } from '../database/dao/constants';
import { Project } from '../database/dao/ProjectDao';
import { format } from 'date-fns';
import { projectObjectStore } from '../stores/objectsStore';
import { AuthorizationDto } from '../services/types';
import { observer } from 'mobx-react-lite';
import { parse } from "date-fns";
import { ROUTES, SIMPLE_DATE_FORMAT } from '../constants';
import SButton from '../components/common/SButton';
import Timeline from 'react-native-timeline-flatlist'
import { circle_valid_ok ,circle_green,circle_gris } from '../assets';
import { showAlert, showError, showToast } from '../components/toast';
import { Picker } from '@react-native-picker/picker';



interface AutorizationState {
    dateDemand:Date|undefined,
    dateCommission:Date|undefined,
    decision:string|undefined,
    datePayment:Date|undefined,
    dateSign:Date|undefined
}

const AutorizationScreen = observer(({route,navigation}:any) => { 
    const {rightsStore} = useStores();
    
    const currentProject = projectObjectStore.getProject(route.params.project.id)
    const canedit        = rightsStore.hasPermission(currentProject.id_step,currentProject.id,"EDIT_AUTHORIZATION");
        
    const autoriz = projectObjectStore.getProjectsAuthorization(currentProject); 
    const [authorisationDates,setAuthorisationDates] = useState<AutorizationState>({
           dateCommission : autoriz.dateCommission? parse( autoriz.dateCommission,SIMPLE_DATE_FORMAT,new Date()): undefined,
           decision:  autoriz.decision || "",
            datePayment: autoriz.datePayment? parse(  autoriz.datePayment,SIMPLE_DATE_FORMAT,new Date()): undefined,
            dateSign: autoriz.dateSign? parse(  autoriz.dateSign,SIMPLE_DATE_FORMAT,new Date()): undefined,
            dateDemand: autoriz.dateDemand? parse( autoriz.dateDemand,SIMPLE_DATE_FORMAT,new Date()): undefined,
    });

    const [timeLinedata,setTimeLinedata] = useState([
            { icon:circle_gris.imageSource},  { icon:circle_gris.imageSource}, { icon:""},
            { icon:circle_gris.imageSource},   { icon:circle_gris.imageSource}
        ]);

     const {autorisationDao, projectDao} = useDao();

     useEffect(()=>{
        updateTimeLinedata(authorisationDates);
     },[])
  
    const onDateChange =async (update:AutorizationState)=>{
    
        const autoriz = await  autorisationDao.getByIdProject(currentProject.id);
       const updates= { date_commission:update.dateCommission,
                        decision:update.decision,
                        date_demande:update.dateDemand,
                        date_paiment:update.datePayment,
                        date_sign:update.dateSign,
                        id_project:currentProject.id.toString()
        }
        if(autoriz){
            autorisationDao.updateDate(currentProject.id,updates)
        }else{
            autorisationDao.addToPoject(updates)
        }
        projectObjectStore.setProjectAuthorization(currentProject.id , {
            dateCommission : update.dateCommission? format(update.dateCommission,SIMPLE_DATE_FORMAT): "",
            decision: update.decision || "",
            datePayment:update.datePayment? format( update.datePayment,SIMPLE_DATE_FORMAT): "",
            dateSign:update.dateSign? format( update.dateSign,SIMPLE_DATE_FORMAT): "",
            dateDemand:update.dateDemand? format(update.dateDemand,SIMPLE_DATE_FORMAT): "",
        })

        updateTimeLinedata(update)
        setAuthorisationDates(update);
    }
    const updateTimeLinedata=(update:AutorizationState)=>{
        setTimeLinedata([
            { icon: isNotDate(update.dateDemand)?circle_gris.imageSource:circle_valid_ok.imageSource },
            { icon:isNotDate(update.dateDemand)?circle_gris.imageSource: isNotDate(update.dateCommission)?circle_green.imageSource:circle_valid_ok.imageSource},
            { icon:""},
            { icon:!update.decision?circle_gris.imageSource: isNotDate(update.datePayment)?circle_green.imageSource:circle_valid_ok.imageSource},
            { icon:isNotDate(update.datePayment)?circle_gris.imageSource: isNotDate(update.dateSign)?circle_green.imageSource:circle_valid_ok.imageSource},
        ])
    }
    const validateDate = (dateBefore:Date, dateAfter:Date):boolean =>{
        const valide =  dateBefore<=dateAfter;
        if(!valide)   showError("date selectionée doit etre apres " + format(dateAfter,SIMPLE_DATE_FORMAT),"");
        return valide;
    }
    const updateDateDemande =(date:Date)=>{
        const update :AutorizationState= {...authorisationDates, dateDemand:date}
        onDateChange(update);
    }
    const updateDateCommission=(date:Date)=>{
        if(validateDate(authorisationDates.dateDemand!, date)){
            const update :AutorizationState = {...authorisationDates, dateCommission:date}
            onDateChange(update);
        }
    }
    const updateDateDecision=(decision:string)=>{
            const update :AutorizationState = {...authorisationDates, decision:decision}
            onDateChange(update);
    }
    const updateDatePayment=(date:Date)=>{
            const update  :AutorizationState= {...authorisationDates, datePayment:date}
            onDateChange(update);
        
    }
    const updateDateSignature=(date:Date)=>{
        if(authorisationDates.datePayment && validateDate(authorisationDates.datePayment, date)){
            const update  :AutorizationState= {...authorisationDates, dateSign:date}
            onDateChange(update);
        }
    }

    const sendAuthorize=()=>{
        const autoriz = projectObjectStore.getProjectsAuthorization(currentProject); 
       
        projectDao.sendAuthorize(currentProject.id,autoriz).then((response)=>{           
            projectObjectStore.updateProject(projectObjectStore.getProjectUpdate(currentProject,response));
            showAlert(" Autorisation","est envoyé",()=>{
                navigation.navigate(ROUTES.PROJECTS)
            })
         });
    }
    const isNotDate=(date:Date|undefined):boolean=>{
        console.log("isNotDate :  ",date)
        if(date){
            console.log("valide date :   ",date)
         return  isNaN(date!.getDate())
        }
        else
         return true;
    }
    const renderTimeLineDetails = (rowData:any, sectionID:number, rowID:number)=>{
        return (
            <View style={{flex:1,height:45}}>
           {/* { sectionID ==0 &&
               <SuiviInputDate onChange={updateDateDemande} key={"dateDemande"} title="Date dépôt de la demande" date={authorisationDates.dateDemand} />
            }
             { sectionID ===1 &&
               <SuiviInputDate disabled={isNotDate(authorisationDates.dateDemand)} validate={(date:Date)=>validateDate(authorisationDates.dateDemand!,date)}  onChange={updateDateCommission} key={"dateCommission"}  title="Date de la commission" date={authorisationDates.dateCommission}/>
            }
             { sectionID ===2 &&
                <SuiviInputDate disabled={isNotDate(authorisationDates.dateDemand)}  validate={(date:Date)=>validateDate(authorisationDates.dateDemand!,date)}  onChange={updateDateDecision} key={"dateDecision"} title="Date dépôt de decision de la commission" date={authorisationDates.dateDecision} />
             }
            { sectionID ===3 && 
             <SuiviInputDate validate={(date:Date)=>validateDate(authorisationDates.dateDecision!,date)}  onChange={updateDatePayment} key={"datePayement"} title="Date de paiment" date={authorisationDates.datePayment}/>
            }
            { sectionID ===4 &&
              <SuiviInputDate validate={(date:Date)=>validateDate(authorisationDates.datePayment!,date)} onChange={updateDateSignature} key={"dateSignature"} title="Date de signature de l'autorisation " date={authorisationDates.dateSign} />
            }*/}
          </View>
        )
    }


        return (
            <View style={{flex:1}} pointerEvents={canedit? 'auto':'none'} >
                <View style={{flex: 1,padding:10, flexDirection:'row'}}>
                <View style={{alignSelf:'flex-start', width:'15%',top:45,height:'100%'}}>
                    <Timeline data={timeLinedata}
                    showTime={false}
                    circleSize={25}
                    circleColor='transparent'
                    lineColor='#4a545a'
                    innerCircle={'icon'}
                    renderFullLine={false}  
                    renderDetail={renderTimeLineDetails.bind(this)}
                    />
                </View>
                <View style={{alignSelf:'flex-end',  width:'80%',height:'100%',top:10}}>
                <SuiviInputDate onChange={updateDateDemande} key={"dateDemande"} title="Date dépôt de la demande" date={authorisationDates.dateDemand} />
                <SuiviInputDate disabled={isNotDate(authorisationDates.dateDemand)} validate={(date:Date)=>validateDate(authorisationDates.dateDemand!,date)}  onChange={updateDateCommission} key={"dateCommission"}  title="Date de la commission" date={authorisationDates.dateCommission}/>
                
                <Picker
                            selectedValue={authorisationDates.decision}
                            onValueChange={(itemValue) => updateDateDecision(itemValue)}
                            dropdownIconColor= 'black'
                        >
                             <Picker.Item label="selectionnez la decision de la commission" value="" key="-1" />
                             <Picker.Item label="Favorable" value="FAVORABLE" key="1" />
                             <Picker.Item label="Défavorable" value="DEFAVORABLE" key="2" />
                 </Picker>

                 <SuiviInputDate disabled={isNotDate(authorisationDates.dateCommission)}   onChange={updateDatePayment} key={"datePayement"} title="Date de paiment" date={authorisationDates.datePayment}/>
                <SuiviInputDate disabled={isNotDate(authorisationDates.datePayment)}  validate={(date:Date)=>validateDate(authorisationDates.datePayment!,date)} onChange={updateDateSignature} key={"dateSignature"} title="Date de signature de l'autorisation " date={authorisationDates.dateSign} />
                </View>
                </View>
                {canedit &&
                    <SButton  style={{ alignSelf:"center", height:50,  width:"60%", margin:5}} title="Envoyer" 
                            onPress={()=>sendAuthorize()}>
                    </SButton>
                }
                </View>
        );
    
});

const window = Dimensions.get('window')
const styles = StyleSheet.create({

   });

export default AutorizationScreen;
