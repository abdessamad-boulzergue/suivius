
import {useState} from 'react'
import { View,Image,TextInput,StyleSheet } from "react-native";
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
const InputSearch=({value,placeholder,style}:any)=>{
    
    const [innerStyle,setInnerStyle] = useState(style || styles)
    return(
        <View style={innerStyle?.SectionStyle}>
            <TextInput
                style={innerStyle?.input}
                placeholder={placeholder}
                value = {value}
            />
            <Button style={innerStyle.searchBtn} leftIcon={ <Icon size={20} name="search"/> }> </Button>
        </View>
    )

}

export default InputSearch;


const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:'40%',
        alignItems:'center',
        height:45
    },
    searchBtn:{
        borderRadius:10,
        width:55,
        height:45
    },
    shadow: {
        flex: 1,
        width: undefined,
        height: undefined,
    },

    input: {
        flex: 1,
        color:'black',
        height:45
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
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
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 45,
        borderRadius: 15,
        margin: 15,
    },
});
