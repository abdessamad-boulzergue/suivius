import { makeAutoObservable, runInAction } from "mobx"
import { Project } from "../database/dao/ProjectDao";
import { CableType, ConnectionType, EquipmentType, SiteType, StatusUpdateResponseDto, WorkDetails } from "../database/types";
import { dtoToProject } from "../services/mappers";
import { ArticleConsumesDto, ArticleDto, AuthorizationDto, BoqDto, ClientDto, IssueDto, LocalisationDto, ProjectDocumentsContent, ProjectDto, ReferenceDto, ReportDto, SquadDto, StaffDto, StepStatusDto, ToolDto, ToolUsageDto, TssDto, VendorDto, WorkInfoDto, documentContentDto, projectWorkDetailsDto } from "../services/types";
import DeviceInfo from "react-native-device-info";
import StepStatusDao from "../database/dao/StepStatusDao";

class ProjectObjectStore {
    
  
    
    projectsInCategorie :{[key:string]:Array<Project>} = {};

    cableTypes: CableType[] = [];
    vendors:VendorDto[]=[];
    siteTypes: SiteType[]  =  [];
    equipementTypes: EquipmentType[] = [];
    connectionTypes: ConnectionType[] = [];
    detailsWork: WorkDetails[]=[];
    projectsTss : {[key:number]:TssDto} = {}
    projectsLocalisaion : {[key:number]:LocalisationDto} = {}
    projectsReports : {[key:number]:ReportDto[]} = {}
    projectsIssues : {[key:number]:IssueDto[]} = []
    projectsDocumentForUser : {[key:number]:ProjectDocumentsContent} = {}
    projectsBOQ : {[key:number]:BoqDto[]} = {}
    projectsWorkDetails : {[key:number]:projectWorkDetailsDto[]} = {}
    private articles: ArticleDto[] = [];
    projectsAuthorization : {[key:number]:AuthorizationDto} = {}
    private staff:StaffDto[] =[];
    private tools:ToolDto[] =[];
     API_URL: string=" ";
     uniqueId :string = "";
     stepStatus:StepStatusDto[] = []
     clients: {[key:number]:ClientDto} ={}

    constructor() {
        makeAutoObservable(this);
        this.getUid();
    }
    async getUid(){
        this.uniqueId = await  DeviceInfo.getUniqueId();
    }
    setArticles(articles:  ArticleDto[]) {
       this.articles = articles;
      }
      
    getArticles( ) {
        return this.articles ;
       }
    getClient(project_id:number):ClientDto {
        return this.clients[project_id] ;
    }
    getProjectsDocument(projectId:number, type:string):documentContentDto[]{
        const docs = this.projectsDocumentForUser[projectId]
        if(docs && docs.documentsContent.length>0){
            return docs.documentsContent.filter(content=>content.type===type);
        }else
        return [];
    }
    setProjectsDocumentForUser(docContent: ProjectDocumentsContent[]) {
        console.log("projDoc ",docContent);
         docContent.forEach(docProj=>{
            this.projectsDocumentForUser[docProj.projectId] = docProj;
        })
      }
      
      dtoToWorkInfo(infos: WorkInfoDto[]) {
         if(infos)
           this.detailsWork= infos.map(info=>{
              return {id:info.id, title:info.title, value:""}
           })
      }
  
      setVendors(vendors:VendorDto[]){
        this.vendors =vendors;
      }
      getVendors():VendorDto[]{
        return this.vendors;
      }
      setReferences(references: ReferenceDto) {
        this.cableTypes = references.cableTypes;
        this.siteTypes = references.siteTypes;
        this.equipementTypes = references.equipmentTypes;
        this.connectionTypes = references.connectionTypes;
        this.staff = references.staff;
        this.articles = references.articles;
        this.tools = references.tools;
        this.stepStatus =references.stepStatus;
      }

