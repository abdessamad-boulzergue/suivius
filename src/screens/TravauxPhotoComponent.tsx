import React from 'react';
import {    View  } from 'react-native';
 
import { DOC_TYPES } from '../constants';
import ImageGrid from './ImageGridComponent';
import ReportEditionValidation from '../components/ReportEditionValidation';

export default function TravauxPhotoComponent({route,navigation}:any) {

  route.params.type = DOC_TYPES.TRAVAUX_IMAGE;
  const project =route.params.project;
  const report =route.params.report;

  return (
    <View style={{flex:1, height:"100%"}}>
      <ImageGrid style={{height:'80%'}} route={route}></ImageGrid>
 
      <ReportEditionValidation report={report} project={project} navigation={navigation}/>

    </View>
  );
};

