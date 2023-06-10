import Database, { ProjectRepository } from "..";
import { Step } from "../types";
import { TABLES } from "./constants";

export default class StepDao {
    private  TABLE_NAME = 'STEP'

    constructor(private database :Database){}

    getById(id_step:number):Promise<Step|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.Step.name,[],{id:id_step})
               .then((resultSet)=>{
                   if(resultSet.length>0 ){
                        resolve(resultSet.item(0));
                   }
                   resolve(null);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
    getAll():Promise<Array<Step>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{})
               .then((resultSet)=>{
                   const steps:Array<Step>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id,title} = resultSet.item(i);
                       steps.push({id,title})
                   }
                   resolve(steps);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}