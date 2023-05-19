import React, {useEffect, useState} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView
} from 'react-native';

import SuiviInputText from '../components/InputText';
import SuiviInputDate from '../components/InputDate';
import { Project } from '../database/dao/ProjectDao';
import { useDao } from '../stores/daoStores';
import { ArticleConsume } from '../database/dao/ArticleConsumeDao';
import InputSearch from '../components/InputSearch';



const ArticleConsumeComponent =({route,navigation}:any) => {

    const  project:Project = route.params.project;
    const {articleConsumeDao} = useDao();
    const [pages, setPages] = useState<Array<{title:string,data:Array<any>}>>([]);

    useEffect(()=>{
        getArticleConsumes();
    },[])
    const  getArticleConsumes= () => {
        articleConsumeDao.getByIdProject(project.id).then(
            (consumes)=>{
                console.log("consumes >+++>>" , consumes)
                setPages([{title:"", data:consumes}]);
            }
        );
    }
    const updateQuantity =(quantity:number,id_article:number)=>{
    
        articleConsumeDao.updateQuantity(project.id,id_article,quantity)
    }
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };


        return (
            <View style={{flex: 1,}}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>rechercher collaborateur :</Text>
                        <InputSearch placeholder="recherher un collaborateur"></InputSearch>
                </View>

                <SectionList sections={pages}
                 renderItem={({item}:{item: ArticleConsume}) =>{ 
                    
                    return(
                        <View style ={styles.listItem}>
                            <View style={{width:"25%"}}>
                                <Text style ={styles.listItemTitle}>{(item.article?.title)}</Text>
                            </View>
                            <View style={{width:"30%"}}>
                                 <SuiviInputText key={item.quantity} onChangeText={(txt:number)=>updateQuantity(txt,item.id_article)} keyboardType='numeric' editable={true} value={item.quantity+""} title="Qte"  style={styles.inputDate}></SuiviInputText>
                             </View>
                        </View>
                    )
                }}
                 renderSectionHeader={({section}) => {
                                return(section.title?  (<Text style ={styles.sectionTitle}></Text>) : null)
                            }}
                keyExtractor={(item, index) => index.toString()}
               
                ItemSeparatorComponent={renderSeparator}

                 />
            </View>
        );
    
}
const window = Dimensions.get('window')
const styles = StyleSheet.create({
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
        borderColor:"#cacaca",
        backgroundColor:"transparent",
        borderWidth:0.3,
        titleColor:"#aeaeca"
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
    listItemTitle:{
        color:"#4a545a",
        fontSize:15,
    },
    listItem:{
    flex:1,
     flexDirection:'row',
     padding:10,
     alignItems: 'center',
     justifyContent:"space-between"
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
