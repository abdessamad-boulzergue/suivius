
import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { projectObjectStore } from '../stores/objectsStore';
import { Localisation } from '../database/dao/LocalisationDao';
import { Project } from '../database/dao/ProjectDao';


const PrestationProjet = ({project}:{project :Project}) => {
  
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);

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
},[])

  return (
    <View style={styles.container}>
       

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 ,minHeight:200 },
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

export default PrestationProjet;
