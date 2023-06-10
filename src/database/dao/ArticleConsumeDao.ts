import Database, { ProjectRepository } from "..";
import ArticleDao, { Article } from "./ArticleDao";

export interface ArticleConsume{
    id_project:number,
    id_article:number,
    quantity:number,
    article?:Article | null
}

export default class ArticleConsumeDao {
    private  TABLE_NAME = 'ArticleConsume'
    
    constructor(private database :Database , private articleDao:ArticleDao){
    }
   async updateQuantity(id_project:number ,id_article:number, quantity:number){

      const consume= await this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project,id_article:id_article});
      if(consume.length!=0){
            this.database.update(this.TABLE_NAME,{quantity:quantity},{id_project:id_project,id_article:id_article})
            .then(result=>{
            }).catch(err=>{
                console.error(err);
            })
        }
      else{
        await this.database.insert(this.TABLE_NAME,{id_project:id_project,id_article:id_article,quantity:quantity})
      }
    }
    getByIdProject(id_project:number):Promise<Array<ArticleConsume>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then( async (resultSet)=>{
                   const consumes:Array<ArticleConsume>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id_project,id_article,quantity} = resultSet.item(i);
                       const article:Article|null =  await this.articleDao.getById(id_article)
                       consumes.push({id_project,id_article,quantity,article:article})
                   }
                   resolve(consumes);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}