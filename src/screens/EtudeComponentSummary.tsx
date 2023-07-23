import React, { useState,useEffect } from 'react';
import { Text, FlatList, View ,StyleSheet, ScrollView} from 'react-native';

import CollapsibleItem from '../components/CollapsibleItem';
import { useDao, useStores } from '../stores/context';
import { Localisation } from '../database/dao/LocalisationDao';
import { Project } from '../database/dao/ProjectDao';
import { Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { projectObjectStore } from '../stores/objectsStore';
import { DOC_TYPES } from '../constants';

const EtudeComponentSummary = observer(({route}:any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const project:Project = route.params?.project;
  const [imageCroquis, setImageCroquis] = useState<string|null>(null);
  const [photoTss,setPhotoTss] = useState<string[]>([]);
   const  getDocument= async () => {
    
      const imagesCroquis = projectObjectStore.getProjectsDocument(project.id,DOC_TYPES.CROQUIS)
      if(imagesCroquis && imagesCroquis.length>0){
        setImageCroquis(imagesCroquis[0].content)
      }
        const tssImages =   projectObjectStore.getProjectsDocument(project.id,DOC_TYPES.TSS_IMAGE)
        console.log('###########\n tssImages \n ########### \n',tssImages.length)
      if(tssImages && tssImages.length>0){
       setPhotoTss(tssImages.map(img=>{
        console.log('###########\n tssImages \n ########### \n',img.content.substring(0,20))
        return img.content;
       }))
      }
    
}
   const tss = projectObjectStore.getProjectTss(project);
  const{daoStores} = useStores();
  const{localisationDao,projectDao} = daoStores;
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);
   useEffect(()=>{
        getDocument();
         localisationDao.getByIdProject(project.id).then(localiz=>{
        setLocalisation(localiz);
    })
   },[])
   const getValue=(type:string, id:number)=>{
     if(type=="cableTypeId") return projectObjectStore.cableTypes.filter(type=>type.id===id)[0].title
     if(type=="connectionTypeId") return projectObjectStore.connectionTypes.filter(type=>type.id===id)[0].title
     if(type=="siteTypeId") return projectObjectStore.siteTypes.filter(type=>type.id===id)[0].title
     if(type=="equipmentTypeId") return projectObjectStore.equipementTypes.filter(type=>type.id===id)[0].title

     else return  ""
   }
  return (
    <ScrollView>

     <CollapsibleItem title="TSS" >
        <View style={{padding:10}}>
      
         <View style={styles.info}>
                                <Text style={styles.text}>Type de cable </Text>
                                <Text style={styles.text}>{getValue("cableTypeId",tss.cableTypeId)}</Text>
              </View>
           
         <View style={styles.info}>
                                <Text style={styles.text}>Type de raccordement </Text>
                                <Text style={styles.text}>{getValue("connectionTypeId",tss.connectionTypeId)}</Text>
              </View>
              
         <View style={styles.info}>
                                <Text style={styles.text}>Type d'equipement </Text>
                                <Text style={styles.text}>{getValue("equipmentTypeId",tss.equipmentTypeId)}</Text>
              </View>
              
         <View style={styles.info}>
                                <Text style={styles.text}>Type de site </Text>
                                <Text style={styles.text}>{getValue("siteTypeId",tss.siteTypeId)}</Text>
              </View>
        </View>
      </CollapsibleItem>
      
      <View style={{minHeight:10}}></View>
      
      <CollapsibleItem title="Details Traveaux">
        <View>
          {
            projectObjectStore.getProjectsWorkDetails(project).map(dt=>{
            return <View style={styles.info}>
                                <Text style={styles.text}>{dt.title}</Text>
                                <Text style={styles.text}>{dt.value}</Text>
                    </View>
            })
          }
        </View>
      </CollapsibleItem>
      
      <View style={{minHeight:10}}></View>


      <CollapsibleItem title="Croquis">
      <View >
        <View  style={{alignItems:"center", width: 100, height: 100 ,padding:10}}>
        {imageCroquis && <Image source={{ uri: imageCroquis }} style={{ width: "100%", height: "100%" }} />}
        {!imageCroquis && <Text style={{color:'#000'}}> Croquis introuvable</Text>}
      </View>
      </View>
      </CollapsibleItem>
      <View style={{minHeight:10}}></View>
      
      <CollapsibleItem title="Photos">
      <View >
      <FlatList
        data={photoTss}
        numColumns={4} // Change this value to change the number of images per row
        renderItem={({item}) => {
          return (
            <View  style={{alignItems:"center", width: "25%", height: 100 ,padding:10}}>
              {item && <Image source={{ uri:  item }} style={{ width: "100%", height: "100%" }} />}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      </CollapsibleItem>

      
    </ScrollView>
  );
});

const styles = StyleSheet.create({
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
})

export default EtudeComponentSummary;
