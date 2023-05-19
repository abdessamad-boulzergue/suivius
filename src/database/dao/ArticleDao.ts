import Database, { ProjectRepository } from "..";

export interface Article{
    id:number,
    title:string
}

export default class ArticleDao {
    private  TABLE_NAME = 'Article'
    
    constructor(private database :Database){}

     getById(id:number):Promise<Article|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id:id})
               .then((resultSet)=>{
                   if(resultSet.length>0 ){
                        const article = resultSet.item(0);
                        resolve(article);
                   }
                   resolve(null);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}