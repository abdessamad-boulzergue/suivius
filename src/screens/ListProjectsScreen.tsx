
import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useEffect, useState} from 'react';

interface ListProjectsScreenState{
    selectedOption:string
}
const ListProjectsScreen = ()=>{
    const [state, setState] = useState<ListProjectsScreenState>({
        selectedOption:""
    });

    return(
        <View>
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Les etapes de projets*</Text>
                    <View style={styles.pickerContainer}>
                                <Picker
                                        style={styles.picker}
                                        selectedValue={state.selectedOption}
                                        onValueChange={(itemValue) => setState({...state,selectedOption:itemValue}) }
                                        dropdownIconColor= 'black'
                                    >
                                    <Picker.Item label="Etudes" value="Etudes" />
                                    <Picker.Item label="Autorisation" value="Autorisation" />
                                    <Picker.Item label="Traveaux" value="Traveaux" />
                                </Picker>
                                </View>
                </View>
                
        </View>

    )

}

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
        color:'black'
      },
      separator: {
        height: 1,
        backgroundColor: '#ccc',
      },
      dropdownContainer: {
        margin: 20,
        marginBottom:0
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color:"black"
      },
      pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
      },
      picker: {
        flex: 1,
        height: 40,
        color: '#000',
      },
      pickerItem: {
        color: 'black', // Replace with the desired color
      },
    })