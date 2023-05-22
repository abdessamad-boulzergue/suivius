import React, {Component} from 'react';
import {
     StyleSheet,Dimensions,SafeAreaView,ActivityIndicator,
} from 'react-native';
import {ListItem, Button } from 'react-native-elements';
import {loadCommand}  from '../network/http/httpDomain'
import WSocket  from '../network/websocket/WSocket'
import {imgCarteVisite} from '@src/assets'
import NetInfo from "@react-native-community/netinfo";
import {translate} from './../i18n';
import ListOverViews from "./ListOverViews"
class ListCommands extends Component {

    constructor(props){
        super(props)
        var pages=[];
        pages.push({
            title : '',
            data : [
                {   title :translate('welcome'),
                    route:'Detail',
                    avatar_url: imgCarteVisite.imageSource,
                    description:"",
                    isLocal:true
                }
            ]
        });
        this.state = {
            pages:pages,
            ws:new WSocket(),
            netUnsubscribe:null
        };

    }

    componentDidMount(){
        let self = this;
        const unsubscribe = NetInfo.addEventListener(state => {
            if(state.isConnected){
                if(self.requestDone == undefined)
                    self.requestDone = true;
                if(self.requestDone ){
                        self.requestDone = false;
                       this.setState({  isLoading: true});
                    loadCommand((data) => {
                        var commands = [];
                        data.results.map(cmd=>{
                            var data  = {
                                title : cmd.title,
                                data : [
                                    {   title :cmd.title,
                                        route:'Detail',
                                        avatar_url: imgCarteVisite.imageSource,
                                        description:cmd.description,
                                        isLocal:true
                                    }
                                ]
                            }
                            commands.push(data);
                        })
                            self.setState({pages: commands , isLoading: false});
                            self.requestDone = true;
                        },()=>{
                            self.requestDone = true;
                            this.setState({  isLoading: false});
                        });
                };
            }
        });
        this.setState({netUnsubscribe : unsubscribe});
    }
    componentWillUnmount(){
        this.state.netUnsubscribe();
    }
    render () {
        const {pages} = this.state;
        return (
            <SafeAreaView>
                { this.state.isLoading &&
                    <ActivityIndicator size="small" color="#000000"/>}
                <ListOverViews navigation={this.props.navigation} pages={pages} style={styles}
                onView={(item)=>{ }}
                />
            </SafeAreaView>
        );
    }
}
const window = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        margin:0,
        padding:0
    },
    sectionTitle:{
        fontSize:10
    },
    listItemTitle:{
        display:'none',
    },
    listItem:{
      flex:1,
      flexDirection:'row',
      marginLeft:3,
      marginBottom:10,
     alignItems: 'center',
     borderBottomWidth:0.5,
     borderBottomColor:"#4a545a"
    },
    listItemImage:{
        width:150,
        height:120,
        marginRight:5,
        resizeMode:'center'
    },
    listItemDescription:{
        fontSize:20,
    }
});

export default ListCommands;
