import Database, { ProjectRepository } from "..";
import {  StepStatus } from "../types";
import { TABLES } from "./constants";

export default class StepStatusDao {

    constructor(private database :Database){}

    getById(id_status:number):Promise<StepStatus|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.StepStatus.name,[],{id:id_status})
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
    getAll():Promise<Array<StepStatus>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.StepStatus.name,[],{})
               .then((resultSet)=>{
                   const steps:Array<StepStatus>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       steps.push(resultSet.item(i))
                   }
                   resolve(steps);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}