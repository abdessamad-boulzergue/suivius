
import {useState,useEffect} from 'react'
import { View,Text,TextInput,StyleSheet } from "react-native";
import { user } from '../assets'
import Icon from 'react-native-vector-icons/Ionicons';

const SuiviInputText=({value,placeholder,title,icon,style,editable,keyboardType ,onChangeText}:any)=>{

    onChangeText = onChangeText || (()=>{});
    keyboardType = keyboardType || 'ascii-capable';
    const [containerStyle,setContainerStyle] = useState(styles.container)
    const [inputStyle,setInputStyle] = useState(styles.input);
    const [titleStyle,setTitleStyle] = useState(styles.title);
    const [textValue,setTextValue] = useState("");
    useEffect(()=>{
        if(value){
            setTextValue(value)
        }
        if(style){
            setInputStyle({...inputStyle,
                color:style.color || styles.input.color
            })
            setTitleStyle({...titleStyle,
                color:style.color || styles.title.color
            })
            setContainerStyle({...containerStyle,
                borderWidth:isNaN(style.borderWidth)? styles.container.borderWidth :style.borderWidth,
                borderColor:style.borderColor || styles.container.borderColor,
                borderRadius:style.borderRadius || styles.container.borderRadius,
                backgroundColor:style.backgroundColor || styles.container.backgroundColor,
            });
        }
    },[value]);

    const updateText=(text:string)=>{
        setTextValue(text);
    }

    return(
        <View key={title}>
            {title &&
            <Text style={titleStyle}>{title}</Text>
            }
            <View style={{...containerStyle,flexDirection: 'row',alignItems: 'center',}}>
                <TextInput
                    style={inputStyle}
                    placeholder={placeholder}
                    value = {textValue}
                    keyboardType={keyboardType}
                    onTextInput={event=>onChangeText(textValue)}
                    onChangeText={txt=>updateText(txt)}
                    editable={editable}
                />
                <Icon style={{marginRight:10}} name={icon} color="black" size={15}/>
            </View>
        </View>
    )

}

export default SuiviInputText;


const styles = StyleSheet.create({

    title:{
        color:"black",
        marginLeft:10,
    },
    input: {
        flex: 1,
        color:'#000',
        marginLeft:10,
        height: 40,
        alignSelf:'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#C8CDD0',
        height: 37,
        borderRadius: 3,
        margin:5
    },
});
