import Database, { ProjectRepository } from "..";

export interface Localisation{
    id:number,
    site:string,
    region:string,
    province:string,
    addresse:string,
    lat:number,
    lng:number
}

export default class LocalisationDao {
    private  TABLE_NAME = 'LOCALISATION'

    constructor(private database :Database){}

    getByIdProject(id_project:number):Promise<Localisation>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then((resultSet)=>{
                   const localisation:Localisation = resultSet.length>0 ? resultSet.item(0) : null;                   
                   resolve(localisation);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}