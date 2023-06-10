import { Button, TextArea } from 'native-base';
import React, { useState,useEffect } from 'react';
import { FlatList, TouchableOpacity, Text,Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import { useDao } from '../stores/context';
import { Project } from '../database/dao/ProjectDao';
import DeviceInfo from 'react-native-device-info';
import { DOC_TYPES, ETUDE_STATUS, ROUTES } from '../constants';
import SButton from './common/SButton';
import { projectObjectStore } from '../stores/objectsStore';
import { Localisation } from '../database/dao/LocalisationDao';
import { IssueDto } from '../services/types';

 interface RNImage{
    isNew:boolean,
    uri:string
 }
 const uniqueId = DeviceInfo.getUniqueId();
 

const RejectModal = ({route,navigation}:any) => {
  
    const project =  projectObjectStore.getProject(route.params.project.id) ;
    const [issue, setIssue] = useState<IssueDto|undefined>(undefined);
    const [description, setDescription] = useState<string>("");
    const [canReject, setCanReject] = useState<boolean>(false);
    const {documentDao,projectDao} = useDao();
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);

useEffect(()=>{
  const localisation =projectObjectStore.getProjectLocalisation(project)
  if(localisation)
      setLocalisation({
        addresse:localisation.address,
        province:localisation.province,
        region:localisation.region,
        lat:localisation.lat,
        lng:localisation.lng,
        id:0,
        site:localisation?.site
      });
      setCanReject(project.id_step_status==ETUDE_STATUS.VALIDATION_APD || project.id_step_status==ETUDE_STATUS.VALIDATION_TSS)
    let issues = projectObjectStore.getProjectIssues(project.id , project.id_step_status);
    if(issues.length>0){
      setIssue(issues[0]);
      setDescription(issues[0].description);
    }
},[])

  const rejectWithIssue =()=>{
    if(project.id_step_status === ETUDE_STATUS.VALIDATION_TSS)
        rejectTSS();
    else if(project.id_step_status === ETUDE_STATUS.VALIDATION_APD)
        rejectAPD();
  }
  const rejectTSS = ()=>{
    projectDao.rejectTSS(project,description).then((response)=>{
            projectObjectStore.updateProject({...project,id_step_status:response.stepStatusId});
            navigation.navigate(ROUTES.PROJECTS)
        
  })
   }
   const rejectAPD = ()=>{
    projectDao.rejectAPD(project,description).then((response)=>{    
      setCanReject(false);       
        projectObjectStore.updateProject({...project , id_step_status:response.stepStatusId});
     });
    }

  const endIssue =()=>{
    projectDao.endIssue(project.id);
    setIssue(undefined);
  }
  return (
    <View style={styles.container}>
       

                <View style={styles.info}>
                    <Text style={styles.text}>client/site</Text>
                    <Text style={styles.text}>{localisation?.site}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>region</Text>
                    <Text style={styles.text}>{localisation?.region}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>province</Text>
                    <Text style={styles.text}>{localisation?.province}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>address</Text>
                    <Text style={styles.text}>{localisation?.addresse}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
                </View>
          <Text style={{color:'#000', margin:15}}> motif de blocage: </Text>
          <TextArea style={{color:'#000', margin:15}} value={description} onChangeText={setDescription} numberOfLines={5} autoCompleteType ></TextArea>

      
      <View style={{margin:20, justifyContent:'center'}}>
         {canReject &&
            <SButton style={{ alignSelf:"center", height:50,  width:"50%", }} title="Envoyer" 
                            onPress={rejectWithIssue}>
                        </SButton>
            
          }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  preview: {
    margin:50
  },
  captureContainer: {
  },
  capture: {
    width:"100%",
    height:"100%",
    alignSelf: 'center',
    borderColor:"#000",
    borderWidth:1
  },
  info:{ 
    padding:10,
    flex:1, 
    flexDirection: 'row',
    justifyContent:'space-between',
    maxHeight:50,
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
  text:{
      color:"black"
  }
});

export default RejectModal;
