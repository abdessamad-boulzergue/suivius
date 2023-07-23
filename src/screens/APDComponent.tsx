import React  from 'react';
import { View, Text } from 'react-native';
 
import DocumentSelectorDisplay from './DocumentPicker';
import { DOC_TYPES } from '../constants';
import APDEditionValidation from '../components/APDEditionValidation';

export default function APDComponent({route,navigation}:any) {

  route.params.type = DOC_TYPES.APD;
  const project =route.params.project;

  return (
    <View >
      <DocumentSelectorDisplay style={{height:'75%'}} route={route}></DocumentSelectorDisplay>
      <Text style={{height:30}}></Text>
      <APDEditionValidation   navigation={navigation}  project={project}/>
    </View>
  );
};

