
import { View,Image,TextInput,StyleSheet, TouchableOpacity } from "react-native";
import { user } from '../assets'
import { useState,useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import SuiviInputText from "./InputText";
import { format } from 'date-fns';
import { SIMPLE_DATE_FORMAT, SIMPLE_TIME_FORMAT } from "../constants";

const SuiviInputDate=({mode, title,date,onChange,style,validate,disabled}:any)=>{
    mode = mode || "date";
    
    validate = validate || ((date:Date)=>true);
    const inputPattern= mode ==='date'? SIMPLE_DATE_FORMAT :SIMPLE_TIME_FORMAT;
    const [showPicker, setShowPicker] = useState(false);
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [selectedDate, setSelectedDate] = useState<Date>(date);
    const [displayDate, setDisplayDate] = useState<string>(date ? format(date,inputPattern) : "");
    onChange = onChange ? onChange :()=>{};
    const handleDateChange = (event:any, newDate:any) => {
        console.log(newDate, event)
        setShowPicker(false);
        if(validate(newDate) && event.type==="set"){
            onChange(newDate)
            setSelectedDate(newDate)
            setDisplayDate(format(newDate,inputPattern) )
        }
    };
    useEffect(()=>{
        setIsDisabled(disabled)
    },[disabled])

    const showDatePicker = () => {
        setShowPicker(true);
    };

    return(
        <View>
            <TouchableOpacity onPress={()=>showDatePicker()} disabled={isDisabled}>
                     <SuiviInputText editable={false} style={style} key={title} title={title} icon="calendar" value ={displayDate} ></SuiviInputText>
          </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                    value={selectedDate ||  new Date()}
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
