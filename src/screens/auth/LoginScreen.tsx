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

import {imgLogo, shield,user,toggle_off,toggle_on} from '../../assets'
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../../constants/routes';
import { useStores } from '../../stores/context';
import {useEffect, useState} from 'react';
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

    const [state, setState] = useState<LoginState>({
        error:'',
        isLoading:false,
        liked:false,
        username:'test',
        password:'text'
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
            await loginStore.loginHandler({data:{token:"text"}})
            setState({...state,isLoading: false});

        }else{
            console.log("user not valide : "+JSON.stringify(user));

        }
    };

    useEffect(() => {

        AsyncStorage.getItem('userName')
        .then((username)=>{
           setState({ ...state,username: username || "" });
        })
   AsyncStorage.getItem('REMEMBER')
       .then((liked)=>{
        setState({ ...state,liked:(liked=="true")});
       })

      }, []);  // Empty array means this effect will only run once
    

    
    return (
            <LinearGradient colors={['#9cb8b3', '#8c9494']} style={styles.content}>
               <ScrollView >
                   <View style = {styles.container}>
                       <Image style = {{margin:15}}
                           source={imgLogo.imageSource}
                       />
                <View style={styles.SectionStyle}>
                    <Image
                        source={user.imageSource} //Change your icon image here
                        style={styles.ImageStyle}
                    />
                    <Image style={styles.ImageStyle} source={imgLogo.imageSource} />

                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        value = {state.username}
                        onChangeText={(value)=>{  setState({ ...state,username : value}); }}
                    />
                 </View>
                <View style={styles.SectionStyle}>
                    <Image
                        source={shield.imageSource} //Change your icon image here
                        style={styles.ImageStyle}
                    />
                    <TextInput
                        style={styles.input}
                        textContentType="password"
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(value)=>{  setState({ ...state,password : value}); }}
                    />
                </View>
                       <View style={{ marginTop:5,marginRight:15, flexDirection: 'row',alignSelf:'flex-end'}}>
                           <Text style={{ marginRight:15,}}> {("REMEMBER_USER_NAME")} </Text>
                           <TouchableOpacity onPress={()=> {
                           AsyncStorage.setItem('REMEMBER',(!state.liked).toString())
                            setState({ ...state,liked:!state.liked})
                           }}>
                               <Image source={state.liked? toggle_on.imageSource:toggle_off.imageSource} />
                           </TouchableOpacity>
                       </View>
                {state.error && (
                    <TextInput style={{color:'red'}}> {state.error }</TextInput>
                )}
                {state.isLoading ? (
                    <ActivityIndicator size="small" color="#000000"/>
                ):
                    <View style={styles.loginBtn}>
                < Button
                    onPress={() => onPressLogin()}
                    title="Login"
                    />
                        </View>
                }
            </View>
               </ScrollView>
               </LinearGradient>

        );
    
} 

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:'40%',
        alignItems:'center'
    },
    loginBtn:{
        width:200,
        margin:30
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
        color:'black'
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
        width:'100%',
        borderRadius: 15,
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
