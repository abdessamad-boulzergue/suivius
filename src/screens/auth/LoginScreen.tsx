import React from 'react';
import {
    Image,
    StyleSheet,
    Button,
    TextInput,Text,
    View,
    ActivityIndicator,
    ScrollView,
    ImageBackground,Dimensions,TouchableOpacity
} from 'react-native';
import type {PropsWithChildren} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {imgLogo, eye,question_mark_circle} from '../../assets'
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../../constants';
import { useStores } from '../../stores/context';
import {useEffect, useState} from 'react';
import LoginButton from '../../components/common/LoginButton';
import { projectObjectStore } from '../../stores/objectsStore';
const window = Dimensions.get('window')

interface LoginState {
    username: string;
    password: string;
    liked: boolean;
    error: string;
    isLoading: boolean;
  }


  const LoginScreen  = () => {

    const {loginStore} = useStores();
    const [ip, setIp] = useState("");
    const [state, setState] = useState<LoginState>({
        error:'',
        isLoading:false,
        liked:false,
        username:'test',
        password:'pass',
        
    });

    const validate = ({username,password}:any)=>{
        if(username == undefined || username.length==0) {
            setState({...state,error:"USER_NAME_EMPTY"});
            return false
        }
        if(password == undefined || password.length==0) {
            setState({...state,error:"PASSWORD_EMPTY"});
            return false
        }
        return true;
    }

    const onPressLogin= async () => {
        
        const user = {
            username: state.username,
            password: state.password
        };

        if(state.liked)
            AsyncStorage.setItem('userName',state.username)
        else
            AsyncStorage.setItem('userName',"")

        if (validate(user)){
            setState({...state,isLoading: true});
            //this.props.navigation.navigate(ROUTES.HOMESTACK);
           // await loginStore.regularLogin({username: userName, password});
            await loginStore.regularLogin(user)
            setState({...state,isLoading: false});

        }else{
            console.log("user not valide : "+JSON.stringify(user));

        }
    };
    const saveIp =(text:string)=>{
        setIp(text);
        projectObjectStore.API_URL=text; 
        AsyncStorage.setItem('SERVER_IP',text)
    }
    useEffect(() => {
        AsyncStorage.getItem('userName')
        .then((username)=>{
           setState({ ...state,username: username || "" });
        })
        AsyncStorage.getItem('SERVER_IP').then(ip=>{
            if(ip) {
                setIp(ip)
                projectObjectStore.API_URL=ip;
            }
        });
        AsyncStorage.getItem('REMEMBER')
            .then((liked)=>{
                setState({ ...state,liked:(liked=="true")});
            })
      }, []);  // Empty array means this effect will only run once
    

    
    return (
            <LinearGradient 
            end={{x: 1.0, y: 0.5}}
            locations={[0, 0.2, 10.0]} // Spread the colors along the gradient
            colors={['#5C969F','#5C969F', '#29626B']}
             style={styles.content}>
               <View >
                   <View style = {styles.container}>
                       <Image style = {{marginTop:'25%'}}
                           source={imgLogo.imageSource}
                       />

                       <View style={{width:'80%',marginBottom:25,marginTop:65}}>
                            <Text style={{fontFamily:'Inter',fontWeight:'400',fontSize:15,lineHeight:19}}>Entrez vos coordonnées pour vous connecter à votre compte</Text>
                       </View>
                       <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.input}
                            placeholder="server"
                            value = {ip}
                            onChangeText={(value)=>saveIp(value)}
                        />
                        </View>
                <View style={styles.SectionStyle}>
                
                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        value = {state.username}
                        onChangeText={(value)=>{  setState({ ...state,username : value}); }}
                    />
                    <Image
                        source={question_mark_circle.imageSource} //Change your icon image here
                        style={styles.ImageStyle}
                    />
                 </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                        style={styles.input}
                        textContentType="password"
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(value)=>{  setState({ ...state,password : value}); }}
                    />
                    <Image
                        source={eye.imageSource} //Change your icon image here
                        style={styles.ImageStyle}
                    />
                </View>
                     
                {state.error && (
                    <TextInput style={{color:'red'}}> {state.error }</TextInput>
                )}
                {state.isLoading ? (
                    <ActivityIndicator size="small" color="#000000"/>
                ):
                 <LoginButton style={{margin:15}} onPress={ ()=>onPressLogin() } title='Connexion'>
                 </LoginButton>
                }
            </View>
               </View>
               </LinearGradient>

        );
    
} 

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:'35%',
        alignItems:'center'
    },
    loginBtn:{
        width:200,
        margin:30,
        backgroundColor:"#29626B"
    },
    content: {
        flex: 1,
        resizeMode:'cover',
        height:window.height,
        alignItems:'center',
        justifyContent:'center'

    },
    shadow: {
        flex: 1,
        width: undefined,
        height: undefined,
    },

    input: {
        flex: 1,
        color:'black',
        marginLeft:10
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
        height: 45,
        width:'85%',
        borderRadius: 20,
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
    backgroundImage:{ justifyContent: 'center', alignItems: 'center', flex: 1, resizeMode: 'cover' }
});

export default LoginScreen
