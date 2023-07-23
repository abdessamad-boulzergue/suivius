import { CableType, ConnectionType, EquipmentType, SiteType, StepStatus } from "../../database/types"

export interface ProjectDto {
    id: number,
    title: string,
    estimateStart:string,
    estimateEnd:string,
    step: {
        id: number,
        title: string
    },
    category: {
        id: number,
        title: string
    },
    stepStatus: {
        id: number,
        title: string
    }
    tss:TssDto,
    boq:BoqDto[],
    workDetails:projectWorkDetailsDto[],
    localisation:LocalisationDto,
    issues : IssueDto[],
    authorization:AuthorizationDto,
    squad:SquadDto[],
    toolsUsage:ToolUsageDto[],
    reports:ReportDto[],
    client:ClientDto

}
export interface VendorDto{
    title:string,
    iconContent:string;
}
export interface ClientDto{
    title:string,
    iconContent:string;
}
export interface TssDto{
    connectionTypeId: number,
    cableTypeId: number,
    equipmentTypeId: number,
    siteTypeId: number
}

export interface PermissionDto {
    idUser: number,
    idStep: number,
    idProject: number,
    permission: string
}
export interface documentContentDto{
    title: string ,
    type: string,
    content: string
}
export interface IssueDto{
    stepStatusId: number ,
    description: string,
    isClosed: boolean
}
export interface ProjectDocumentsContent {
    projectId: number,
    documentsContent:documentContentDto[]
}

export interface  ArticleDto{
    id:number,
    title:string
    unit:string   
}
export interface  WorkInfoDto{
    id:number,
    title:string   
}
export interface  ToolDto{
    id:number,
    title:string   
}
export interface  StepStatusDto{
    id:number,
    title:string   
}
export interface  StaffDto{
    id:number,
    name:string   
}
export interface  ReportDto{
    uid:string,
    userId:number,
    date:string,
    status:string
    squads :SquadDto[],
    usages:ToolUsageDto[],
    consumes:ArticleConsumesDto[]
}
export interface  SquadDto{
    memberId:number,
    name:string,
    normalHours:string,
    additionalHours:string;
    date:string
}
export interface  ToolUsageDto{
    toolId:number,
    title:string,
    timeUsage:string,
    date:string
}
export interface AuthorizationDto{
    dateDemand:string | undefined,
    dateCommission:string | undefined,
    decision:string | undefined,
    datePayment:string | undefined,
    dateSign:string |undefined
}
export interface  LoginResponseDto {
   token:string,
   userId:number,
    name:string,
}
export interface ReferenceDto {

    cableTypes:CableType[],
    equipmentTypes:EquipmentType[],
    connectionTypes:ConnectionType[],
    siteTypes:SiteType[]
    tools :ToolDto[],
    articles:ArticleDto[],
    staff:StaffDto[],
    stepStatus :StepStatusDto[]

}
export interface BoqDto{
     articleId : number,
     quantity: number,
     title:string,
     unite:string
}
export interface ArticleConsumesDto{
    articleId : number,
    quantity: number,
    quantityReal: number,
    title:string,
    unite:string
    date:string
}
export interface projectWorkDetailsDto{
    infoId: number,
    title:string,
    value: string
}
export interface LocalisationDto{
    lat: number,
    lng: number,
    region: string,
    province: string,
    address: string
    site:string
}