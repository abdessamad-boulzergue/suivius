import React, {useEffect, useState} from 'react';
import {
    Text,  StyleSheet, TextInput, FlatList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView, KeyboardAvoidingView
} from 'react-native';


import { Project } from '../database/dao/ProjectDao';
import { useDao, useStores } from '../stores/context';
import { ArticleConsume } from '../database/dao/ArticleConsumeDao';
import InputSearch from '../components/InputSearch';
import { observer } from 'mobx-react-lite';
import { projectObjectStore } from '../stores/objectsStore';
import { BoqDto } from '../services/types';
import APDEditionValidation from '../components/APDEditionValidation';
import { ModalList, ModalListItem } from '../components/ModalList';



const BOQComponent =observer(({route,navigation}:any) => {

    const  [project,setProject] = useState<Project>(route.params.project);
    const [articles,setArticles] = useState<ModalListItem[]>([]);
    const [modalVisible,setModalVisible] = useState<boolean>(false);
    const {articleConsumeDao} = useDao();
    const [pages, setPages] = useState<BoqDto[]>([]);

   
    useEffect(()=>{
       
      const data:BoqDto[]  = projectObjectStore.getProjectsBOQ(project);
       setPages(data);
       setArticles(projectObjectStore.getArticles().map(art=>{ return {id:art.id,title:art.title}}));
    },[])
  
    const searchArticles=(text:string)=>{
      setModalVisible(true);
    }
   const  onCloseArticleModal = (items:ModalListItem[])=>{
   const updates =  items.filter(item=> pages&& pages.findIndex(ac=>ac.articleId===item.id)==-1)
          .map(item=>{
            return {articleId:item.id, quantity:0,title:item.title,unite:getUnit(item.id)};
          })
     
     setPages([  ...pages, ...updates ]);

    setModalVisible(false)
    }
    const getTitle =(id_article:number)=>{
      return articles.filter(art=>art.id == id_article).map(art=>art.title).join("");
    }
    const getUnit =(id_article:number)=>{
      return projectObjectStore.getArticles().filter(art=>art.id == id_article).map(art=>art.unit).join("");
    }
    const updateQuantity =(item:BoqDto,quantity:number)=>{
       
       const index = pages.findIndex(ac=>ac.articleId===item.articleId)
        setPages([...pages.slice(0, index),
          {...item, quantity:quantity} ,
          ...pages.slice(index + 1),
      ]);
        articleConsumeDao.updateQuantity(project.id,item.articleId,quantity)
        projectObjectStore.addProjectsBOQ(project ,  {...item, quantity:quantity})
    }
      const renderSeparator = () => {
        return <View style={styles.separator} />;
      };
      const renderSectionHeader = ({ section }:any) => (
        <View style={styles.header}>
          <Text  style={styles.hTitle} >Article</Text>
          <Text  style={styles.hUnite}>Unité</Text>
          <Text  style={styles.hQte}>Q.R</Text>
        </View>
      );
        return (
            <View style={{flex: 1,paddingTop:5}}>
                <ModalList data={articles} visible={modalVisible} onClose={onCloseArticleModal} ></ModalList>
                <ScrollView >
                <View style={styles.dropdownContainer}>
                        <InputSearch onSearch={searchArticles} 
                            value="" placeholder="recherher une article"></InputSearch>
                </View>
                <View style={styles.header}>
                          <Text  style={styles.hTitle} >Article </Text>
                          <Text  style={styles.hUnite}>Unite</Text>
                          <Text  style={styles.hQte}>Q.P</Text> 
                </View>
                <FlatList data={pages} 
                
                 renderItem={({item}) =>{ 
                    
                    return(
                        <View style={styles.listItem}>
                          <Text  style={styles.itemTitle} >{getTitle(item.articleId)}</Text>
                          <Text  style={styles.itemUnite}>{getUnit(item.articleId)}</Text>
                          <TextInput
                            style={styles.inputDate}
                              value = {item.quantity.toString()}
                              keyboardType='numeric'
                              textAlign='center'
                              onChangeText={txt=>updateQuantity(item,parseFloat(txt))}
                              editable={true}
                          /> 
                      </View>
                    )
                }}
                
                keyExtractor={(item, index) => index.toString()}
               
                ItemSeparatorComponent={renderSeparator}

                 />
</ScrollView>
                  <APDEditionValidation
                  navigation={navigation}
                  project={project}
                />
            </View>
        );
    
})
const window = Dimensions.get('window')
const styles = StyleSheet.create({
  hTitle:{
    alignSelf:'center',
    marginLeft:20,
    width:'50%',
    color:'#FFFFFF'
  },
  hUnite:{
    alignSelf:'center',
    width:'20%',
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
        maxWidth:"20%",
        height:35,
        justifyContent:'center',
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
        width:'50%'
    },
    itemUnite:{
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
    listItemDescription:{
        marginLeft:5,
        marginBottom:5,
        fontSize:15,
        width:'85%'
    }
});

export default BOQComponent;
