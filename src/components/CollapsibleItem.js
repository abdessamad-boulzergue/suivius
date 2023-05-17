import React, {useState} from 'react';
import {  Text, View, Image,StyleSheet,Dimensions,
         TouchableOpacity,
} from 'react-native';
import {recommended ,liked,loved,heart} from  '../assets';
import Collapsible from 'react-native-collapsible';

export default  CollapsibleItem= ({ title, children }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    return(
        <View>
        <TouchableOpacity onPress={()=> setIsCollapsed(!isCollapsed) }>
            <View style ={styles.listItem}>
                <Text style ={styles.listItemTitle}>{title}</Text>
                <Image source={isCollapsed? liked.imageSource:recommended.imageSource} style={styles.interactInput}/>
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
        padding:5,
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
