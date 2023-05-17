import React, {Component} from 'react';
import {  Text, View, Image,StyleSheet,Dimensions,
         TouchableOpacity,
} from 'react-native';
import {recommended ,liked,loved,heart} from  '../assets';;
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
    
            <Image source={loved.imageSource }
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
                            <Image source={this.state.liked? liked.imageSource:recommended.imageSource} style={styles.interactInput}/>
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
        color:"#4a545a",
        paddingLeft:5,
        width:'20%'
    },
    listItem:{
        display:"flex",
        flexDirection: 'row',
        padding:5,
        alignItems: 'center',
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
        marginRight:10
    }
});
