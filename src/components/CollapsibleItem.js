import React, {useState} from 'react';
import {  Text, View,StyleSheet,Dimensions,
         TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';

export default  CollapsibleItem= ({ title, children }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [iconName, setIconName] = useState("chevron-forward");
    return(
        <View>
        <TouchableOpacity onPress={()=> setIsCollapsed(!isCollapsed) }>
            <View style ={styles.listItem}>
                <Text style ={styles.listItemTitle}>{title}</Text>
                <Icon size={20} color="black" name={isCollapsed?"chevron-forward":"chevron-down"} style={styles.interactInput} />
            </View>
            </TouchableOpacity>
            <View>
            <Collapsible collapsed={isCollapsed}>
                {children}
            </Collapsible>
            </View>
        </View>


    )

   
};

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemHeaders:{
        fontSize:30
    },
    listItemTitle:{
        color:"#4a545a",
        paddingLeft:5,
        width:'20%'
    },
    listItem:{
        display:"flex",
        flexDirection: 'row',
        padding:10,
        alignItems: 'flex-start',
        justifyContent:'space-between',
        backgroundColor:'#fafafa'
    },
    listItemImage:{
        width:30,
        height:30,
    },
    listItemDescription:{
        color:"#4a545a",
        paddingLeft:15,
        width:'90%'
    },
    interactInput:{
        width:35,
        height:35,
        alignSelf:'flex-end'
    }
});