    getStatus(id_status:number){
        return this.stepStatus.filter(status=>status.id ===id_status)[0]
    }
    setCableTypes(types:CableType[]){
        this.cableTypes =types;
    }
    setSiteTypes(types:SiteType[]){
        this.siteTypes =types;
    }
    setEquipementTypes(types:EquipmentType[]){
        this.equipementTypes =types;
    }
    setConnectionTypes(types:ConnectionType[]){
        this.connectionTypes =types;
    }
    getStaff(){
        return this.staff;
    }
    getTools(){
        return this.tools;
    }
    getProjectsSquad(project:Project,uid:string){
        return this.projectsReports[project.id].filter(report=>report.uid==uid)[0].squads || [];
    }
    getProjectsArticleConsumes(project:Project,uid:string){
        return this.projectsReports[project.id].filter(report=>report.uid==uid)[0].consumes || [];
    }
    setProjectsArticleConsumes(project:Project,uid:string,consumes:ArticleConsumesDto[]){
        const  index= this.projectsReports[project.id].findIndex(report=>report.uid==uid);
       if(index!==-1){
            this.projectsReports[project.id][index] = {
                ... this.projectsReports[project.id][index],
                consumes :consumes
            }
       }
    }
    getProjectsReport(project:Project,uid:string):ReportDto{
        return this.projectsReports[project.id].filter(report=>report.uid===uid)[0];
    }
    getProjectReports(project:Project){
        return this.projectsReports[project.id];
    }
    addProjectReport(project:Project,report:ReportDto){
        return this.projectsReports[project.id] = [
            ...this.projectsReports[project.id],
            report
        ];
    }
    setProjectsSquad(project: Project,uid:string, squad: SquadDto[]) {
       const  index= this.projectsReports[project.id].findIndex(report=>report.uid==uid);
       if(index!==-1){
        this.projectsReports[project.id][index] = {
            ... this.projectsReports[project.id][index],
            squads :squad
        }
       }
    }
    updateReport(project:Project,report:ReportDto){
       const index =  this.projectsReports[project.id]
           .findIndex(r=>r.uid==report.uid);

        if(index!=-1){
            console.log('report',"-######--, \n",report)
            this.projectsReports[project.id] = [
                ...this.projectsReports[project.id].slice(0,index),
                report,
                ...this.projectsReports[project.id].slice(index+1),
            ]
        }
    }
    getProjectsToolsUsage(project:Project,uid:string){
        return this.projectsReports[project.id].filter(report=>report.uid==uid)[0].usages || [];
    }
    getValidateReport(project:Project):ReportDto[]{
        return this.projectsReports[project.id]
                   .filter(report=>report.status ==="VALID")
    }
    getValidateBOQ(project:Project):BoqDto[]{
        const boqs : BoqDto[] =[];
         this.projectsReports[project.id]
                   .filter(report=>report.status ==="VALID")
                   .flatMap(report=>report.consumes)
                   .forEach(consume=>{
                      const index = boqs.findIndex(boq=>boq.articleId ===consume.articleId);
                        if(index===-1){
                            boqs.push({
                                articleId : consume.articleId,
                                quantity:consume.quantity,
                                title:consume.title,
                                unite:consume.unite
                            })
                        }else{
                            boqs[index].quantity += consume.quantity;
                        }
                   });
        return boqs;
    }

    getLeftBOQ(project:Project):BoqDto[]{
        const boqs : BoqDto[] =[];
        const projectBoq = this.getProjectsBOQ(project);
         this.projectsReports[project.id]
                   .flatMap(report=>report.consumes)
                   .forEach(consume=>{
                      const indexBoqProject = projectBoq.findIndex(boq=>boq.articleId ===consume.articleId);
                      const indexNewBoq = boqs.findIndex(boq=>boq.articleId ===consume.articleId);
                        if(indexBoqProject!=-1 && indexNewBoq===-1){
                            boqs.push({
                                articleId : consume.articleId,
                                quantity:projectBoq[indexBoqProject].quantity-consume.quantity,
                                title:consume.title,
                                unite:consume.unite
                            })
                        }
                        if(indexBoqProject!==-1 && indexNewBoq!==-1){
                            boqs[indexNewBoq].quantity -= consume.quantity;
                        }
                   });
        return boqs;
    }

    setProjectsToolsUsage(project:Project,uid:string,usages:ToolUsageDto[] ){
        const  index= this.projectsReports[project.id].findIndex(report=>report.uid==uid);
        if(index!==-1){
         this.projectsReports[project.id][index] = {
             ... this.projectsReports[project.id][index],
             usages :usages
         }
        }
    }
    getProjectTss(project:Project){
        
        console.log(project.id, '\n', this.projectsTss)

        return this.projectsTss[project.id];
    }
    setProjectTss(project:Project,tss:TssDto){
        return this.projectsTss[project.id]=tss;
    }
    getProjectLocalisation(project:Project){
        return this.projectsLocalisaion[project.id];
    }
    getProjectsBOQ(project:Project){
        return this.projectsBOQ[project.id] || [];
    }
    addProjectsBOQ(project:Project, boq:BoqDto){
        const idx = this.projectsBOQ[project.id].findIndex(b => b.articleId == boq.articleId );
        console.log("idx : ", idx,+" \n ", this.projectsBOQ[project.id],"\n",boq)
        if(idx!==-1){
            this.projectsBOQ[project.id] = [
                ...this.projectsBOQ[project.id].slice(0,idx),
                boq,
                ...this.projectsBOQ[project.id].slice(idx+1)
            ]
        }else{
            this.projectsBOQ[project.id] = [
                ...this.projectsBOQ[project.id],
                boq
            ]
        }

        console.log("\n \n after  : ", idx,+" \n ", this.projectsBOQ[project.id],"\n",boq)
    } 
    getProjectsWorkDetails(project:Project){
        return this.projectsWorkDetails[project.id] || [];
    }
    getProjectsAuthorization(project:Project){
        console.log("getProjectsAuthorization -------------\n",this.projectsAuthorization," \n----------------",project.id)

        return this.projectsAuthorization[project.id] || {};
    }
    setProjectAuthorization(project_id: number, autoriz: AuthorizationDto) {
        console.log("setProjectAuthorization -------------\n",autoriz," \n----------------",project_id)
        this.projectsAuthorization[project_id] =autoriz;
    }

