import { format } from "date-fns";
import Database, { ProjectRepository } from "..";
import { API_URL } from "../../config";
import { DOC_TYPES, SIMPLE_DATE_FORMAT } from "../../constants";
import { httpDelete, httpGet, httpPost, httpPut, sendFileToServer } from "../../network/httpService";
import { RootStore } from "../../stores/context";
import { DocumentProject, StatusUpdateResponseDto, Step } from "../types";
import { TABLES } from "./constants";
import { Tss } from "./TssDao";
import RNFS from 'react-native-fs';
import { uploadFiles } from "../../utils/uploadFiles";
import { Article } from "./ArticleDao";
import { ArticleConsume } from "./ArticleConsumeDao";
import { ArticleConsumesDto, AuthorizationDto, BoqDto, IssueDto, ReportDto, SquadDto, StepStatusDto, ToolUsageDto } from "../../services/types";
import { projectObjectStore } from "../../stores/objectsStore";
import { asyncStorageGetItem } from "../../utils/cache/storage";

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
    id_step_status:number,
    id_tss:number | null;
    step?:Step,
    stepStatus?:StepStatusDto
}
const stepStatusFLow : {[key:string]:any}={
    "1":{previous:()=>null,next:()=>2 ,step:1},
    "2":{ previous:()=>1, next:()=>3,step:1},
    "3":{ previous:()=>2, next:()=>4,step:1},
    "4":{ previous:()=>3, next:()=>5,step:1},
    "5":{ previous:()=>4, next:()=>6,step:1},
    "6":{ previous:()=>5, next:()=>7,step:1},
    "7":{ previous:()=>6, next:()=>8,step:1},
    "8":{ previous:()=>7, next:()=>9,step:1},
    "9":{ previous:()=>8, next:()=>3,step:1},
    "x":{ previous:(get:()=>{})=>get(), next:(get:()=>{})=>get(),step:2}
}
export default class ProjectDao {

    constructor(private database :Database,private stores: RootStore){}

