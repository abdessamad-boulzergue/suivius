import { parse } from "date-fns";
import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";

export interface Autorisation{
    id_project:string,
    date_demande:Date,
    date_commission:Date,
    date_decision:Date,
    date_paiment:Date,
    date_sign:Date
}

export default class AutorisationDao {
    private  TABLE_NAME = 'AUTORISATION'
    private formatDateString ="yyyy-MM-dd"
    constructor(private database :Database){}

    findById(id:string){
       
    }

    updateDate(id_project:number , fileds:{}){
        this.database.update(this.TABLE_NAME,fileds,{id_project:id_project})
        .then(result=>{
            console.log("update : ", result);
        }).catch(err=>{
            console.error(err);
        })
    }
    getByIdProject(id_project:number):Promise<Array<Autorisation>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then((resultSet)=>{
                   const projects:Array<Autorisation>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id_project,date_demande,date_commission,date_decision,date_paiment,date_sign} = resultSet.item(i);
                       projects.push({
                        id_project,
                        date_demande:parse(date_demande, this.formatDateString, new Date()),
                        date_commission:parse(date_commission, this.formatDateString, new Date()),
                        date_decision:parse(date_decision, this.formatDateString, new Date()),
                        date_paiment:parse(date_paiment, this.formatDateString, new Date()),
                        date_sign:parse(date_sign, this.formatDateString, new Date()),
                       })
                   }
                   resolve(projects);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}