import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";

export interface Project{
    id:number,
    title:string,
    description:string,
    debut_reel:Date,
    fin_reel:Date,
    debut_estime:Date,
    fin_estime:Date,
    id_step:number
    id_categorie:number
    id_step_status:number
}
const stepStatusFLow : {[key:string]:any}={
    "1":{previous:()=>null,next:()=>2 ,step:2},
    "2":{ previous:()=>1, next:()=>3,step:2},
    "3":{ previous:(get:()=>{})=>get(), next:(get:()=>{})=>get(),step:2}
}
export default class ProjectDao {
    private  TABLE_NAME = 'PROJECT'

    constructor(private database :Database){}

    findById(id:number):Promise<Project|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id:id})
               .then((resultSet)=>{
                   if(resultSet.length>0 ){
                        resolve(resultSet.item(0));
                   }
                   resolve(null);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
  nextStep(id:number):Promise<Project>{
        return new Promise(async (resolve, reject) => {
            const project= await this.findById(id);
            if(project){
                if(project.id_step_status!==3){
                const nextStepStatus= stepStatusFLow[project.id_step_status].next();
                const step_id = stepStatusFLow[nextStepStatus].step;

                project.id_step = step_id
                project.id_step_status=nextStepStatus
                this.database.update(this.TABLE_NAME,{
                        id_step:project.id_step,
                        id_step_status:project.id_step_status
                    },{
                        id:project.id
                    }).then(result=>{
                        resolve(project)
                    }).catch(error=>{
                        reject(error)
                    })
                }
            }
        })
    }
    projectDao(){
        return {
            
            delete : (id:string)=> {
                let ids =new Map();
                ids.set("ID",id);
                return this.database.deleteFromTable(this.TABLE_NAME,ids);
            },
            insert : (prod : Map<string,string>) => {
                if (prod) {
                    var args =new Array<string>();
                    const values = Object.keys(prod)
                        .map((key)=> {
                            args.push(prod.get(key)!);
                            return '?'
                        }).join(',');

                    const query = 'INSERT INTO '+this.TABLE_NAME+' VALUES ('+ values +')';
                    return this.database.executeQuery(query, args);
                }
                return new Promise((resolve ,reject) => { reject('inserted entity is not defined');});;
            }
        }
    }
  
    getByStep(id_step:string):Promise<Array<Project>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_step:id_step})
               .then((resultSet)=>{
                   const projects:Array<Project>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       projects.push(resultSet.item(i))
                   }
                   resolve(projects);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
   getByStepAndCategorie(id_step:string,id_categorie:string):Promise<Array<Project>>{
    return new Promise((resolve, reject) => {
           this.database.selectFromTable(this.TABLE_NAME,[],{id_categorie:id_categorie,id_step:id_step })
           .then((resultSet)=>{
               const projects:Array<Project>=[];
               for(let i=0 ; i<resultSet.length ; i++){
                   projects.push(resultSet.item(i))
               }
               resolve(projects);
           }).catch(error=>{
               reject(error);
           });
   });
}
   getByCategorie(id_categorie:string):Promise<Array<Project>>{
        return new Promise((resolve, reject) => {
            this.database.selectFromTable(this.TABLE_NAME,[],{id_categorie:id_categorie})
            .then((resultSet)=>{
                const projects:Array<Project>=[];
                for(let i=0 ; i<resultSet.length ; i++){
                    projects.push(resultSet.item(i))
                }
                resolve(projects);
            }).catch(error=>{
                reject(error);
            });
    });
    }
    getStaffActivity(id_project:string){
        return new Promise((resolve, reject) => {
            this.database.selectFromTable(TABLES.Work.name,[],{})
            .then((resultSet)=>{
                const projects:Array<Project>=[];
                for(let i=0 ; i<resultSet.length ; i++){
                    projects.push(resultSet.item(i))
                }
                resolve(projects);
            }).catch(error=>{
                reject(error);
            });
    });
    }
     getAll():Promise<Array<Project>>{
         return new Promise((resolve, reject) => {
                this.database.selectFromTable(this.TABLE_NAME,[],{})
                .then((resultSet)=>{
                    const projects:Array<Project>=[];
                    for(let i=0 ; i<resultSet.length ; i++){
                        projects.push(resultSet.item(i))
                    }
                    resolve(projects);
                }).catch(error=>{
                    reject(error);
                });
        });
    }

}