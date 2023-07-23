import React, {Component, useEffect, useState} from 'react';
import {  Text, View, Image,StyleSheet,Dimensions,
         TouchableOpacity,
} from 'react-native';
import {repeat ,non_demarre, warning} from  '../assets';
import { Project } from '../database/dao/ProjectDao';
import { projectObjectStore } from '../stores/objectsStore';
import { IssueDto } from '../services/types';
import { ROUTES, SIMPLE_DATE_FORMAT } from '../constants';
import { format } from 'date-fns';
export default function ProjectSuivieFinancierOverView ({item,onView,navigation}:{navigation:any,item:Project,onView:(item:Project)=>void}){
    
    const issues = projectObjectStore.getProjectIssues(item.id,item.id_step_status);
    const client = projectObjectStore.getClient(item.id)
    const vpg = projectObjectStore.getProjectsBOQ(item).reduce((sum, obj) => {
          return sum + obj.quantity;
      }, 0);

    const vag = projectObjectStore.getValidateReport(item)
    .flatMap(report=>report.consumes)
    .reduce((sum, obj) => {
        return sum + obj.quantity;
    }, 0);


    const rate =  (vag/vpg)*100 | 0;

      const [style,setStyle] = useState(styles)
      const [issue,setIssue] = useState<IssueDto|undefined>(issues[0] || undefined )
      useEffect(()=>{
      },[]);

      const showIssue  =()=>{
        navigation.navigate(ROUTES.BLOCAGE,{project:item});
      }

        return(
            <TouchableOpacity onPress={()=>onView(item)}>
            <View style ={style.listItem}>
    
            <Image source={{uri:client?.iconContent}}  style={style.listItemImage} />
            <View  style ={style.titleGroup}>
                 <Text style ={style.listItemTitle}>{(item.title)}</Text>
                 <Text style ={style.step}>Etape : {(item.step?.title)}</Text>
                 <Text style ={style.status}> {(item.stepStatus?.title)}</Text>
            </View>
             <View style={{flex: 1, flexDirection: 'column',alignItems:'center'}}>
                    <Text style={style.date_description} >
                        {format(item.debut_reel || item.debut_estime ,SIMPLE_DATE_FORMAT)}
                    </Text>
                    <Text style={style.date_description} >
                         {format(item.fin_reel|| item.fin_estime,SIMPLE_DATE_FORMAT)}
                    </Text>
             </View>
             <View style={{flex: 1, flexDirection: 'column',alignItems:'center'}}>
                    <Text style={style.date_description} >
                        {vpg}
                    </Text>
             </View>
             <View style={{flex: 1, flexDirection: 'column',alignItems:'center'}}>
                    <Text style={style.date_description} >
                        {vag}
                    </Text>
             </View>
             <View style={{flex: 1, flexDirection: 'column',alignItems:'center'}}>
                    <Text style={style.date_description} >
                        {rate} %
                    </Text>
             </View>
              {issue &&

                <TouchableOpacity onPress={showIssue}>
                <Image source={warning.imageSource}   style={styles.interactInput}/>
                </TouchableOpacity>

             }
            </View>
        </TouchableOpacity>
        )
    
}

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemHeaders:{
        fontSize:30
    },
    titleGroup:{
      flexDirection:'column' ,
      width:'30%'
    },
    step:{
        fontFamily:'Inter',
        fontSize:11,
        lineHeight:10,
        color:"#707070",
        paddingTop:5,
        paddingLeft:10
    },
    date_description:{
        fontFamily:'Inter',
        fontSize:10,
        lineHeight:10,
        color:"#707070",
    },
    status:{
        fontFamily:'Inter',
        fontSize:11,
        lineHeight:10,
        color:"#caca08",
        paddingTop:5,
        paddingLeft:10
    },
    listItemTitle:{
        fontFamily:'Gothic A1',
        fontWeight:"bold",
        color:"#4a545a",
        paddingLeft:10,
       
    },
    listItem:{
        height: 60,
        display:"flex",
        flexDirection: 'row',
        padding:10,
        alignItems: 'center',
        backgroundColor:'#FFFFFF'
    },
    listItemImage:{
        width:30,
        height:30,
    },
    listItemDescription:{
        fontFamily:'Inter',
        fontSize:11,
        lineHeight:11,
        color:"#707070",
        padding:8
    },
    interactInput:{
        width:25,
        height:25,
        marginRight:10
    }
});
