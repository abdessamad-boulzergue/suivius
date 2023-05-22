import React, { Component } from 'react';
import { Text, View ,StyleSheet} from 'react-native';

import { Card, CardSection, DayPicker, Input } from './common';


const EmployeeForm =({error, name, phone, shift, employeeUpdate,children}:any) => {

    employeeUpdate = employeeUpdate || (()=>{})
  const renderError = () => {
    if (error){
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={ styles.errorTextStyle }>
            { error }
          </Text>
        </View>
      );
    }
  }

    return(
      <Card>
        <CardSection>
          <Input 
            label="Name" 
            placeHolder="Jane" 
            value={ name }
            onChangeText={ (text:string) => employeeUpdate({ prop: 'name', value: text }) } />
        </CardSection>

        <CardSection>
          <Input 
            label="Phone" 
            keyboardType="phone-pad"
            placeHolder="555-555-5555" 
            value={ phone }
            onChangeText={ (text:string) => employeeUpdate({ prop: 'phone', value: text }) }/>
        </CardSection>

        <CardSection>
          <DayPicker 
            style={{ flex:1 }}
            value={ shift }
            label="Shift"
            onValueChanged={ (value:string) => employeeUpdate({ prop: 'shift', value }) }
          />
        </CardSection>
        { renderError() }
        { children }
      </Card>      
    );
  
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    padding: 10
  }
})

function mapStateToProps( state:any ) {  
  const { name, phone, shift, error } = state.employeeForm;
  console.log(`[DEBUG]<EmployeeForm.mapStateToProps()> name: ${name}, phone: ${phone}, shift: ${shift}`);
  return {
    name,
    phone,
    shift,
    error,
  };
}

export default EmployeeForm;