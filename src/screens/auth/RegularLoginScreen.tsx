import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegularLoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> RegularLogin !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default RegularLoginScreen;