    findById(id:number):Promise<Project|null>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.PROJECT.name,[],{id:id})
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
   setTssId(id_project:number,id_tss :number):Promise<Project>{
    return new Promise(async (resolve, reject) => {
        const project= await this.findById(id_project);
        if(project){
            this.database.update(TABLES.PROJECT.name,{
                   id_tss:id_tss,
                },{
                    id:project.id
                }).then(result=>{
                    resolve(project)
                }).catch(error=>{
                    reject(error)
                })
            
        }
    })
   }
  nextStep(id:number):Promise<Project>{
        return new Promise(async (resolve, reject) => {
            const project= await this.findById(id);
            if(project){
                const nextStepStatus= stepStatusFLow[project.id_step_status].next();
                const step_id = stepStatusFLow[nextStepStatus].step;
                project.id_step = step_id
                project.id_step_status=nextStepStatus
                this.database.update(TABLES.PROJECT.name,{
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
        })
    }
    toStepStatus(id_status:number,id_project:number):Promise<Project>{
        return new Promise(async (resolve, reject) => {
            const project= await this.findById(id_project);
            if(project){
               // const nextStepStatus= stepStatusFLow[project.id_step_status].next();
                const step_id = stepStatusFLow[id_status].step;
                project.id_step = step_id
                project.id_step_status=id_status
                this.database.update(TABLES.PROJECT.name,{
                        id_step:project.id_step,
                        id_step_status:project.id_step_status
                    },{
                        id:project.id
                    }).then(result=>{
                        resolve({...project})
                    }).catch(error=>{
                        reject(error)
                    })
                
            }
        })
    }
    projectDao(){
        return {
            
            delete : (id:string)=> {
                let ids =new Map();
                ids.set("ID",id);
                return this.database.deleteFromTable(TABLES.PROJECT.name,ids);
            },
            insert : (prod : Map<string,string>) => {
                if (prod) {
                    var args =new Array<string>();
                    const values = Object.keys(prod)
                        .map((key)=> {
                            args.push(prod.get(key)!);
                            return '?'
                        }).join(',');

                    const query = 'INSERT INTO '+TABLES.PROJECT.name+' VALUES ('+ values +')';
                    return this.database.executeQuery(query, args);
                }
                return new Promise((resolve ,reject) => { reject('inserted entity is not defined');});;
            }
        }
    }
  
    getByStep(id_step:string):Promise<Array<Project>>{
        return new Promise((resolve, reject) => {
               this.database.selectFromTable(TABLES.PROJECT.name,[],{id_step:id_step})
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
            this.database.selectFromTable(TABLES.PROJECT.name,[],{id_categorie:id_categorie,id_step:id_step })
            .then(async (resultSet)=>{
                const projects:Array<Project>=[];
                for(let i=0 ; i<resultSet.length ; i++){
                    const project:Project = resultSet.item(i);
                    const step =await this.stores.daoStores.stepDao.getById(project.id_step)  || undefined  
                    projects.push({...project,step:step})
                }
                resolve(projects);
            }).catch(error=>{
                reject(error);
            });
        });
    }
    getForUserByStepAndCategorie(id_user:number,id_step:string,id_categorie:string):Promise<Array<Project>>{
        return new Promise((resolve, reject) => {
            this.database.selectFromTable(TABLES.ProjectAffectation.name,[],{id_user:id_user})
            .then(async(resultSet)=>{
                const projects:Array<Project>=[];
                for(let i=0 ; i<resultSet.length ; i++){
                    const {id_project} = resultSet.item(0);
                    const rs = await  this.database.selectFromTable(TABLES.PROJECT.name,[],{id :id_project, id_step:id_step,id_categorie:id_categorie});
                    if(rs.length>0){
                        const project:Project = rs.item(0);
                        const step =await this.stores.daoStores.stepDao.getById(project.id_step)  || undefined  
                        projects.push({...project,step:step})
                    }
                }
                resolve(projects);
            }).catch(error=>{
                reject(error);
            });
    });
    }
    getForUserByCategorie(id_user:number,id_categorie:string):Promise<Array<Project>>{
        return new Promise((resolve, reject) => {
            this.database.selectFromTable(TABLES.ProjectAffectation.name,[],{id_user:id_user})
            .then(async(resultSet)=>{
                const projects:Array<Project>=[];
                for(let i=0 ; i<resultSet.length ; i++){
                    let {id_project} = resultSet.item(i);
                    const rs = await  this.database.selectFromTable(TABLES.PROJECT.name,[],{id :id_project, id_categorie:id_categorie});
                    if(rs.length>0){
                        const project:Project = rs.item(0);
                        const step =await this.stores.daoStores.stepDao.getById(project.id_step)  || undefined  
                        projects.push({...project,step:step})
                    }
                }
                resolve(projects);
            }).catch(error=>{
                reject(error);
            });
    });
    }
    insert(project:any){
        this.database.insert(TABLES.PROJECT.name,project)
    }
    preValidateTss(project:Project):Promise<StatusUpdateResponseDto>{
        
        return new Promise(async (resolve, reject) => {
            const tss :Tss|null= await this.stores.daoStores.tssDao.getById(project.id)
            const projectWorkDetailsDb = await this.stores.daoStores.projectWorkDetailsDao.getByIdProject(project.id)
            const projectWorkDetailsDto = projectWorkDetailsDb.map(wdt=>{
                return {workInfoId:wdt.id_info,value:wdt.value}
            });
            if(tss){
                const tssDto:any={
                     cableTypeId:tss.cableType,
                     siteTypeId:tss.siteType,
                     connectionTypeId:tss.connectionType,
                     equipmentTypeId:tss.equipmentType,
                     workDetails:projectWorkDetailsDto
                }
                const response = await httpPost<StatusUpdateResponseDto>( API_URL.preValidateTss(project.id),tssDto)
   
                resolve(response.data);

            }
        })
    }
    async addIssue(project_id:number, status_id:number, description:string):Promise<IssueDto>{
        const token: string = await asyncStorageGetItem("userToken");

        return new Promise(async (resolve, reject) => {
             const response = await httpPost<IssueDto>( API_URL.issues(project_id),{stepStatusId:status_id,description:description},token)
             resolve(response.data);
        })
    }
    async endIssue(project_id:number){
        await httpPut( API_URL.issues(project_id),{});
    }
    validateTss(project:Project):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
                const response = await httpPost<StatusUpdateResponseDto>( API_URL.validateTss(project.id),{})  
                resolve(response.data);
        })
    }
    endActivity(project:Project):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
                const response = await httpPost<StatusUpdateResponseDto>( API_URL.endActivity(project.id),{})  
                resolve(response.data);
        })
    }
    validateAPD(project:Project):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
            const response =   await httpPost<StatusUpdateResponseDto>( API_URL.validateAPD(project.id),{})  
            resolve(response.data);
        })
    }
    startStudy(project_id:number):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<StatusUpdateResponseDto>( API_URL.startStudy(project_id),{
                deviceId : projectObjectStore.uniqueId
            })  
            resolve(dto.data);
    })
    }
    startTssEditionEdition(project_id:number, position:{latitude:number,longitude:number}):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<StatusUpdateResponseDto>( API_URL.startTss(project_id),{
                deviceId : projectObjectStore.uniqueId,
                ...position
            }) 
            resolve(dto.data);
    })
    }
    async validateReport(project_id:number,uid:string):Promise<ReportDto>{
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<ReportDto>( API_URL.validateReport(project_id,uid),{ }) 
            resolve(dto.data);
        })
    }
   async  sendToolUsage(project_id:number,report:ReportDto,usages:ToolUsageDto[]){
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<StatusUpdateResponseDto>( API_URL.toolUsage(project_id),{
                deviceId : projectObjectStore.uniqueId,
                report:{
                    ...report,
                    usages : usages
                }
            }) 
            resolve(dto.data);
        })
    }
    async sendReport(project_id:number,report:ReportDto):Promise<StatusUpdateResponseDto>{
        console.log("sendReport", project_id, report)
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<StatusUpdateResponseDto>( API_URL.workReport(project_id),{
                deviceId : projectObjectStore.uniqueId,
                report : report
            })
            resolve(dto.data);
        })
    }
    async sendArticleConsume(project_id:number,report:ReportDto,articleConsume:ArticleConsumesDto[]){
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<StatusUpdateResponseDto>( API_URL.articleConsume(project_id),{
                deviceId : projectObjectStore.uniqueId,
                report:{
                        ...report,
                        consumes : articleConsume
                    }
            })
            resolve(dto.data);
        })
    }
    async sendSquadWork(project_id:number,report:ReportDto,squadWork:SquadDto[]){
        console.log("sendSquadWork", project_id, squadWork)
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<StatusUpdateResponseDto>( API_URL.staffWork(project_id),{
                deviceId : projectObjectStore.uniqueId,
                report:{
                    ...report,
                    squads : squadWork
                }
            })
            resolve(dto.data);
        })
    }
    async  sendAuthorize(project_id:number,authorize:AuthorizationDto ):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
            const dto = await httpPost<StatusUpdateResponseDto>( API_URL.authorization(project_id),authorize)  
            resolve(dto.data);
        })
    }

    preValidateAPD(project:Project):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
            const response = await httpPost<StatusUpdateResponseDto>( API_URL.preValidateAPD(project.id),{})  
                resolve(response.data);
        })
    }
    rejectTSS(project:Project, motif:string):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
           const response =await httpPost<StatusUpdateResponseDto>( API_URL.rejectTss(project.id),{motif:motif})   
         resolve(response.data);

        })
    }
    rejectAPD(project:Project,motif:string):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
            const response =await httpPost<StatusUpdateResponseDto>( API_URL.rejectApd(project.id),{motif:motif})   
            resolve(response.data);

        })
    }

    sendAPD(project:Project):Promise<StatusUpdateResponseDto>{

        return new Promise(async (resolve, reject) => {

            const docs = await this.stores.daoStores.documentDao.getByIdProject(project.id)
            const formDataImg = new FormData();
             docs.filter(doc=>doc.type===DOC_TYPES.APD).forEach(async (doc:DocumentProject)=>{
               const fileData = { name: doc.document.name,  type: doc.document.type, uri: doc.document.path}
                formDataImg.append('files', fileData);
            })

            const consumes :ArticleConsume[]= await this.stores.daoStores.articleConsumeDao.getByIdProject(project.id)
            const details :BoqDto[] = consumes.map(cons=>{
                return {articleId:cons.id_article , quantity:cons.quantity,unite:"",title:""}
            })
            if(formDataImg.getParts().length>0){
                const data = await sendFileToServer(API_URL.documents(DOC_TYPES.APD,project.id),formDataImg)
            }
           
            const response =  await httpPost<StatusUpdateResponseDto>( API_URL.boq(project.id),{details:details})  

            resolve(response.data);     
         })
    }
    syncTss(project:Project):Promise<StatusUpdateResponseDto>{
        return new Promise(async (resolve, reject) => {
            const tss  = await this.stores.daoStores.tssDao.getById(project.id)
            const docs = await this.stores.daoStores.documentDao.getByIdProject(project.id)
            const projectWorkDetailsDb = await this.stores.daoStores.projectWorkDetailsDao.getByIdProject(project.id)
            const projectWorkDetailsDto = projectWorkDetailsDb.map(wdt=>{
                return {workInfoId:wdt.id_info,value:wdt.value}
            });
            const formDataCroquis = new FormData();
            const formDataImg = new FormData();
             docs.forEach(async (doc:DocumentProject)=>{
                 const fileData = { name: doc.document.name,  type: doc.document.type, uri: doc.document.path}
                if(doc.type===DOC_TYPES.CROQUIS)
                    formDataCroquis.append('files', fileData);
                else if(doc.type===DOC_TYPES.TSS_IMAGE)
                    formDataImg.append('files', fileData);
            })
            if(tss){
                const tssDto:any={
                     cableTypeId:tss.cableType,
                     siteTypeId:tss.siteType,
                     connectionTypeId:tss.connectionType,
                     equipmentTypeId:tss.equipmentType,
                     workDetails:projectWorkDetailsDto
                }                
                if(formDataCroquis.getParts().length>0){
                    const data = await sendFileToServer(API_URL.documents(DOC_TYPES.CROQUIS,project.id),formDataCroquis)
                }
                if(formDataImg.getParts().length>0){
                    const data = await sendFileToServer(API_URL.documents(DOC_TYPES.TSS_IMAGE,project.id),formDataImg)
                }

               const tssResponse = await httpPost<StatusUpdateResponseDto>( API_URL.tss(project.id),tssDto)

                resolve(tssResponse.data);

            }
        })
    }
    getAllProjects():Promise<Array<Project>>{
        return new Promise((resolve, reject) => {
         httpGet<Array<any>>(this.stores.apiStore.defaultUrl + API_URL.getProjects())
         .then(data=>{
            if(data)
               data.forEach(({category,step,stepStatus,id,title})=>{
                this.database.insert(TABLES.PROJECT.name,{
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
         })
        })
    }
   getByCategorie(id_categorie:string):Promise<Array<Project>>{
        return new Promise((resolve, reject) => {
            this.database.selectFromTable(TABLES.PROJECT.name,[],{id_categorie:id_categorie})
            .then(async (resultSet)=>{
                const projects:Array<Project>=[];
                for(let i=0 ; i<resultSet.length ; i++){
                    const project:Project = resultSet.item(i);
                    const step =await this.stores.daoStores.stepDao.getById(project.id_step)  || undefined  
                    projects.push({...project,step:step})
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
                this.database.selectFromTable(TABLES.PROJECT.name,[],{})
                .then(async(resultSet)=>{
                    const projects:Array<Project>=[];
                    for(let i=0 ; i<resultSet.length ; i++){
                        const project:Project = resultSet.item(i);
                        const step =await this.stores.daoStores.stepDao.getById(project.id_step)  || undefined  
                        projects.push({...project,step:step})
                    }
                    resolve(projects);
                }).catch(error=>{
                    reject(error);
                });
        });
    }

}