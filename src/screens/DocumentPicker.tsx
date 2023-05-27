import React, { useState } from 'react';
import { Button, View, Text, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Project } from '../database/dao/ProjectDao';
import { useDao } from '../stores/daoStores';

export default function DocumentSelectorDisplay({route}:any) {
    const [image, setImage] = useState<string|null>(null);
    const  {documentDao} = useDao();
    const project :Project= route.params?.project;
    const DOC_TYPE="CROQUIS"

    const  getDocument= () => {
      documentDao.getByIdProjectAndType(project.id,DOC_TYPE).then(
          (docs)=>{
            console.log("getByIdProjectAndType : ", docs)
            docs.slice(0,1).forEach(doc=>{
              setImage(`file://${doc.path}`)
            })
          }
      );
  }
  const selectFile = async () => {

    try {
      const res :DocumentPickerResponse[]= await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      
      const targetPath = RNFS.DocumentDirectoryPath + '/'+res[0].name;
      RNFS.copyFile(res[0].uri, targetPath)
      .then(() => {
        documentDao.addToPoject(project.id,DOC_TYPE,{path:targetPath,type:DOC_TYPE})
        .then(result=>setImage(`file://${targetPath}`))
      })
      .catch(err => console.log('Error copying file:', err));

      console.log("PICKED ",
        res
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('Cancelled');
      } else {
        throw err;
      }
    }
  };


  getDocument();

  return (
    <View >
      <Button title="Select File" onPress={selectFile} />
      <View  style={{alignItems:"center", width: "100%", height: "90%" ,padding:10}}>
      {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />}
    </View>
    </View>
  );
};

