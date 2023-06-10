
import {useState} from 'react'
import { View,TextInput,StyleSheet } from "react-native";
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
const InputSearch=({value,placeholder,onSearch}:any)=>{
    
    onSearch = onSearch || (()=>{});
    const [innerStyle,setInnerStyle] = useState(styles)
    const [textValue,setTextValue] = useState(value || "");

    return(
        <View style={innerStyle?.container}>
            <TextInput
                style={innerStyle?.input}
                onChangeText={(text:string)=>setTextValue(text)}
                placeholder={placeholder}
                value = {textValue}
            />
          <Button style={styles.searchBtn} onPress={()=>onSearch(textValue)}> <Icon size={20} name="search"/> </Button>
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
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        height: 45,
        borderRadius: 15,
        margin: 10,
    },
});
