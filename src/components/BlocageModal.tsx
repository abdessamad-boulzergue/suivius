import { Button, TextArea } from 'native-base';
import React, { useState,useEffect } from 'react';
import { FlatList, TouchableOpacity, Text,Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import { useDao } from '../stores/context';
import { Project } from '../database/dao/ProjectDao';
import DeviceInfo from 'react-native-device-info';
import { DOC_TYPES } from '../constants';
import SButton from './common/SButton';
import { projectObjectStore } from '../stores/objectsStore';
import { Localisation } from '../database/dao/LocalisationDao';
import { IssueDto } from '../services/types';

 interface RNImage{
    isNew:boolean,
    uri:string
 }
 const uniqueId = DeviceInfo.getUniqueId();
 

const BlocageComponent = ({route}:any) => {
    
    const  project:Project = route.params.project;
    const [images, setImages] = useState<Array<RNImage>>([{isNew:true,uri:""}]);
    const [cameraVisible, setCameraVisible] = useState<boolean>(false);
    const [issue, setIssue] = useState<IssueDto|undefined>(undefined);
    const [description, setDescription] = useState<string>("");
    const {documentDao,projectDao} = useDao();
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);

  const takePicture = async (camera:RNCamera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // Assuming that the image data is in `data.uri`
    setCameraVisible(false)
      const filePathParts = data.uri.split('/');
     const fileName = filePathParts[filePathParts.length - 1];
    setImages([...images, {isNew:false,uri:data.uri}]);
    documentDao.addToPoject(project.id,DOC_TYPES.BLOCAGE_IMG,{path:data.uri,type:"image/jpeg",name:fileName})
  };

  const  getDocument= () => {
    documentDao.getByIdProjectAndType(project.id,DOC_TYPES.BLOCAGE_IMG).then(
        (docs)=>{
            const imgs = docs.map(doc=> { return {isNew:false,uri:doc.path}})
            setImages([ {isNew:true,uri:""},...imgs]);
        }
    );
}
useEffect(()=>{
  const localisation =projectObjectStore.getProjectLocalisation(project)
  if(localisation)
      setLocalisation({
        addresse:localisation.address,
        province:localisation.province,
        region:localisation.region,
        lat:localisation.lat,
        lng:localisation.lng,
        id:0,
        site:localisation?.site
      });
    getDocument();
    let issues = projectObjectStore.getProjectIssues(project.id , project.id_step_status);
    if(issues.length>0){
      setIssue(issues[0]);
      setDescription(issues[0].description);
    }
},[])

  const addIssue = ()=>{
    projectDao.addIssue(project.id,project.id_step_status,description);
  }
  const endIssue =()=>{
    projectDao.endIssue(project.id);
    setIssue(undefined);
  }
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

                <View style={styles.info}>
                    <Text style={styles.text}>client/site</Text>
                    <Text style={styles.text}>{localisation?.site}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>region</Text>
                    <Text style={styles.text}>{localisation?.region}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>province</Text>
                    <Text style={styles.text}>{localisation?.province}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>address</Text>
                    <Text style={styles.text}>{localisation?.addresse}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
                </View>
          <Text style={{color:'#000', margin:15}}> motif de blocage: </Text>
          <TextArea style={{color:'#000', margin:15}} value={description} onChangeText={setDescription} numberOfLines={5} autoCompleteType ></TextArea>

      <FlatList
        data={images}
        numColumns={3} // Change this value to change the number of images per row
        renderItem={({ item }:{item:RNImage}) => {
          return (
            <View style={{padding:15}}>
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
      <View style={{margin:20, justifyContent:'center'}}>
          { issue && 
            <SButton style={{ alignSelf:"center", height:50,  width:"50%", }}  title="fin blocage" 
                            onPress={endIssue}>
                        </SButton>
          
          }
          { !issue && 
           
            <SButton style={{ alignSelf:"center", height:50,  width:"50%", }} title="Bloquer" 
                            onPress={addIssue}>
                        </SButton>
            
          }
      </View>
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
  info:{ 
    padding:10,
    flex:1, 
    flexDirection: 'row',
    justifyContent:'space-between',
    maxHeight:50,
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
  text:{
      color:"black"
  }
});

export default BlocageComponent;
