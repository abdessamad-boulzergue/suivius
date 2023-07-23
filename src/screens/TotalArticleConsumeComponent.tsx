import React, {useEffect, useState} from 'react';
import {
    Text,  StyleSheet, TextInput, FlatList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';


import { Project } from '../database/dao/ProjectDao';
import { useDao, useStores } from '../stores/context';
import { ArticleConsume } from '../database/dao/ArticleConsumeDao';
import InputSearch from '../components/InputSearch';
import { observer } from 'mobx-react-lite';
import { projectObjectStore } from '../stores/objectsStore';
import { ArticleConsumesDto, BoqDto, ReportDto } from '../services/types';
import APDEditionValidation from '../components/APDEditionValidation';
import { ModalList, ModalListItem } from '../components/ModalList';
import SButton from '../components/common/SButton';
import { showAlert, showError } from '../components/toast';
import { ROUTES } from '../constants';
import CollapsibleItem from '../components/CollapsibleItem';



const TotalArticleConsumeComponent =observer(({route,navigation}:any) => {

    const reports = projectObjectStore.getValidateReport(route.params.project);
    const  [project,setProject] = useState<Project>(route.params.project);
    const [articles,setArticles] = useState<ModalListItem[]>([]);
   
    const [pages, setPages] = useState<BoqDto[]>([]);

   
    useEffect(()=>{
    
      const data:BoqDto[]  = projectObjectStore.getValidateBOQ(project);
       setPages(data);
       setArticles(projectObjectStore.getArticles().map(art=>{ return {id:art.id,title:art.title}}));
    },[])
  
  

    const getTitle =(id_article:number)=>{
      return articles.filter(art=>art.id == id_article).map(art=>art.title).join("");
    }
    const getUnit =(id_article:number)=>{
      return projectObjectStore.getArticles().filter(art=>art.id == id_article).map(art=>art.unit).join("");
    }
   
      const renderSeparator = () => {
        return <View style={styles.separator} />;
      };
    
        return (
            <View style={{flex: 1,paddingTop:15}}>

        <CollapsibleItem title="TSS" >
                <View style={styles.header}>
                          <Text  style={styles.hTitle} >Article </Text>
                          <Text  style={styles.hUnite}>Unite</Text>
                          <Text  style={styles.hQte}>Quantité</Text>
                </View>
                <FlatList data={pages} 
                
                 renderItem={({item}) =>{ 
                    return(
                        <View style={styles.listItem}>
                          <Text  style={styles.itemTitle} >{getTitle(item.articleId)}</Text>
                          <Text  style={styles.itemUnite}>{getUnit(item.articleId)}</Text>
                          <Text  style={styles.itemQuantity}>{item.quantity}</Text>
                      </View>
                    )
                }}
                
                keyExtractor={(item, index) => index.toString()}
               
                ItemSeparatorComponent={renderSeparator}

                 />
                 </CollapsibleItem>
                 <Text></Text>
                 <CollapsibleItem title="rapports">
                 <FlatList data={reports}
                    renderItem={({item}:{item: ReportDto}) =>{ 
                        
                        return(
                          <TouchableOpacity onPress={ ()=>{
                            if(item.uid)
                              navigation.navigate(ROUTES.WORK_EDIT,{project:project,report:item})}
                            }>
                          <View style ={styles.listItem}> 
                             
                                  <Text style={styles.listItemTitle}>{("rapport du  : " + item.date)}</Text>
                            
                          </View>
                      </TouchableOpacity>
                        )
                    }} 
                    keyExtractor={(item, index) => index.toString()} 
                    ItemSeparatorComponent={renderSeparator}

                 /> 
                 </CollapsibleItem>
            </View>
        );
    
})
const window = Dimensions.get('window')
const styles = StyleSheet.create({
  hTitle:{
    alignSelf:'center',
    marginLeft:20,
    width:'30%',
    color:'#FFFFFF'
  },
  hUnite:{
    alignSelf:'center',
    width:'40%',
    color:'#FFFFFF'
  },
  hQte:{
    alignSelf:'center',
    width:'25%',
    color:'#FFFFFF'
  },
  header:{ 
    backgroundColor: '#326972',
     height: 35,
     flexDirection:'row'
    },
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
        flex:1,
        alignSelf:'center',
        color:'#000000',
        width:'20%',
        height:35,
        borderColor:"#cacaca",
        borderWidth:0.3,
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
    itemTitle:{
        color:"#4a545a",
        fontSize:15,
        alignSelf:'center',
        marginLeft:20,
        width:'35%'
    },
    itemUnite:{
      color:"#4a545a",
      fontSize:15,
      alignSelf:'center',
       width:'40%'
  },
  itemQuantity:{
    color:"#4a545a",
    fontSize:15,
    alignSelf:'center',
     width:'20%'
},
    listItem:{
      backgroundColor: '#FFFFFF',
      height: 49,
      flexDirection:'row'
    },
    listItemImage:{
        width:'98%',
        alignSelf: 'center',
        height:window.height/2,
        resizeMode: 'stretch',
    },
    listItemTitle:{
      fontFamily:'Gothic A1',
      fontWeight:"bold",
      color:"#4a545a",
      paddingLeft:10,
     
  },
    listItemDescription:{
        marginLeft:5,
        marginBottom:5,
        fontSize:15,
        width:'85%'
    }
});

export default TotalArticleConsumeComponent;
