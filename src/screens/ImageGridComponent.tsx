import { Button } from 'native-base';
import React, { useState,useEffect } from 'react';
import { FlatList, TouchableOpacity, Text,Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import { useDao } from '../stores/daoStores';
import { Project } from '../database/dao/ProjectDao';
 interface RNImage{
    isNew:boolean,
    uri:string
 }
const ImageGrid = ({route}:any) => {

    const  project:Project = route.params.project;
    const [images, setImages] = useState<Array<RNImage>>([{isNew:true,uri:""}]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const {documentDao} = useDao();
  const takePicture = async (camera:RNCamera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // Assuming that the image data is in `data.uri`
    setModalVisible(false)
    console.log(data.uri)
    setImages([...images, {isNew:false,uri:data.uri}]);
    documentDao.addToPoject({id_project:project.id,id:1,path:data.uri,data:""})
  };

  const  getDocument= () => {
    documentDao.getByIdProject(project.id).then(
        (docs)=>{
            const imgs = docs.map(doc=> { return {isNew:false,uri:doc.path}})
            setImages([ {isNew:true,uri:""},...imgs]);
        }
    );
}

useEffect(()=>{
    getDocument()
},[])
 
  return (
    <View style={styles.container}>
        {modalVisible &&
        <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    {(({ camera, status, recordAudioPermissionStatus }: {
                        camera: RNCamera;
                        status: 'READY' | 'PENDING_AUTHORIZATION' | 'NOT_AUTHORIZED';
                        recordAudioPermissionStatus?: 'PENDING_AUTHORIZATION' | 'NOT_AUTHORIZED' | 'AUTHORIZED';
                    }) => {
                        if (status !== 'READY') return <Text style={{color:'#000'}} > take Picture </Text>;
                        return (
                            
                            <View style={styles.captureContainer}>
                                <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }) as any}
        </RNCamera>
    }
      <FlatList
        data={images}
        numColumns={3} // Change this value to change the number of images per row
        renderItem={({ item }:{item:RNImage}) => {
          return (
            <View style={{padding:15}}>
            { item.isNew && !modalVisible &&
                 <Button style={{ width: 100, height: 100 }}
                 onPress={()=>setModalVisible(true)}>
                    <Icon size={20} color="black" name="md-camera"/>
                 </Button>
            }
            { !item.isNew && !modalVisible &&
              <Image
                source={{ uri: item.uri }}
                style={{ width: 100, height: 100 }} // Update this to control the size of the images
                />
            }

            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  preview: {
    margin:50
  },
  captureContainer: {
  },
  capture: {
    width:"100%",
    height:"100%",
    alignSelf: 'center',
    borderColor:"#000",
    borderWidth:1
  },
});

export default ImageGrid;
