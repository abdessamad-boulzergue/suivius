import { Picker } from '@react-native-picker/picker';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';

const  DayPicker=({onValueChanged,label,value}:any) =>{
  const valueChanged = (value:any) => {
    if (onValueChanged) {
        onValueChanged(value);
    }
  }

    const { containerStyle, labelStyle, pickerStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={ labelStyle }>{ label }</Text>
        <Picker
          style={ pickerStyle }
          selectedValue={ value }
          onValueChange={ valueChanged }
          >
          <Picker.Item label="Monday" value="Monday"/>
          <Picker.Item label="Tuesday" value="Tuesday"/>
          <Picker.Item label="Wednesday" value="Wednesday"/>
          <Picker.Item label="Thursday" value="Thursday"/>
          <Picker.Item label="Friday" value="Friday"/>
          <Picker.Item label="Saturday" value="Saturday"/>
          <Picker.Item label="Sunday" value="Sunday"/>          
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

export { DayPicker };