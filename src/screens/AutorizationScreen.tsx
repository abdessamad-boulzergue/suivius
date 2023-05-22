import React, {Component, useEffect} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import SuiviInputDate from '../components/InputDate';
import { useDao } from '../stores/daoStores';
import { Autorisation } from '../database/dao/AutorisationDao';
import { runInAction } from 'mobx';
import { TABLES } from '../database/dao/constants';
import { Project } from '../database/dao/ProjectDao';
import { format } from 'date-fns';
interface AutorizationState {

}

const AutorizationScreen = ({route,navigation}:any) => {
    const project:Project = route.params?.project;
    const [dateDemande, setDateDemande] = useState<Date|undefined>(undefined);
    const [dateCommission, setDateCommission] = useState<Date|undefined>(undefined);
    const [dateDecision, setDateDecision] = useState<Date|undefined>(undefined);
    const [datePayement, setDatePayment] = useState<Date|undefined>(undefined);
    const [dateSignature, setDateSignature] = useState<Date|undefined>(undefined);
    const {autorisationDao} = useDao();
    const onDateChange =async (date:Date,key:string)=>{
    
        const fields :{[key:string]:any} ={};
        fields[key]=format(date,"yyyy-MM-dd");
        const autoriz = await  autorisationDao.getByIdProject(project.id);
        if(autoriz){
            autorisationDao.updateDate(project.id,fields)
        }else{
            const autoriz :Autorisation = { date_commission:undefined,date_decision:undefined,date_demande:undefined,date_paiment:undefined,date_sign:undefined,id_project:project.id.toString()}
            autorisationDao.addToPoject(autoriz).then(()=>{
                autorisationDao.updateDate(project.id,fields)
            })
        }
    }
    useEffect(()=>{
        autorisationDao.getByIdProject(project.id).then((autoriz:Autorisation |null)=>{
                if(autoriz){
                runInAction(()=>{
                setDateCommission(autoriz.date_commission);
                setDateDemande(autoriz.date_demande);
                setDateDecision(autoriz.date_decision)
                setDatePayment(autoriz.date_paiment)
                setDateSignature(autoriz.date_sign)
                })
                }
        })
    },[])

        return (
            <View style={{flex: 1,padding:10}}>
               <SuiviInputDate onChange={(date:Date)=>onDateChange(date,TABLES.Autorisation.fields.dateDemande.name) } key={dateDemande} title="Date dépôt de la demande" date={dateDemande} />
               <SuiviInputDate onChange={(date:Date)=>onDateChange(date,TABLES.Autorisation.fields.dateCommission.name) } key={dateCommission}  title="Date de la commission" date={dateCommission}/>
               <SuiviInputDate onChange={(date:Date)=>onDateChange(date,TABLES.Autorisation.fields.dateDecision.name) } key={dateDecision} title="Date dépôt de decision de la commission" date={dateDecision} />
               <SuiviInputDate onChange={(date:Date)=>onDateChange(date,TABLES.Autorisation.fields.datePayment.name) } key={datePayement} title="Date de paiment" date={datePayement}/>
               <SuiviInputDate onChange={(date:Date)=>onDateChange(date,TABLES.Autorisation.fields.dateSignature.name) } key={dateSignature} title="Date de signature de l'autorisation " date={dateSignature} />
            </View>
        );
    
}
const window = Dimensions.get('window')
const styles = StyleSheet.create({

   });

export default AutorizationScreen;
