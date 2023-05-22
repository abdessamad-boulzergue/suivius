import { Picker } from '@react-native-picker/picker';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import React, { Component, useState } from 'react';
import { Text, View,StyleSheet } from 'react-native';

interface PickerItem{
    label:string,
    key:string,
    value:string
}

export default function  GenericPicker({onValueChanged,label,value,items}:{onValueChanged:Function,label:string,value:string,items:Array<PickerItem>}) {
  const valueChanged = (value:any) => {
    if (onValueChanged) {
        onValueChanged(value);
    }
  }
   const [pickerItems,setPickerItems]  = useState<Array<PickerItem>>(items);
    const { containerStyle, labelStyle, pickerStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={ labelStyle }>{ label }</Text>
        <Picker
          style={ pickerStyle }
          selectedValue={ value }
          onValueChange={ valueChanged }
          >
            {
                pickerItems.map(item=>{ return(
                        <Picker.Item label={item.label} value={item.value} key={item.key || item.label}/>
                    )})
            }     
        </Picker>
      </View>
    );
  
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStyle: {
    flex: 1,
    paddingLeft: 25,
    fontSize: 18,
    color:"#000"
  },
  pickerStyle: {
    flex: 2,
    fontSize: 18,
    paddingRight: 5,
    color:'#000'
  }
});

