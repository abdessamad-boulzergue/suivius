import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

export default class ModalExample extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    style={{margin: 30, width:120,height:80}}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
                    <View style={{margin: 22}}>
                        <View>
                            <Text style={{color: "black"}}> Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                                <Text style={{color: "black"}}> Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
            this.setModalVisible(true);
          }}>
                    <Text style={{color: "black"}}> Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
