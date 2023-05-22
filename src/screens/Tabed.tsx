import * as React from 'react';
import { View, TouchableOpacity, StyleSheet,SafeAreaView} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import Command from './Command'
import ListCommands from './ListCommands'


export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'commands', title: ('MY_COMMANDS') },
            { key: 'newCommand', title: ('NEW_COMMAND_PLUS')},
        ],
    };

    _handleIndexChange = (index:any) => this.setState({ index });

    _renderTabBar = (props:any) => {
        const inputRange = props.navigationState.routes.map((x:any, i:any) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route:any, i:any) => {
                   
                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ color:"#fce" }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = ({ route,navigation}:any) =>{
        if (!route.key)
            return null;
        switch (route.key) {
            case 'newCommand':
                return <Command/>
            default:
                return null;
        }

    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        height:"100%",
        width: "100%",
        margin:30,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor:'#caca08'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderLeftColor:'#caca08',
        borderLeftWidth:0.5
    },
});
