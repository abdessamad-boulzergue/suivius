
import { View,Image,TextInput,StyleSheet, TouchableOpacity } from "react-native";
import { user } from '../assets'
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import SuiviInputText from "./InputText";

const SuiviInputDate=({mode}:any)=>{

    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (event:any, date:any) => {
        setShowPicker(false);
        setSelectedDate(date)
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>showDatePicker()}>
                     <SuiviInputText value ={selectedDate ?selectedDate : ''} ></SuiviInputText>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                    value={selectedDate}
                    mode={mode}
                    onChange={handleDateChange}
                    />
                )}
        </View>
    )

}

export default SuiviInputDate;


const styles = StyleSheet.create({
    container: {
        flex:1,
        width:"100%"
    },
});
