import React, { useState } from 'react';
import { Text, TouchableOpacity, View ,StyleSheet, ScrollView} from 'react-native';

import Collapsible from 'react-native-collapsible';
import CollapsibleItem from '../components/CollapsibleItem';

export default function TravauxReportComponent() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <ScrollView>

     <CollapsibleItem title="BQQ">
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
      <CollapsibleItem title="Quality">
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
      <CollapsibleItem title="Photo">
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

