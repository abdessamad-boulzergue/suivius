
import { View,Image,TextInput,StyleSheet, TouchableOpacity } from "react-native";
import { user } from '../assets'
import { useState,useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import SuiviInputText from "./InputText";
import { format } from 'date-fns';
import { SIMPLE_DATE_FORMAT, SIMPLE_TIME_FORMAT } from "../constants";

const SuiviInputDate=({mode, title,date,onChange,style}:any)=>{
    mode = mode || "date";
    const inputPattern= mode ==='date'? SIMPLE_DATE_FORMAT :SIMPLE_TIME_FORMAT;
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(date || new Date());
    const [displayDate, setDisplayDate] = useState<string>(date ? format(date,inputPattern) : "");
    onChange = onChange ? onChange :()=>{};
    const handleDateChange = (event:any, newDate:any) => {
        
            onChange(newDate)
            setShowPicker(false);
            setSelectedDate(newDate)
            setDisplayDate(format(newDate,inputPattern) )
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    return(
        <View>
            <TouchableOpacity onPress={()=>showDatePicker()}>
                     <SuiviInputText editable={false} style={style} key={title} title={title} icon="calendar" value ={displayDate} ></SuiviInputText>
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
    
});
