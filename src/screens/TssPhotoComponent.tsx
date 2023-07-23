import React from 'react';
import {    View  } from 'react-native';
 
import { DOC_TYPES } from '../constants';
import TssEditionValidation from '../components/TssEditionValidation';
import ImageGrid from './ImageGridComponent';

export default function TssPhotoComponent({route,navigation}:any) {

  route.params.type = DOC_TYPES.TSS_IMAGE;
  const project =route.params.project;

  return (
    <View style={{flex:1, height:"100%"}}>
      <ImageGrid style={{height:'80%'}} route={route}></ImageGrid>
 
      <TssEditionValidation style={{}} navigation={navigation}  project={project}/>
    </View>
  );
};

