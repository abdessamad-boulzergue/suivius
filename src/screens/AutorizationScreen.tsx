import React, {Component, useEffect} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import SuiviInputDate from '../components/InputDate';
import { useDao } from '../stores/context';
import { Autorisation } from '../database/dao/AutorisationDao';
import { runInAction } from 'mobx';
import { TABLES } from '../database/dao/constants';
import { Project } from '../database/dao/ProjectDao';
import { format } from 'date-fns';
import { projectObjectStore } from '../stores/objectsStore';
import { AuthorizationDto } from '../services/types';
import { observer } from 'mobx-react-lite';
import { parse } from "date-fns";
import { SIMPLE_DATE_FORMAT } from '../constants';
import SButton from '../components/common/SButton';

interface AutorizationState {
    dateDemand:Date|undefined,
    dateCommission:Date|undefined,
    dateDecision:Date|undefined,
    datePayment:Date|undefined,
    dateSign:Date|undefined
}

const AutorizationScreen = observer(({route,navigation}:any) => {
    const project:Project = route.params?.project;
    const autoriz = projectObjectStore.getProjectsAuthorization(project); 
    const [authorisationDates,setAuthorisationDates] = useState<AutorizationState>({
           dateCommission : autoriz.dateCommission? parse( autoriz.dateCommission,SIMPLE_DATE_FORMAT,new Date()): undefined,
            dateDecision:  autoriz.dateDecision? parse( autoriz.dateDecision,SIMPLE_DATE_FORMAT,new Date()):undefined,
            datePayment: autoriz.datePayment? parse(  autoriz.datePayment,SIMPLE_DATE_FORMAT,new Date()): undefined,
            dateSign: autoriz.dateSign? parse(  autoriz.dateSign,SIMPLE_DATE_FORMAT,new Date()): undefined,
            dateDemand: autoriz.dateDemand? parse( autoriz.dateDemand,SIMPLE_DATE_FORMAT,new Date()): undefined,
    });
    
    const [dateDemande, setDateDemande] = useState<Date|undefined>(parse(autoriz.dateDemand!,SIMPLE_DATE_FORMAT,new Date()));
    const [dateCommission, setDateCommission] = useState<Date|undefined>(parse(autoriz.dateCommission!,SIMPLE_DATE_FORMAT,new Date()));
    const [dateDecision, setDateDecision] = useState<Date|undefined>(parse(autoriz.dateDecision!,SIMPLE_DATE_FORMAT,new Date()));
    const [datePayement, setDatePayment] = useState<Date|undefined>(parse(autoriz.datePayment!,SIMPLE_DATE_FORMAT,new Date()));
    const [dateSignature, setDateSignature] = useState<Date|undefined>(parse(autoriz.dateSign!,SIMPLE_DATE_FORMAT,new Date()));
    const {autorisationDao, projectDao} = useDao();
  
    const onDateChange =async (update:AutorizationState)=>{
    
        const autoriz = await  autorisationDao.getByIdProject(project.id);
       const updates= { date_commission:update.dateCommission,
                        date_decision:update.dateDecision,
                        date_demande:update.dateDemand,
                        date_paiment:update.datePayment,
                        date_sign:update.dateSign,
                        id_project:project.id.toString()
        }
        if(autoriz){
            autorisationDao.updateDate(project.id,updates)
        }else{
            autorisationDao.addToPoject(updates)
        }
        projectObjectStore.setProjectAuthorization(project.id , {
            dateCommission : update.dateCommission? format(update.dateCommission,SIMPLE_DATE_FORMAT): "",
            dateDecision: update.dateDecision? format(update.dateDecision,SIMPLE_DATE_FORMAT): "",
            datePayment:update.datePayment? format( update.datePayment,SIMPLE_DATE_FORMAT): "",
            dateSign:update.dateSign? format( update.dateSign,SIMPLE_DATE_FORMAT): "",
            dateDemand:update.dateDemand? format(update.dateDemand,SIMPLE_DATE_FORMAT): "",
        })

        setAuthorisationDates(update);
    }
    const updateDateDemande =(date:Date)=>{
        const update :AutorizationState= {...authorisationDates, dateDemand:date}
        onDateChange(update);
    }
    const updateDateCommission=(date:Date)=>{
        const update :AutorizationState = {...authorisationDates, dateCommission:date}
        onDateChange(update);
    }
    const updateDateDecision=(date:Date)=>{
        const update :AutorizationState = {...authorisationDates, dateDecision:date}
        onDateChange(update);
    }
    const updateDatePayment=(date:Date)=>{
        const update  :AutorizationState= {...authorisationDates, datePayment:date}
        onDateChange(update);
    }
    const updateDateSignature=(date:Date)=>{
        const update  :AutorizationState= {...authorisationDates, dateSign:date}
        onDateChange(update);
    }

    const sendAuthorize=()=>{
        const autoriz = projectObjectStore.getProjectsAuthorization(project); 
        console.log("sendAuthorize",autoriz)
        projectDao.sendAuthorize(project.id,autoriz)
    }
    useEffect(()=>{ 
        const autoriz = projectObjectStore.getProjectsAuthorization(project); 
                if(autoriz){
                    runInAction(()=>{
                        setDateCommission(parse(autoriz.dateCommission!,SIMPLE_DATE_FORMAT,new Date()));
                        setDateDemande(parse(autoriz.dateDemand!,SIMPLE_DATE_FORMAT,new Date()));
                        setDateDecision(parse(autoriz.dateDecision!,SIMPLE_DATE_FORMAT,new Date()));
                        setDatePayment(parse(autoriz.datePayment!,SIMPLE_DATE_FORMAT,new Date()));
                        setDateSignature(parse(autoriz.dateSign!,SIMPLE_DATE_FORMAT,new Date()));
                    })
                }
    },[])

        return (
            <View style={{flex: 1,padding:10}}>
               <SuiviInputDate onChange={updateDateDemande} key={"dateDemande"} title="Date dépôt de la demande" date={authorisationDates.dateDemand} />
               <SuiviInputDate onChange={updateDateCommission} key={"dateCommission"}  title="Date de la commission" date={authorisationDates.dateCommission}/>
               <SuiviInputDate onChange={updateDateDecision} key={"dateDecision"} title="Date dépôt de decision de la commission" date={authorisationDates.dateDecision} />
               <SuiviInputDate onChange={updateDatePayment} key={"datePayement"} title="Date de paiment" date={authorisationDates.datePayment}/>
               <SuiviInputDate onChange={updateDateSignature} key={"dateSignature"} title="Date de signature de l'autorisation " date={authorisationDates.dateSign} />
           
               <SButton  style={{ alignSelf:"center", height:50,  width:"60%", margin:30}} title="Envoyer" 
                        onPress={()=>sendAuthorize()}></SButton>
            </View>
        );
    
});

const window = Dimensions.get('window')
const styles = StyleSheet.create({

   });

export default AutorizationScreen;
