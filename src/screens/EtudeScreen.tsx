import React, { useState,useEffect } from 'react';
import { Text, TouchableOpacity, View ,StyleSheet, ScrollView} from 'react-native';

import CollapsibleItem from '../components/CollapsibleItem';
import { useDao } from '../stores/daoStores';
import { Localisation } from '../database/dao/LocalisationDao';
import { Project } from '../database/dao/ProjectDao';

const EtudeComponent = ({route}:any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const project:Project = route.params?.project;

  const{localisationDao} = useDao();
    const [localisation, setLocalisation] = useState<Localisation|undefined>(undefined);
   useEffect(()=>{
    localisationDao.getByIdProject(project.id).then(localiz=>{
        setLocalisation(localiz);
        console.log(localiz)
    })
   },[])

  return (
    <ScrollView>

     <CollapsibleItem title="TSS" >
        <View style={{padding:10}}>
        <View style={styles.info}>
                    <Text style={styles.text}>Site</Text>
                    <Text style={styles.text}>{localisation?.site}</Text>
        </View>
        <View style={styles.info}>
                    <Text style={styles.text}>Region</Text>
                    <Text style={styles.text}>{localisation?.region}</Text>
        </View>
        <View style={styles.info}>
                    <Text style={styles.text}>Province</Text>
                    <Text style={styles.text}>{localisation?.province}</Text>
        </View>
        <View style={styles.info}>
                    <Text style={styles.text}>Addresse</Text>
                    <Text style={styles.text}>{localisation?.addresse}</Text>
        </View>
        </View>
      </CollapsibleItem>
      
      <View style={{minHeight:10}}></View>
      
      <CollapsibleItem title="Details Traveaux">
        <View>
        <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
        </View>
        <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
        </View>
        <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
        </View>
        </View>
      </CollapsibleItem>
      
      <View style={{minHeight:10}}></View>


      <CollapsibleItem title="Croquis">
        <View>
        <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
        </View>
        <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
        </View>
        <View style={styles.info}>
                    <Text style={styles.text}>Type de prestation</Text>
                    <Text style={styles.text}>propre</Text>
        </View>
        </View>
      </CollapsibleItem>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
})

export default EtudeComponent;
