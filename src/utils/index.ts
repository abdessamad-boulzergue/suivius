import { format, parse } from "date-fns";
import { SIMPLE_DATE_FORMAT } from "../constants";

export function dateToString(date:Date):string{
    return format(date,SIMPLE_DATE_FORMAT);
}
export function stringToDate(date:string):Date{
    return parse(date,SIMPLE_DATE_FORMAT,new Date());
}

export function uid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const generateLongUID = (length:number, numberOfUUIDs:number) => {
    let longUID = '';
  
    for (let i = 0; i < numberOfUUIDs; i++) {
      const uuid = uid();
      longUID += uuid.replace(/-/g, ''); // Remove dashes from each UUID
    }
  
    return longUID.slice(0, length); // Trim the long UID to the desired length
  };