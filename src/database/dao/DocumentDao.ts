import Database, { ProjectRepository } from "..";
import { Document, DocumentProject } from "../types";
import { TABLES } from "./constants";




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

    getByIdProject(id_project:number):Promise<Array<DocumentProject>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.DocumentProject.name,[],{id_project:id_project})
               .then(async (resultSet)=>{
                   const docs:Array<DocumentProject>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                    let docProject =resultSet.item(i)
                    const docResult= await this.database.selectFromTable(TABLES.Document.name,[],{id:docProject.id_document})
                    if(docResult.length>0)
                        docs.push({
                            document:docResult.item(0),
                            type:docProject.type
                        })
                   }
                    resolve(docs);
               }).catch(error=>{
                   reject(error);
               });
       });
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
                            ...docResult.item(0)
                        })
                   }
                    resolve(docs);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}