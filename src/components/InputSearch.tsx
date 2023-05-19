
import {useState} from 'react'
import { View,TextInput,StyleSheet } from "react-native";
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
const InputSearch=({value,placeholder}:any)=>{
    
    const [innerStyle,setInnerStyle] = useState(styles)
    return(
        <View style={innerStyle?.container}>
            <TextInput
                style={innerStyle?.input}
                placeholder={placeholder}
                value = {value}
            />
           <Icon size={20} name="search"/> 
        </View>
    )

}

export default InputSearch;


const styles = StyleSheet.create({
    searchBtn:{
        borderRadius:10,
        color:"#fff",
        width:55,
        height:45
    },

    input: {
        flex: 1,
        height:45,
        color:"#000"

    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        height: 45,
        borderRadius: 15,
        margin: 15,
    },
});
