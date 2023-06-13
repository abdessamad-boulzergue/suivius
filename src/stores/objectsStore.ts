import { makeAutoObservable, runInAction } from "mobx"
import { Project } from "../database/dao/ProjectDao";
import { CableType, ConnectionType, EquipmentType, SiteType, WorkDetails } from "../database/types";
import { dtoToProject } from "../services/mappers";
import { ArticleDto, AuthorizationDto, BoqDto, IssueDto, LocalisationDto, ProjectDocumentsContent, ProjectDto, ReferenceDto, SquadDto, StaffDto, ToolDto, ToolUsageDto, TssDto, WorkInfoDto, documentContentDto, projectWorkDetailsDto } from "../services/types";
import DeviceInfo from "react-native-device-info";

class ProjectObjectStore {
    
  
    
    projectsInCategorie :{[key:string]:Array<Project>} = {};

    cableTypes: CableType[] = [];
    siteTypes: SiteType[]  =  [];
    equipementTypes: EquipmentType[] = [];
    connectionTypes: ConnectionType[] = [];
    detailsWork: WorkDetails[]=[];
    projectsTss : {[key:number]:TssDto} = {}
    projectsLocalisaion : {[key:number]:LocalisationDto} = {}
    projectsSquad : {[key:number]:SquadDto[]} = {}
    projectsToolsUsage: {[key:number]:ToolUsageDto[]} = {}
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
      
    getArticles(articles:  ArticleDto[]) {
        return this.articles ;
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
  
      setReferences(references: ReferenceDto) {
        this.cableTypes = references.cableTypes;
        this.siteTypes = references.siteTypes;
        this.equipementTypes = references.equipmentTypes;
        this.connectionTypes = references.connectionTypes;
        this.staff = references.staff;
        this.articles = references.articles;
        this.tools = references.tools;
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
    getProjectsSquad(project:Project){
        return this.projectsSquad[project.id];
    }
    setProjectsSquad(project: Project, squad: SquadDto[]) {
        this.projectsSquad[project.id] = squad;
    }
    
    getProjectsToolsUsage(project:Project){
        return this.projectsToolsUsage[project.id];
    }
    setProjectsToolsUsage(project:Project,usages:ToolUsageDto[] ){
         this.projectsToolsUsage[project.id] = usages;
    }
    getProjectTss(project:Project){
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
                    .map(key=>this.projectsInCategorie[key])
                    .filter(projects=>projects.filter(prj=>prj.id===project_id).length>0)
                    .map(projects=>projects[0])[0];
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
                this.projectsSquad[dto.id] = dto.squad;
                this.projectsToolsUsage[dto.id] = dto.toolsUsage;
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
    getCategorie(categorie:string){
        return this.projectsInCategorie[categorie] || [];
    }
    updateProject(project:Project) {

        project.title = project.title +" "+project.id_step+" /"+project.id_step_status
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