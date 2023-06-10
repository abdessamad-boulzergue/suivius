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
    issues : IssueDto[]
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
export interface ReferenceDto {

    cableTypes:CableType[],
    equipmentTypes:EquipmentType[],
    connectionTypes:ConnectionType[],
    siteTypes:SiteType[]

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