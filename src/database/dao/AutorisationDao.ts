import { parse } from "date-fns";
import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";

export interface Autorisation{
    id_project:string,
    date_demande:Date | undefined,
    date_commission:Date | undefined,
    date_decision:Date | undefined,
    date_paiment:Date | undefined,
    date_sign:Date |undefined
}

export default class AutorisationDao {
    private  TABLE_NAME = 'AUTORISATION'
    private formatDateString ="yyyy-MM-dd"
    constructor(private database :Database){}

    findById(id:string){
       
    }

    async addToPoject(autorisation:Autorisation):Promise<void>{
        return this.database.insert(this.TABLE_NAME,{...autorisation})
        .then(result=>{
            console.log("insert document : ", result);
        }).catch(err=>{
            console.error(err);
        })
    }
    updateDate(id_project:number , fileds:{}){
        this.database.update(this.TABLE_NAME,fileds,{id_project:id_project})
        .then(result=>{
            console.log("update : ", result);
        }).catch(err=>{
            console.error(err);
        })
    }
    getByIdProject(id_project:number):Promise<Autorisation|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then((resultSet)=>{
                   if(resultSet.length >0){
                       const  {id_project,date_demande,date_commission,date_decision,date_paiment,date_sign} = resultSet.item(0);
                       resolve ({
                        id_project,
                        date_demande:date_demande ?parse(date_demande, this.formatDateString, new Date()) :undefined,
                        date_commission:date_commission ? parse(date_commission, this.formatDateString, new Date()):undefined,
                        date_decision:date_decision? parse(date_decision, this.formatDateString, new Date()):undefined,
                        date_paiment:date_paiment? parse(date_paiment, this.formatDateString, new Date()):undefined,
                        date_sign:date_sign ?parse(date_sign, this.formatDateString, new Date()):undefined,
                       })
                   }
                   resolve(null);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}