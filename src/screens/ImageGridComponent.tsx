import { Button } from 'native-base';
import React, { useState,useEffect } from 'react';
import { FlatList, TouchableOpacity, Text,Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import { useDao } from '../stores/context';
import { Project } from '../database/dao/ProjectDao';
import { DOC_TYPES } from '../constants';
import { projectObjectStore } from '../stores/objectsStore';

 interface RNImage{
    isNew:boolean,
    uri:string
 }
const ImageGrid = ({route}:any) => {
  
    const  project:Project = route.params.project;
    const  DOC_TYPE:string = route.params.type;
    const [images, setImages] = useState<Array<RNImage>>([{isNew:true,uri:""}]);
    const [cameraVisible, setCameraVisible] = useState<boolean>(false);
    const {documentDao} = useDao();
    console.log(project)
  const takePicture = async (camera:RNCamera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // Assuming that the image data is in `data.uri`
    setCameraVisible(false)
    const filePathParts = data.uri.split('/');
     const fileName = filePathParts[filePathParts.length - 1];
    setImages([...images, {isNew:false,uri:data.uri}]);
    documentDao.addToPoject(project.id,DOC_TYPE,{path:data.uri,type:"image/jpeg",name:fileName})
  };

  const  getDocument= async () => {
    const docs = await documentDao.getByIdProjectAndType(project.id,DOC_TYPE);
    if(docs && docs.length>0){
      const imgs = docs.map(doc=> { return {isNew:false,uri:doc.path}})
      setImages([ {isNew:true,uri:""},...imgs]);
    }else{
      const projDoc = projectObjectStore.getProjectsDocument(project.id,DOC_TYPES.TSS_IMAGE)
      if(projDoc && projDoc.length>0){
        const imgs = projDoc.map(doc=> { return {isNew:false,uri:doc.content}})
            setImages([ {isNew:true,uri:""},...imgs]);
      }
    }
}
  const  getDocumentx= () => {
    documentDao.getByIdProjectAndType(project.id,DOC_TYPES.TSS_IMAGE).then(
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
        {cameraVisible &&
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
            <View style={{padding:15,height:100}}>
            { item.isNew && !cameraVisible &&
                 <Button style={{ width: 100, height: 100 }}
                 onPress={()=>setCameraVisible(true)}>
                    <Icon size={20} color="black" name="md-camera"/>
                 </Button>
            }
            { !item.isNew && !cameraVisible &&
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
  container: { flex: 1 ,minHeight:"85%"},
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
