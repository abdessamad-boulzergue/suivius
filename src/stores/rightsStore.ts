import { makeAutoObservable } from "mobx";
import { ETUDE_STATUS, ROUTES } from "../constants";
import { Project } from "../database/dao/ProjectDao";
import { Step, SuiviePermission, User, UserPermission } from "../database/types";
import { RootStore } from "./context";

export class RightsStore {

    stores: RootStore;
    currentUser! : User

    private permissions!:Array<SuiviePermission>

    constructor(stores: RootStore) {
        makeAutoObservable(this);
        this.stores = stores;
        this.permissions=[];
    }

    addPermission(step:Step,permission:UserPermission){
        this.permissions.filter(p=>p.step.id===step.id)
        .forEach(p=>p.permissions.push(permission));
    }
    hasPermission(id_step:number,id_project:number, permission:UserPermission):boolean{
        console.log("----permission----- \n",id_step,id_project,permission, this.permissions,"--------")
        return this.permissions
                   .filter(p=>{
                    return p.step.id===id_step && p.id_project ===id_project
                   })
                    .find(p=>{
                        return p.permissions.indexOf(permission)!=-1
                    })!=undefined
    }
    hasPermissionOnProject(project:Project, permission:UserPermission):boolean{
        return this.permissions
                   .filter(p=>{
                    return p.step.id===project.id_step && p.id_project ===project.id
                   })
                    .find(p=>{
                        return p.permissions.indexOf(permission)!=-1
                    })!=undefined
    }
    setPermissions(permissions:Array<SuiviePermission>){

        this.permissions = permissions;
    }

    setUser(currentUser : User){
        this.currentUser = currentUser;
    }

    getRouteForStatus(id_status:number){
        if(id_status===1)
            return ROUTES.PROJECT_LOCALISATION;
        if(id_status===2)
            return ROUTES.PROJECT_LOCALISATION;
        else if(id_status===ETUDE_STATUS.EDITION_TSS)
           return ROUTES.ETUDE_REPORT_SCREEN;
        else if(id_status===ETUDE_STATUS.MAJ_TSS)
           return ROUTES.ETUDE_REPORT_SCREEN;
        else if(id_status===4)
           return ROUTES.ETUDE_REPORT_SCREEN;
        else if(id_status===5)
           return ROUTES.ETUDE_REPORT_SCREEN;
        else if(id_status===6)
           return ROUTES.ACTIVITY_REPORT;
        else if(id_status===7)
           return ROUTES.ACTIVITY_REPORT;
        else if(id_status===8)
           return ROUTES.ACTIVITY_REPORT;
        else if(id_status===9)
           return ROUTES.ACTIVITY_REPORT;
        else if(id_status===10)
           return ROUTES.ACTIVITY_REPORT;
        else if(id_status===11)
           return ROUTES.WORK_TOOLS;
           else
            return ""
    }
    caneValidateStatus (id_step_status:number){
        console.log("caneEditStatus > >>>>>>",id_step_status)
        if([5].indexOf(id_step_status)!==-1)
         return false
        else
          true;
    }
    
    caneEditStatus(id_step_status:number){
        console.log("caneEditStatus > >>>>>>",id_step_status)
        if([1,2,3].indexOf(id_step_status)!==-1)
         return true
        else
          false;
    }
    


}