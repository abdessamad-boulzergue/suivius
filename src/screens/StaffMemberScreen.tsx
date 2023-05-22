import React, { Component, useState,useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Button,
    TextInput,
    View,
    ActivityIndicator,
    FlatList,
    Text,Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { inwi,liked,loved} from '../assets'
import { StaffMember } from '../database/dao/StaffDao';
import { useDao } from '../stores/daoStores';
import EmployeeForm from '../components/staffForm';

export default function StaffMemberScreen() {
     
        const [roles,setRoles] = useState([
            {id:-1, title:'Selectionner un role',value:"-1"},
            {id:1, title:'Chef de proje',value:"Chef de projet"},
            {id:2, title:'chef de chantier',value:"chef de chantier"},
            {id:3, title:'autres',value:"autres"},
        ])
        const [staffMember,setStaffMember] = useState<StaffMember>({id:-1,name:""});
        const [isLoading,setIsLoading] = useState(false);
        const [saved,setSaved] = useState(false);
        const [error,setError] = useState(""); 
        const [staffRole,setStaffRole] = useState("-1");
        const [staff,setStaff] = useState<Array<StaffMember>>([]);
        const [saveClick,setSaveClick] = useState<number>(0);
        const {staffDao} = useDao();
        const onSavedOK =()=>{
            setIsLoading(false);
            setSaved(true)
            setError("");
            setStaffMember({id:-1,name:""});
        }
        useEffect(()=>{
            staffDao.getAll().then((allStaff=>{
                setStaff(allStaff);
            }))
        },[saveClick])
        const saveStaff=()=>{
            if(staffMember)
                Alert.alert(
                    ("NEW_COMMAND"),
                    staffMember.name,
                    [
                        {
                            text: ("CANCEL"),
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: ("CONFIRM"), 
                            onPress: () => {
                                setIsLoading(true);
                                staffDao.add(staffMember).then((len:number)=>{
                                    setSaveClick(saveClick+1);
                                    onSavedOK();
                                })
                                .catch(()=>setIsLoading(false))
                        }
                        },
                    ],
                    {cancelable: false},
                );
        }

        return (
            <View>
                   {/* <View style = {styles.container}>
                        {
                            saved &&
                            <View style={{width:"90%",borderRadius:5,height:30,backgroundColor:'#30daba',alignItems:'center'}}>
                                <Text style={{ marginTop:5}}>{("Staff_SAVED")}</Text>
                            </View>
                        }
                        <View style={styles.SectionStyle}>
                        <Picker
                            selectedValue={staffRole}
                            style={{width: "100%", color:"#000"}}
                            onValueChange={(itemValue) =>{
                                setStaffRole(itemValue)
                           }
                          }>
                            {
                               roles.map((role)=>{return (
                                    <Picker.Item label={role.title} value={role.value}  />
                                )})
                            }
                        </Picker>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="name"
                            value = { staffMember.name}
                            onChangeText={(value)=>{
                            setStaffMember({...staffMember!, name:value});
                            }}
                        />

                        {error && (
                            <TextInput style={{color:'red'}}> {error }</TextInput>
                        )}
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#000000"/>
                        ):
                            <View style={styles.loginBtn}>
                                < Button
                                    onPress={() => saveStaff()}
                                    title={('SAVE_STAFF')}
                                />
                            </View>
                        }
                    </View>

                    <FlatList
                        data={staff}
                        numColumns={3} // Change this value to change the number of images per row
                        renderItem={({ item }) => {
                        return (
                            <View style={{padding:15,width:"100%"}}>
                                <Text style={{color:"#000"}}>{item.name}</Text>
                            </View>
                        );
                        }}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                    */}
                    <EmployeeForm>
                        
                    </EmployeeForm>
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
        color:"#000",
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
