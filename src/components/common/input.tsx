import React from 'react';
import { TextInput, View, Text,StyleSheet  } from 'react-native';

const Input = ({ label, editable,placeHolder, secureTextEntry, value, keyboardType,onChangeText }:any) => {
    keyboardType = keyboardType || 'ascii-capable'
  const { containerStyle, inputStyle, labelStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={ labelStyle }> { label } </Text>
      <TextInput
        autoCorrect={ false }
        placeholder={ placeHolder }
        style={ inputStyle }
        keyboardType={keyboardType}
        value={ value }
        editable={editable}
        secureTextEntry={ secureTextEntry }
        onChangeText={ onChangeText }
        />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    color:"#000"
  },
  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export { Input };