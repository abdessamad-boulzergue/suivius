import Database, { ProjectRepository } from "..";

export interface Project{
    title:string,
    description:string,
    debut_reel:Date,
    fin_reel:Date,
    debut_estime:Date,
    fin_estime:Date
}

export default class ProjectDao {
    private  TABLE_NAME = 'PROJECT'

    constructor(private database :Database){}

    findById(id:string){
       
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
                       const  {title,description,debut_estime,debut_reel,fin_estime,fin_reel} = resultSet.item(i);
                       projects.push({ 
                           title,description,debut_estime,debut_reel,fin_estime,fin_reel
                       })
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
                   const  {title,description,debut_estime,debut_reel,fin_estime,fin_reel} = resultSet.item(i);
                   projects.push({ 
                       title,description,debut_estime,debut_reel,fin_estime,fin_reel
                   })
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
                   const  {title,description,debut_estime,debut_reel,fin_estime,fin_reel} = resultSet.item(i);
                   projects.push({ 
                       title,description,debut_estime,debut_reel,fin_estime,fin_reel
                   })
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
                        const  {title,description,debut_estime,debut_reel,fin_estime,fin_reel} = resultSet.item(i);
                        projects.push({ 
                            title,description,debut_estime,debut_reel,fin_estime,fin_reel
                        })
                    }
                    resolve(projects);
                }).catch(error=>{
                    reject(error);
                });
        });
    }

}