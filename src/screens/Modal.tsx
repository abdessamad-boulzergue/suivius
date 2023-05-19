import { FlatList, Image } from 'native-base';
import React, {useState} from 'react';
import {Modal, Text,TouchableHighlight, View, Alert,StyleSheet} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageGrid from './ImageGridComponent';

export const ModalExample =()=> {

    const [images, setImages] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
  const takePicture = async (camera:RNCamera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // Assuming that the image data is in `data.uri`
    setImages([...images, data.uri]);
  };

        return (
            <View style={{marginTop: 22}}>
                <Modal
                    style={{margin: 30, width:120,height:80}}
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{margin: 22}}>
                        <View>
                           <ImageGrid/>
                           

                            <TouchableHighlight
                                onPress={() => {
                                                    setModalVisible(!modalVisible);
                                                }}>
                                <Text style={{color: "black"}}> Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <FlatList
        data={images}
        numColumns={3} // Change this value to change the number of images per row
        renderItem={({ item }) => {

          return (
            <Image
              source={{ uri: item }}
              style={{ width: 100, height: 100 }} // Update this to control the size of the images
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
                <TouchableHighlight
                    onPress={() => {
                        setModalVisible(true);
                    }}>
                    <Text style={{color: "black"}}> Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
    captureContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: 20,
    }
  });
  
  
