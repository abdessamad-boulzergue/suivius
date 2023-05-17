import React, {Component} from 'react';
import {   View, StyleSheet,Dimensions,
         TouchableOpacity,
} from 'react-native';
export default  OverViewItem= ({Left , Center, Right,onView})=>{

        const {style} =  this.state;
        return(
            <TouchableOpacity onPress={()=>onView(item)} >
                <View style ={style.listItem}>
                    <Left></Left>
                    <Center></Center>
                    <Right></Right>
                </View>
            </TouchableOpacity>
        )
}

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    listItem:{
        display:"flex",
        flexDirection: 'row',
        padding:5,
        alignItems: 'center',
        justifyContent:"space-between",
        backgroundColor:'#fafafa'
    }
});
