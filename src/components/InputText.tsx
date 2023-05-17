
import {useState} from 'react'
import { View,Image,TextInput,StyleSheet } from "react-native";
import { user } from '../assets'

const SuiviInputText=({value,placeholder,righImage,style}:any)=>{
    const [innerStyle,setInnerStyle] = useState(style || styles)
    return(
        <View style={innerStyle?.SectionStyle}>
            <TextInput
                style={innerStyle?.input}
                placeholder={placeholder}
                value = {value}
                editable={false}
            />
            { righImage &&
            <Image
                source={righImage} //Change your icon image here
                style={innerStyle.ImageStyle}
            />
}
        </View>
    )

}

export default SuiviInputText;


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
    shadow: {
        flex: 1,
        width: undefined,
        height: undefined,
    },

    input: {
        flex: 1,
        color:'black'
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
        height: 40,
        borderRadius: 15,
        margin: 15,
    },
});
