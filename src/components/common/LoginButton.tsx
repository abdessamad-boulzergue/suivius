import { Text, View } from "native-base"
import { useState } from "react"
import { TouchableOpacity ,StyleSheet} from "react-native"

export default function LoginButton({onPress,title,style}:any){

    styles.container = {...styles.container, ...style};

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                    <Text style={styles.label}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles =StyleSheet.create({
    container:{
        backgroundColor:"#29626B",
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:20,
        width:150
    },
    label:{
        color:"#fff",
        alignSelf:'center'
    }
})