import React, { useState } from 'react';
import { Button, View, Text, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Project } from '../database/dao/ProjectDao';
import { useDao, useStores } from '../stores/context';
import { projectObjectStore } from '../stores/objectsStore';

export default function DocumentSelectorDisplay({route , style}:any) {
    style = style || {};
    const [image, setImage] = useState<string|null>(null);
    const  {documentDao} = useDao();
    const project :Project= route.params?.project;
    const DOC_TYPE= route.params?.type
    const {rightsStore} = useStores()
    const canedit        = rightsStore.hasPermission(project.id_step,project.id,"EDITER_APD") ||  rightsStore.hasPermission(project.id_step,project.id,"EDITER_TSS")  ;
    const canValidate = rightsStore.hasPermission(project.id_step,project.id,'PRE_VALIDATION_APD') || rightsStore.hasPermission(project.id_step,project.id,'PRE_VALIDATION_TSS');
    

    const  getDocument= async () => {
      const docs = await documentDao.getByIdProjectAndType(project.id,DOC_TYPE);
      if(docs && docs.length>0){
              setImage(docs[0].path) 
      }else{
        const projDoc = projectObjectStore.getProjectsDocument(project.id,DOC_TYPE)
        
        if(projDoc && projDoc.length>0){
          setImage(projDoc[0].content)
        }
      }
  }
  const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2);
    return randomId;
  };
  
  const selectFile = async () => {

    try {
      const res :DocumentPickerResponse[]= await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const name = res[0].name || generateRandomId()
      const type = res[0].type || "png";
      const targetPath = RNFS.DocumentDirectoryPath + '/'+res[0].name;
      RNFS.copyFile(res[0].uri, targetPath)
      .then(() => {
        documentDao.addToPoject(project.id,DOC_TYPE,{path:`file://${targetPath}`,type:type,name:name})
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
    <View style={style}>
      {canedit && canValidate && (<>
        <Button title="Select File" onPress={selectFile} />
        <View  style={{alignItems:"center", width: "100%", height: "100%" ,padding:5}}>
        {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />}
      </View>
      </>
    )}
    </View>
  );
};

