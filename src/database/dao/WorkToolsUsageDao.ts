import Database, { ProjectRepository } from "..";
import WorkToolsDao, { WorkTools } from "./WorkToolsDao";

export interface WorkToolsUsage{
    id_project:number,
    id_tool:number,
    nbr_hour:string,
    tool:WorkTools | null
}

export default class WorkToolsUsageDao {
    private  TABLE_NAME = 'WorkToolsUsage'

    constructor(private database :Database, private workToolsDao:WorkToolsDao){}

    updateDate(id_project:number ,id_tool:number, fileds:{}){
        this.database.update(this.TABLE_NAME,fileds,{id_project:id_project,id_tool:id_tool})
        .then(result=>{
            console.log("update : ", result);
        }).catch(err=>{
            console.error(err);
        })
    }

    getByIdProject(id_project:number):Promise<Array<WorkToolsUsage>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then(async (resultSet)=>{
                   const consumes:Array<WorkToolsUsage>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id_project,id_tool,nbr_hour} = resultSet.item(i);
                       const tool = await this.workToolsDao.getById(id_tool);
                       consumes.push({id_project,id_tool,nbr_hour,tool})
                   }
                   resolve(consumes);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}