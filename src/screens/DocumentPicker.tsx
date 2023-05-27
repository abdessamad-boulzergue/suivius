import React, { useState } from 'react';
import { Button, View, Text, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

export default function DocumentSelectorDisplay({route}:any) {
    const [image, setImage] = useState<string|null>(null);

  const selectFile = async () => {

    try {
      const res :DocumentPickerResponse[]= await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      setImage(res[0].uri);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('Cancelled');
      } else {
        throw err;
      }
    }
  };

  return (
    <View >
      <Button title="Select File" onPress={selectFile} />
      <View  style={{alignItems:"center", width: "100%", height: "90%" ,padding:10}}>
      {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />}
    </View>
    </View>
  );
};

