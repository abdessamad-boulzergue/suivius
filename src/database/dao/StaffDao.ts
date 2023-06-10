import Database from "..";
import { Filter, like } from "./expression";

export interface StaffMember{
    id:number,
    name:string
}
export default class StaffDao {
    private  TABLE_NAME = 'StaffMember'
    
    constructor(private database :Database){}

    async add(staff:StaffMember):Promise<number>{
        return new Promise((resolve, reject) => {
        return this.database.insert(this.TABLE_NAME,{name:staff.name})
        .then(result=>{
                resolve(result)
            }).catch(err=>{
            reject(err);
            })
        })
    }
    getWithFilter(filters:{[key:string]:string}):Promise<Array<StaffMember>>{
        const dbFilter:{[key:string]:Filter} = {};
        return new Promise((resolve, reject) => {
               Object.keys(filters).forEach(key=>{
                dbFilter[key] = like(filters[key]);
               })
               this.database.selectFromTableWithFilter(this.TABLE_NAME,[],dbFilter)
               .then((resultSet)=>{
                   const staff:Array<StaffMember>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id,name} = resultSet.item(i);
                       staff.push({id, name })
                   }
                   resolve(staff);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
    getAll():Promise<Array<StaffMember>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{})
               .then((resultSet)=>{
                   const staff:Array<StaffMember>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id,name} = resultSet.item(i);
                       staff.push({id, name })
                   }
                   resolve(staff);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
     getById(id:number):Promise<StaffMember|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id:id})
               .then((resultSet)=>{
                   if(resultSet.length>0 ){
                        const staff = resultSet.item(0);
                        resolve(staff);
                   }
                   resolve(null);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}