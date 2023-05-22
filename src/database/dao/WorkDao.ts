import { parse } from "date-fns";
import Database, { ProjectRepository } from "..";
import { TABLES } from "./constants";
import StaffDao, { StaffMember } from "./StaffDao";

export interface Work{
    id_project:number,
    id_staff:number,
    nbr_hour:string,
    nbr_add_hour:string,
    staff:StaffMember | null
}

export default class WorkDao {
    private  TABLE_NAME = 'WORK'
    constructor(private database :Database, private staffDao:StaffDao){}

    findById(id:string){
       
    }
    add(work:Work):Promise<number>{
        return new Promise((resolve, reject) => {

        this.database.insert(this.TABLE_NAME,{
            id_project:work.id_project,
            id_staff: work.id_staff,
            nbr_add_hour: work.nbr_add_hour,
            nbr_hour: work.nbr_hour
        })
        .then(result=>{
          resolve(result.length);
        }).catch(err=>{
           reject(err);
        })
    })
    }
    updateDate(id_project:number ,id_staff:number, fileds:{}){
        this.database.update(this.TABLE_NAME,fileds,{id_project:id_project,id_staff:id_staff})
        .then(result=>{
            console.log("update : ", result);
        }).catch(err=>{
            console.error(err);
        })
    }
    getByIdProject(id_project:number):Promise<Array<Work>>{
        console.log(" GET PROJE" , id_project)
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(this.TABLE_NAME,[],{id_project:id_project})
               .then(async (resultSet)=>{
                   const staffWork:Array<Work>=[];
                   for(let i=0 ; i<resultSet.length ; i++){
                       const  {id_project,id_staff,nbr_add_hour,nbr_hour} = resultSet.item(i);
                       const staff = await this.staffDao.getById(id_staff)
                       staffWork.push({id_project,id_staff,nbr_add_hour,nbr_hour,staff})
                   }
                   resolve(staffWork);
               }).catch(error=>{
                   reject(error);
               });
       });
   }
}