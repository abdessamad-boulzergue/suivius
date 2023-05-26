import { Text, View } from "native-base"
import { useState ,useEffect} from "react"
import { TouchableOpacity ,StyleSheet} from "react-native"

export default function SButton({onPress,title,style}:any){

    const [compoStyle, setCompoStyle] = useState(styles);

    useEffect(() => {
      setCompoStyle((prevStyle) => ({
        ...prevStyle,
        container: { ...prevStyle.container, ...style },
        label:{ ...prevStyle.label, color:style.color },
      }));
    }, [style]);
    return(
        <View style={compoStyle.container}>
            <TouchableOpacity onPress={onPress}>
                    <Text style={compoStyle.label}>{title}</Text>
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
        borderColor:'#29626B',
        borderWidth:1,
        borderRadius:10,
    },
    label:{
        color:"#fff",
        alignSelf:'center'
    }
})