import { format } from "date-fns";
import DeviceInfo from "react-native-device-info";
import Database, { ProjectRepository } from "..";
import { SIMPLE_DATE_FORMAT } from "../../constants";
import { TABLES } from "./constants";

export default class HistoryDao {
    constructor(private database :Database){}

    add(id_project:number,id_user:number,id_step_status:number,):Promise<number>{
        return new Promise(async (resolve, reject) => {
        const dateUpdate:string = format(new Date(),SIMPLE_DATE_FORMAT)
        const device_uid = await DeviceInfo.getUniqueId();
        this.database.insert(TABLES.History.name,{id_project,id_user,id_step_status,dateUpdate,device_uid})
        .then((new_id:number)=>{
           resolve(new_id);
        }).catch(err=>{
            reject(err);
        })
    })
    }
}
