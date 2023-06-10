import Database from "..";
import { ProjectWorkDetails } from "../types";
import { TABLES } from "./constants";

export default class ProjectWorkDetailsDao {
    
    constructor(private database :Database){
    }

    add(details:ProjectWorkDetails){
        this.database.insert(TABLES.ProjectWorkDetails.name,{...details});
    }
    update(details:ProjectWorkDetails){
        this.database.update(TABLES.ProjectWorkDetails.name,{value:details.value},{id_project:details.id_project,id_info:details.id_info});
    }
    async get(id_project:number, id_info:number):Promise<ProjectWorkDetails|null>{
       const result= await this.database.selectFromTable(TABLES.ProjectWorkDetails.name,[],{id_project,id_info})
       if(result.length>0){
        return  result.item(0)
       }else{
        return null;
       }
       
    }

   async getByIdProject(id_project:number):Promise<ProjectWorkDetails[]>{
        const result= await this.database.selectFromTable(TABLES.ProjectWorkDetails.name,[],{id_project});
        const details :ProjectWorkDetails[] = [];
        if(result.length>0){
           for(let i=0;i<result.length;i++){
            details.push(result.item(i));
           }
        }
           return details;
    }

}