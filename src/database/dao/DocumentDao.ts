import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";


export interface Document{
    id?:number,
    path:string,
    type:string
}

export default class DocumentDao {
    constructor(private database :Database){}

    findById(id:string){
       
    }

    addToPoject(id_project:number,type:string,document:Document):Promise<number>{
        return new Promise((resolve, reject) => {
        this.database.insert(TABLES.Document.name,{...document})
        .then((new_doc_id:number)=>{
            this.database.insert(TABLES.DocumentProject.name,{id_project:id_project,id_document:new_doc_id,type:type})
           resolve(new_doc_id);
        }).catch(err=>{
            reject(err);
        })
    })
    }
    getByIdProjectAndType(id_project:number,type:string):Promise<Array<Document>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.DocumentProject.name,[],{id_project:id_project,type:type})
               .then(async (resultSet)=>{
                   const docs:Array<Document>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                    let docProject =resultSet.item(i)
                    const docResult= await this.database.selectFromTable(TABLES.Document.name,[],{id:docProject.id_document})
                    if(docResult.length>0)
                        docs.push({
                            id:docProject.id_document,
                            path:docResult.item(0).path,
                            type:""
                        })
                   }
                   console.log("document Project  **** docs : ", docs);
                   resolve(docs);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}