import { format } from "date-fns"
import { API_ROOT_URL, API_URL } from "../config"
import { SIMPLE_DATE_FORMAT } from "../constants"
import { Project } from "../database/dao/ProjectDao"
import { httpGet } from "../network/httpService"
import { useDao, useStores } from "../stores/context"
import { ArticleDto, PermissionDto, ProjectDocumentsContent, ProjectDto, ReferenceDto, SquadDto, StaffDto, ToolUsageDto, WorkInfoDto } from "./types"



 const XLoadProjects=():Promise<Array<Project>>=>{
        const {apiStore,loginStore} = useStores();
        const {projectDao} = useDao();
        return new Promise((resolve, reject) => {
         httpGet<Array<any>>(apiStore.defaultUrl + API_URL.getProjects,  loginStore.userToken)
         .then(data=>{
            if(data){
                data.forEach(({category,step,stepStatus,id,title})=>{
                    projectDao.insert({
                        id_categorie : category.id,
                        id_step: step.id,
                        id_step_status:stepStatus.id,
                        title:title,
                        id:id,
                        debut_estime: format(new Date(),SIMPLE_DATE_FORMAT),
                        debut_reel:format(new Date(),SIMPLE_DATE_FORMAT),
                        description:"",
                        fin_estime:format(new Date(),SIMPLE_DATE_FORMAT),
                        fin_reel:format(new Date(),SIMPLE_DATE_FORMAT),
                        id_client:1,
                    
                    })
                })
            }
         })
        })
    }



 export const loadProjects=():Promise<void | ProjectDto[]>=>{
         return httpGet<Array<ProjectDto>>(API_URL.getProjects(),  "")
 }

 export const loadUserProjects=(user_id:any):Promise<void | ProjectDto[]>=>{
    return httpGet<Array<ProjectDto>>( API_URL.getUserProjects(user_id),  "")
}

export const loadUserPermissions=(user_id:any):Promise<void | PermissionDto[]>=>{
    return httpGet<PermissionDto[]>(API_URL.getUserPermissions(user_id),  "")
}

export const loadReferences=():Promise<void | ReferenceDto>=>{
    return httpGet<ReferenceDto>(API_URL.references(),  "")
}
export const loadStaff=():Promise<void | StaffDto>=>{
    return httpGet<StaffDto>(API_URL.staff(),  "")
}

export const loadSquad=(project_id:number):Promise<void | SquadDto>=>{
    return httpGet<SquadDto>(API_URL.squad(project_id),  "")
}

export const loadToolsUsage=(project_id:number):Promise<void | ToolUsageDto>=>{
    return httpGet<ToolUsageDto>(API_URL.toolUsage(project_id),  "")
}


export const loadWorkInfos=():Promise<void |WorkInfoDto[]>=>{
    return httpGet<WorkInfoDto[]>(API_URL.workInfo(),  "")
}

export const loadProjectsDocumentForUser=(user_id:number):Promise<void |ProjectDocumentsContent[]>=>{
    return httpGet<ProjectDocumentsContent[]>(API_URL.projectsDocumentsContentForUser(user_id),  "")
}

export const loadArticles=( ):Promise<void |ArticleDto[]>=>{
    return httpGet<ArticleDto[]>(API_URL.articles(),  "")
}
