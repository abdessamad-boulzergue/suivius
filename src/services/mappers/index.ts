import { parse } from "date-fns";
import { Project } from "../../database/dao/ProjectDao";
import { SuiviePermission } from "../../database/types";
import { PermissionDto, ProjectDto } from "../types";
import { SIMPLE_DATE_FORMAT } from "../../constants";

export const projectToDto=(project:Project):ProjectDto| null =>{
    return null
}

export const dtosToSuiviePermission=(dtos:Array<PermissionDto>):SuiviePermission[] =>{
    const suiviePermissions:SuiviePermission[] =[];

    dtos.forEach(dto=>{
        const index  = suiviePermissions.findIndex(sp=>sp.step.id == dto.idStep && sp.id_project ==dto.idProject );
        if(index===-1){
            suiviePermissions.push({
                step:{id:dto.idStep,title:""},
                id_project:dto.idProject,
                permissions:[dto.permission]
            })
        }else{
            suiviePermissions[index].permissions.push(dto.permission)
        }
    })

    return suiviePermissions;
}
export const dtoToProject=(dto:ProjectDto):Project =>{
    return {
        id:dto.id,
        id_categorie :dto.category.id,
        id_step:dto.step.id,
        id_step_status:dto.stepStatus.id,
        title:dto.title,
        description:'',
        debut_estime:parse(dto.estimateStart,SIMPLE_DATE_FORMAT,new Date()),
        debut_reel:new Date(),
        fin_estime:parse(dto.estimateEnd,SIMPLE_DATE_FORMAT,new Date()),
        fin_reel:new Date(),
        id_tss:null,
        stepStatus:dto.stepStatus,
        step:dto.step
    }
}