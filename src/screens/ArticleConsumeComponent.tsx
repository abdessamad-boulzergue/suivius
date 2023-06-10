import React, {useEffect, useState} from 'react';
import {
    Text,  StyleSheet, TextInput, FlatList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView
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



const ArticleConsumeComponent =observer(({route,navigation}:any) => {

    const  [project,setProject] = useState<Project>(route.params.project);
    const [articles,setArticles] = useState<ModalListItem[]>([]);
    const [modalVisible,setModalVisible] = useState<boolean>(false);
    const {rightsStore} =useStores();
    const {articleConsumeDao,projectDao} = useDao();
    const [pages, setPages] = useState<ArticleConsume[]>([]);

   
    useEffect(()=>{
       
      const data:BoqDto[]  = projectObjectStore.getProjectsBOQ(project);
      console.log("data BoqDto -------------------- ",data)
       setPages(data.map(boq=>{
        return {id_article:boq.articleId,quantity:boq.quantity,id_project:project.id}
       }));
       setArticles(projectObjectStore.articles.map(art=>{ return {id:art.id,title:art.title}}));
      // getArticleConsumes();
    },[])
    const  getArticleConsumes= () => {
        articleConsumeDao.getByIdProject(project.id).then(
            (consumes)=>{
                let data = [...pages];
                consumes.forEach(cons=>{
                  const idx = data.findIndex(ac=>ac.id_article==cons.id_article);
                  if(idx!=null){
                    data[idx].quantity = cons.quantity
                  }else{
                    data.push(cons);
                  }
                })
                setPages(data);
            }
        );
    }
    const searchArticles=(text:string)=>{
      setModalVisible(true);
    }
   const  onCloseArticleModal = (items:ModalListItem[])=>{
    items.filter(item=> pages&& pages.findIndex(ac=>ac.id_article===item.id)==-1)
    .forEach(item=>{
      setPages([  ...pages,  {id_article:item.id,id_project:project.id, quantity:0}  ]);
    })
    setModalVisible(false)
    }
    const getTitle =(item:ArticleConsume)=>{
      return articles.filter(art=>art.id == item.id_article).map(art=>art.title).join("");
    }
    const updateQuantity =(item:ArticleConsume,quantity:number)=>{
       
       const index = pages.findIndex(ac=>ac.id_article===item.id_article)
        setPages([...pages.slice(0, index),
          {id_article:item.id_article,id_project:project.id, quantity:quantity} ,
          ...pages.slice(index + 1),
      ]);
        articleConsumeDao.updateQuantity(project.id,item.id_article,quantity)
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

                <View style={styles.dropdownContainer}>
                        <InputSearch onSearch={searchArticles} 
                            value="" placeholder="recherher un collaborateur"></InputSearch>
                </View>
                <FlatList data={pages} 
                 renderItem={({item}) =>{ 
                    
                    return(
                        <View style={styles.listItem}>
                          <Text  style={styles.itemTitle} >{getTitle(item)}</Text>
                          <Text  style={styles.itemUnite}>Unité</Text>
                          <TextInput
                            style={styles.inputDate}
                              value = {item.quantity.toString()}
                              keyboardType='numeric'
                              onChangeText={txt=>updateQuantity(item,parseFloat(txt))}
                              editable={true}
                          />
                      </View>
                    )
                }}
                
                keyExtractor={(item, index) => index.toString()}
               
                ItemSeparatorComponent={renderSeparator}

                 />
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
    width:'50%'
  },
  hUnite:{
    alignSelf:'center',
    width:'30%'
  },
  hQte:{
    alignSelf:'center',
    width:'20%'
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
        width: 30,
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
        width:'50%'
    },
    itemUnite:{
      color:"#4a545a",
      fontSize:15,
      alignSelf:'center',
       width:'30%'
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

export default ArticleConsumeComponent;
