import React, {Component} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SuiviInputText from '../components/InputText';
import SuiviInputDate from '../components/InputDate';

interface AutorizationState {
  }

const AutorizationScreen = ({route,navigation}:any) => {
    let callbackDateChange:any;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateDemande, setDateDemande] = useState(new Date());
    const [dateCommission, setDateCommission] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event:any, date:any) => {
        if (date !== undefined) {
        callbackDateChange(date);
        }
        setShowPicker(false);
    };

    const showDatePicker = (date:Date , callback :any) => {
        setSelectedDate(date);
        setShowPicker(true);
        callbackDateChange = callback
    };

        return (
            <View style={{flex: 1,}}>
               <SuiviInputDate></SuiviInputDate>
               <SuiviInputDate></SuiviInputDate>
               <SuiviInputDate></SuiviInputDate>
               <SuiviInputDate></SuiviInputDate>
               <SuiviInputDate></SuiviInputDate>
            </View>
        );
    
}
const window = Dimensions.get('window')
const styles = StyleSheet.create({

   });

export default AutorizationScreen;
