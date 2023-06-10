import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";


export interface Tss{
    id:number,
    connectionType?:number,
    cableType:number,
    equipmentType:number,
    siteType:number;
}

export default class TssDao {
    constructor(private database :Database){}

    update(tss:Tss){
        return new Promise((resolve, reject) => {
            this.database.update(TABLES.Tss.name,{...tss},{id:tss.id})
            .then((res)=>{
               resolve(res.length);
            }).catch(err=>{
                reject(err);
            })
        })
    }

    create(tss:Tss):Promise<number>{
        return new Promise((resolve, reject) => {
        this.database.insert(TABLES.Tss.name,{...tss})
        .then((new_id:number)=>{
           resolve(new_id);
        }).catch(err=>{
            reject(err);
        })
    })
    }
    getById(id:number):Promise<Tss|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.Tss.name,[],{id:id})
               .then(async (resultSet)=>{
                   if(resultSet.length>0)
                        resolve(resultSet.item(0));
                   else
                    resolve(null)
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}