import React, { useState } from 'react';
import { Button, View, Text, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Project } from '../database/dao/ProjectDao';
import { useDao } from '../stores/context';
import { projectObjectStore } from '../stores/objectsStore';
import DocumentSelectorDisplay from './DocumentPicker';
import { DOC_TYPES } from '../constants';
import TssEditionValidation from '../components/TssEditionValidation';

export default function CroquisComponent({route,navigation}:any) {

  route.params.type = DOC_TYPES.CROQUIS;
  const project =route.params.project;

  return (
    <View >
      <DocumentSelectorDisplay style={{height:'80%'}} route={route}></DocumentSelectorDisplay>
      <Text></Text>
      <TssEditionValidation style={{}}  navigation={navigation}  project={project}/>
    </View>
  );
};

