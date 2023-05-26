import React, { useState } from 'react';
import { Button, View, Text, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

export default function DocumentSelectorDisplay({route}:any) {
    const [image, setImage] = useState(null);

  const selectFile = async () => {

    try {
      const res :DocumentPickerResponse[]= await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      console.log(
        res[0].uri,
        res[0].type, // mime type
        res[0].name,
        res[0].size
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

  return (
    <View>
      <Button title="Select File" onPress={selectFile} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

    </View>
  );
};

