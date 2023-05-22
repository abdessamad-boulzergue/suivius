import React, { Component, useState } from 'react';
import {
    Image,
    StyleSheet,
    Button,
    TextInput,
    View,
    ActivityIndicator,
    ScrollView,
    Text,Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { inwi,liked,loved} from '../assets'

export default ()=> {
     
        const [articles,setArticles] = useState([
            {id:-1, title:'Select Article',value:-1},
            {id:1, title:'Salon',value:"Salon"},
            {id:2, title:'Canape',value:"Canape"},
            {id:3, title:'Bed',value:"Bed"},
            {id:5, title:'Mkhada',value:"Mkhada"},
        ])
        const [command,setCommad] = useState({description:"",title:"",details:[]})
   
    
    const isValide=(command:any)=>{
        var error =null;
        if(command.details == undefined || command.details.length<=0)
            error = ("ARTICLE_NOT_SELECTED");
        if(command.title == undefined || command.title.length<=0)
            error = ("TITLE_IS_EMPTY");

        return (error == null);
    }
    const onPressLogin=()=>{
       
    }

        return (
            <View>
                <ScrollView >
                    <View style = {styles.container}>
                        {
                           
                            <View style={{width:"90%",borderRadius:5,height:30,backgroundColor:'#30daba',alignItems:'center'}}>
                                <Text style={{ marginTop:5}}>{("COMMAND_SAVED")}</Text>
                            </View>
                        }
                        <View style={styles.SectionStyle}>
                        <Picker
                            style={{width: "100%"}}
                            onValueChange={(itemValue, itemIndex) =>{
                           }
                          }>
                            {
                               articles.map((article)=>{return (
                                    <Picker.Item label={article.title} value={article.value}  />
                                )})
                            }
                        </Picker>
                        </View>
                        {
                            articles.length>0  &&
                                <View style ={{ flex:1,overflow:'scroll', flexDirection:'row',marginLeft:10}}>
                                    {command.details.map((art)=>{
                                    return (
                                        <View style ={{ alignItems:'center', margin:10}} >
                                        <Text > "art.title"</Text>
                                        <TouchableOpacity onPress={()=>{
                                            const i = command.details.indexOf(art)
                                           if(i!=-1){
                                            delete command.details[i];
                                             setCommad(command);
                                            }
                                        }}>
                                            <Image source={liked.imageSource} style={{width:15,height:15,}} />
                                        </TouchableOpacity>
                                            </View>
                                    );
                                })}
                                </View>
                        }
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value = { command.title}
                            onChangeText={(value)=>{
                            command.title = value;
                            setCommad(command);
                            }}
                        />
                            <TextInput
                                style={styles.textArea}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Description"
                                onChangeText={(value)=>{
                                    command.description = value;
                                    setCommad(command)
                             }}
                            />
                    
                       
                    </View>
                </ScrollView>
            </View>

        );
    
}

const actions = [
    {
        text: "Accessibility",
        icon: loved.imageSource,
        name: "bt_accessibility",
        position: 2
    },
    {
        text: "Language",
        icon: liked.imageSource,
        name: "bt_language",
        position: 1
    }
];

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        alignItems:'center'
    },
    loginBtn:{
        width:200,
        margin:30,
    },
    textArea: {
        justifyContent: "flex-start",
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 120,
        borderRadius: 5,
        margin: 15,
        width:'90%'
    },
    content: {
        flex: 1,
        resizeMode:'cover',
        height:window.height
    },
    shadow: {
        flex: 1,
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 5,
        margin: 15,
        width:'90%'
    },
    button: {
        width: 180
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 15,
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    sideMenuProfileIcon: {
        resizeMode: 'stretch',
        width: 150,
        height: 80,
        marginBottom:30
    },
    backgroundImage:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: 'cover'
    }
});
