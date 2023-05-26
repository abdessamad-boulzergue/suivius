import React, {Component} from 'react';
import {  Text, View, Image,StyleSheet,Dimensions,
         TouchableOpacity,
} from 'react-native';
import {repeat ,inwi} from  '../assets';;
export default class OverViewItem extends Component{

    constructor(props){
        super(props);
        const style = styles
        this.state = {
            style:style,
            liked:false,
            loved:false
        }
    }

    componentDidMount(){
    }

    render(){
        const {item,onView} = this.props;
        const {style} =  this.state;
        return(
            <TouchableOpacity onPress={()=>onView(item)}>
            <View style ={style.listItem}>
    
            <Image source={inwi.imageSource }
                       style={style.listItemImage}
                />
                {  item.title != '' &&
                <Text style ={style.listItemTitle}>{(item.title)}</Text>
                }
                {   item.description != '' &&
                <View style={{flex: 1, flexDirection: 'row',alignItems:'center'}}>
                    <Text style ={style.listItemDescription}>{(item.description)}</Text>
                </View>
                }
                {this.props.interact &&
                   
                        <TouchableOpacity onPress={()=> this.setState({liked:!this.state.liked})}>
                            <Image source={repeat.imageSource} style={styles.interactInput}/>
                        </TouchableOpacity>
                    
                }
            </View>
                </TouchableOpacity>
        )
    }
}

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
        fontFamily:'Gothic A1',
        fontWeight:"bold",
        color:"#4a545a",
        paddingLeft:10,
        width:'30%'
    },
    listItem:{
        display:"flex",
        flexDirection: 'row',
        padding:10,
        alignItems: 'center',
        backgroundColor:'#FFFFFF'
    },
    listItemImage:{
        width:30,
        height:30,
    },
    listItemDescription:{
        color:"#707070",
        paddingLeft:15,
        width:'60%',
        fontFamily: 'Inter',
        fontWeight: '400',
    },
    interactInput:{
        width:25,
        height:25,
        marginRight:10
    }
});
