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
import { ArticleConsumesDto, BoqDto, ReportDto } from '../services/types';
import APDEditionValidation from '../components/APDEditionValidation';
import { ModalList, ModalListItem } from '../components/ModalList';
import SButton from '../components/common/SButton';
import { showAlert, showError } from '../components/toast';
import { ROUTES } from '../constants';
import ReportEditionValidation from '../components/ReportEditionValidation';



const ArticleConsumeComponent =observer(({route,navigation}:any) => {

    const  [report,setReport] = useState<ReportDto>(route.params.report);
    const  [consumesData,setConsumesData] = useState<ArticleConsumesDto[]>([]);
    const  [project,setProject] = useState<Project>(route.params.project);
    const [articles,setArticles] = useState<ModalListItem[]>([]);
    const [modalVisible,setModalVisible] = useState<boolean>(false);
    const {projectDao} = useDao();
    const [pages, setPages] = useState<BoqDto[]>([]);

   
    useEffect(()=>{
      const consumes:ArticleConsumesDto[]  = projectObjectStore.getProjectsArticleConsumes(project,report.uid);
      setConsumesData(consumes);
      const data:BoqDto[]  = projectObjectStore.getLeftBOQ(project);
       setPages(data);
       setArticles(projectObjectStore.getArticles().map(art=>{ return {id:art.id,title:art.title}}));
    },[])
  
    const searchArticles=(text:string)=>{
      setModalVisible(true);
    }
    const sendArticleConsume=()=>{
      const consumes:ArticleConsumesDto[]  = projectObjectStore.getProjectsArticleConsumes(project,report.uid);
      projectDao.sendArticleConsume(project.id,report,consumes)
      showAlert("Rapport d'activité","est envoyé",()=>{
        navigation.navigate(ROUTES.WORK_REPPORTS)
    })
    }
   const  onCloseArticleModal = (items:ModalListItem[])=>{
   const updates =  items.filter(item=> pages&& pages.findIndex(ac=>ac.articleId===item.id)==-1)
          .map(item=>{
            return {articleId:item.id, quantity:0,title:item.title,unite:getUnit(item.id)};
          })
     
     setPages([  ...pages, ...updates ]);

    setModalVisible(false)
    }
    const getConsumeQte=(articleId:number)=>{
      console.log(consumesData ,  articleId)
      return consumesData.filter(cons=>cons.articleId===articleId)[0]?.quantity || 0;
    }
    const getTitle =(id_article:number)=>{
      return articles.filter(art=>art.id == id_article).map(art=>art.title).join("");
    }
    const getUnit =(id_article:number)=>{
      return projectObjectStore.getArticles().filter(art=>art.id == id_article).map(art=>art.unit).join("");
    }
    const updateQuantity =(item:BoqDto,quantity:number)=>{
      if(quantity>item.quantity){
        showError("quantité BOQ dépassé ",' quantité maximale autorisé est ' + item.quantity)
      }else{
        
        const index = consumesData.findIndex(ac=>ac.articleId===item.articleId)
          let update  :ArticleConsumesDto= {
            date:report.date,
            articleId:item.articleId,
            quantity:quantity,
            title:item.title,
            unite:item.unite,
            quantityReal:quantity,
          }
          const consumes:ArticleConsumesDto[]  = projectObjectStore.getProjectsArticleConsumes(project,report.uid);

          let consumesUpdate = []
          if(index!=-1)
            consumesUpdate = [ ...consumes.slice(0,index),update, ...consumes.slice(index+1)]
          else
          consumesUpdate = [ ...consumes.slice(),update]
          
          setConsumesData(consumesUpdate)
          projectObjectStore.setProjectsArticleConsumes(project ,report.uid,consumesUpdate)
        
      }
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
                          <Text  style={styles.hQte}>Quantité</Text>
                          <Text  style={styles.hQte}>Q.R</Text>
                </View>
                <FlatList data={pages} 
                
                 renderItem={({item}) =>{ 
                    
                    return(
                        <View style={styles.listItem}>
                          <Text  style={styles.itemTitle} >{getTitle(item.articleId)}</Text>
                          <Text  style={styles.itemUnite}>{getUnit(item.articleId)}</Text>
                          <Text  style={styles.itemUnite}>{item.quantity}</Text>
                           <TextInput
                            style={styles.inputDate}
                              value = {getConsumeQte(item.articleId).toString()}
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
          </ScrollView>

          <ReportEditionValidation report={report} project={project} navigation={navigation}/>
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
        width:'30%'
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

export default ArticleConsumeComponent;