    getProject(project_id:number):Project{
        return Object.keys(this.projectsInCategorie)
                    .flatMap(key=>this.projectsInCategorie[key])
                    .filter(prj=>prj.id===project_id)[0];
    }
    setProjectsWorkDetails(project:Project,workInfo:WorkDetails,newValue:string){
        const idx= this.projectsWorkDetails[project.id].findIndex(info=>info.infoId===workInfo.id);
        console.log(newValue,idx,workInfo);
        let  newProjWorkDetails:projectWorkDetailsDto = {infoId:workInfo.id,title:workInfo.title, value:newValue}
        if(idx!=-1){
             newProjWorkDetails = {...this.projectsWorkDetails[project.id][idx], value:newValue}
        } 
        this.projectsWorkDetails[project.id]= [
            ...this.projectsWorkDetails[project.id].slice(0,idx),
            newProjWorkDetails,
            ...this.projectsWorkDetails[project.id].slice(idx+1),
        ]
    }
    setProjects(categorie:string,projects:Array<Project>) {
        projects.forEach(p=>console.log(p.title))
        this.projectsInCategorie[categorie] = projects;
    }
    isProjectHaveIssues(project_id:number, status_id:number):boolean{
        return this.getProjectIssues(project_id,status_id).length>0
    }
    addProjectIssue(project_id:number,issue:IssueDto){
        this.projectsIssues[project_id] =[...this.projectsIssues[project_id], issue];
    }
    getProjectIssues(project_id:number,id_status?:number):IssueDto[]{
        const issues =  this.projectsIssues[project_id] || [];
        return issues.filter(issue=>issue.stepStatusId ===id_status);
    }
    setProjectsDto(projectsDto:Array<ProjectDto>) {
        runInAction(()=>{
            this.projectsInCategorie = {};
            projectsDto.forEach(dto=>{
                console.log("dto.authorization -------------\n",dto.authorization," \n----------------",dto.authorization)

                this.projectsTss[dto.id] = dto.tss;
                this.projectsBOQ[dto.id] = dto.boq
                this.projectsWorkDetails[dto.id] = dto.workDetails
                this.projectsLocalisaion[dto.id] = dto.localisation;
                this.projectsReports[dto.id] = dto.reports;
                this.clients[dto.id] = dto.client;
                this.setProjectAuthorization(dto.id,dto.authorization);
                this.projectsIssues[dto.id]= dto.issues? dto.issues.filter(issue=>!issue.isClosed) :[];
                 if(this.projectsInCategorie[dto.category.id.toString()]){
                     
                     this.projectsInCategorie[dto.category.id.toString()].push(dtoToProject(dto))
                 }else{
                     this.projectsInCategorie[dto.category.id.toString()]=[dtoToProject(dto)]
                 }
             })
        })
        
    }
    getCategorie(id_step:number,categorie:string){
        const projects = this.projectsInCategorie[categorie] || [];
        if(id_step>0)
            return projects.filter(p=>p.id_step===id_step)
        else
          return projects;
    }

     getProjectUpdate(currentProject:Project,response:StatusUpdateResponseDto) :Project{
        return {...currentProject , 
            stepStatus:{id:response.stepStatusId,title:response.stepStatusTitle} ,
            id_step_status:response.stepStatusId,
            id_step:response.stepId,
            step:{id:response.stepId,title:response.stepTitle}
        }
    }
    updateProject(project:Project) {

        const projects = this.projectsInCategorie[project.id_categorie.toString()]
        const index = projects.findIndex(proj => proj.id === project.id);
        if(index > -1){
            // to make sure mobx picks up the change.
            this.projectsInCategorie[project.id_categorie.toString()] = [
                ...projects.slice(0, index),
                project,
                ...projects.slice(index + 1),
            ];
        }
    }
}

export const projectObjectStore = new ProjectObjectStore();