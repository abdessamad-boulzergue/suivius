import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";
import {StepUserPermission, SuiviePermission, User} from '../types'
import { RootDaoStore} from "../../stores/daoStores";


export default class UserDao {
    constructor(private database :Database, private doasStore: RootDaoStore){}

    getStepsPermissions(id_user:number):Promise<Array<SuiviePermission>>{
        return new Promise((resolve, reject) => {
            this.database.selectFromTable(TABLES.StepUserPermission.name,[],{id_user:id_user})
            .then(async (resultSet)=>{
                if(resultSet.length>0 ){
                    const permisions:Array<SuiviePermission> = [];
                     for(let i=0; i<resultSet.length; i++){
                        const stepPerm:StepUserPermission= resultSet.item(i)
                        const step = await this.doasStore.stepDao.getById(stepPerm.id_step)
                        const index = permisions.findIndex(p=>step && p.step.id===step.id)
                        if(index===-1 ){
                            if(step)
                                permisions.push({
                                    step : step,
                                    id_project:stepPerm.id_project,
                                    permissions:[stepPerm.permission]
                                })
                        }else{
                            permisions[index].permissions.push(stepPerm.permission)
                        }
                        
                    }
                    resolve(permisions);
                }
                resolve([]);
            }).catch(error=>{
                reject(error);
            });
    });
    }
    getUserByName(username:string):Promise<User|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.User.name,[],{username:username})
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
}