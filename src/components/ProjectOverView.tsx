import React, {Component, useEffect, useState} from 'react';
import {  Text, View, Image,StyleSheet,Dimensions,
         TouchableOpacity,
} from 'react-native';
import {repeat ,inwi, warning} from  '../assets';
import { Project } from '../database/dao/ProjectDao';
import { projectObjectStore } from '../stores/objectsStore';
import { IssueDto } from '../services/types';
import { ROUTES } from '../constants';
export default function ProjectOverView ({item,onView,navigation}:{navigation:any,item:Project,onView:(item:Project)=>void}){

      const [style,setStyle] = useState(styles)
      const [issue,setIssue] = useState<IssueDto|undefined>(undefined)
      useEffect(()=>{
        const issues = projectObjectStore.getProjectIssues(item.id,item.id_step_status);
        if(issues){
            setIssue(issues[0]);
        }
      },[]);

      const showIssue  =()=>{
        navigation.navigate(ROUTES.BLOCAGE,{project:item});
      }

        return(
            <TouchableOpacity onPress={()=>onView(item)}>
            <View style ={style.listItem}>
    
            <Image source={inwi.imageSource }  style={style.listItemImage} />
            <View  style ={style.titleGroup}>
                 <Text style ={style.listItemTitle}>{(item.title)}</Text>
                <Text style ={style.step}>Etape : {(item.step?.title)}</Text>
            </View>
             <View style={{flex: 1, flexDirection: 'row',alignItems:'center'}}>
                    <Text style ={style.listItemDescription}>{(item.description)}</Text>
             </View>
             <TouchableOpacity>
                            <Image source={repeat.imageSource} style={styles.interactInput}/>
              </TouchableOpacity>
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
      width:'40%'
    },
    step:{
        fontFamily:'Inter',
        fontSize:11,
        lineHeight:10,
        color:"#707070",
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
        color:"#707070",
        paddingLeft:15,
        width:'60%',
        fontFamily: 'Inter',
        fontWeight: '400',
    },
    interactInput:{
        width:25,
        height:25,
        marginRight:10
    }
});
