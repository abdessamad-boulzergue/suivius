import { CableType, ConnectionType, EquipmentType, SiteType } from "../../database/types"

export interface ProjectDto {
    id: number,
    title: string,
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
    toolsUsage:ToolUsageDto[]

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
}
export interface  WorkInfoDto{
    id:number,
    title:string   
}
export interface  ToolDto{
    id:number,
    title:string   
}
export interface  StaffDto{
    id:number,
    name:string   
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
    dateDecision:string | undefined,
    datePayment:string | undefined,
    dateSign:string |undefined
}

export interface ReferenceDto {

    cableTypes:CableType[],
    equipmentTypes:EquipmentType[],
    connectionTypes:ConnectionType[],
    siteTypes:SiteType[]
    tools :ToolDto[],
    articles:ArticleDto[],
    staff:StaffDto[]

}
export interface BoqDto{
     articleId : number,
     quantity: number,
     title:string,
     unite:string
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