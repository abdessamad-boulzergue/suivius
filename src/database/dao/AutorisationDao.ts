import { format, parse } from "date-fns";
import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";
import { SIMPLE_DATE_FORMAT } from "../../constants";

export interface Autorisation{
    id_project:string,
    date_demande:Date | undefined,
    date_commission:Date | undefined,
    decision:string | undefined,
    date_paiment:Date | undefined,
    date_sign:Date |undefined
}

export default class AutorisationDao {
    private  TABLE_NAME = 'AUTORISATION'
     constructor(private database :Database){}

    findById(id:string){
       
    }

    async addToPoject(autorisation:Autorisation):Promise<void>{
        return this.database.insert(this.TABLE_NAME,{
            id_project:autorisation.id_project,
            date_demande:autorisation.date_demande ?format(autorisation.date_demande, SIMPLE_DATE_FORMAT ) :"",
           date_commission:autorisation.date_commission ? format(autorisation.date_commission, SIMPLE_DATE_FORMAT):"",
             decision:autorisation.decision,
             date_paiment:autorisation.date_paiment? format(autorisation.date_paiment, SIMPLE_DATE_FORMAT ):"",
              date_sign:autorisation.date_sign ?format(autorisation.date_sign, SIMPLE_DATE_FORMAT ):"",
        })
        .then(result=>{
        }).catch(err=>{
            console.error(err);
        })
    }
    updateDate(id_project:number , autorisation:Autorisation){
        this.database.update(this.TABLE_NAME,{
            date_demande:autorisation.date_demande ?format(autorisation.date_demande, SIMPLE_DATE_FORMAT ) :"",
           date_commission:autorisation.date_commission ? format(autorisation.date_commission, SIMPLE_DATE_FORMAT):"",
           decision:autorisation.decision || "",
             date_paiment:autorisation.date_paiment? format(autorisation.date_paiment, SIMPLE_DATE_FORMAT ):"",
              date_sign:autorisation.date_sign ?format(autorisation.date_sign, SIMPLE_DATE_FORMAT ):"",
        },{id_project:id_project})
        .then(result=>{
        }).catch(err=>{
            console.error(err);
        })
    }
    getByIdProject(id_project:number):Promise<Autorisation|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then((resultSet)=>{
                   if(resultSet.length >0){
                       const  {id_project,date_demande,date_commission,decision,date_paiment,date_sign} = resultSet.item(0);
                       resolve ({
                        id_project,
                        date_demande:date_demande ?parse(date_demande, SIMPLE_DATE_FORMAT, new Date()) :undefined,
                        date_commission:date_commission ? parse(date_commission, SIMPLE_DATE_FORMAT, new Date()):undefined,
                        decision:decision,
                        date_paiment:date_paiment? parse(date_paiment, SIMPLE_DATE_FORMAT, new Date()):undefined,
                        date_sign:date_sign ?parse(date_sign, SIMPLE_DATE_FORMAT, new Date()):undefined,
                       })
                   }
                   resolve(null);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}