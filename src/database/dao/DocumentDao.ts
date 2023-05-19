import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";


export interface Document{
    id:number,
    id_project:number,
    path:string,
    data:string
}

export default class DocumentDao {
    private  TABLE_NAME = TABLES.Document.name;
    constructor(private database :Database){}

    findById(id:string){
       
    }

    addToPoject(document:Document){
        this.database.insert(this.TABLE_NAME,{...document})
        .then(result=>{
            console.log("insert document : ", result);
        }).catch(err=>{
            console.error(err);
        })
    }
    getByIdProject(id_project:number):Promise<Array<Document>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then((resultSet)=>{
                   const staffWork:Array<Document>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id,path,data,id_project} = resultSet.item(i);
                       staffWork.push({id,path,data,id_project})
                   }
                   resolve(staffWork);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}