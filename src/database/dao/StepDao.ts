import Database, { ProjectRepository } from "..";

export interface Step{
    id:number,
    title:string,
}

export default class StepDao {
    private  TABLE_NAME = 'STEP'

    constructor(private database :Database){}

    getAll():Promise<Array<Step>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{})
               .then((resultSet)=>{
                   const steps:Array<Step>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id,title} = resultSet.item(i);
                       steps.push({id,title})
                   }
                   resolve(steps);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}