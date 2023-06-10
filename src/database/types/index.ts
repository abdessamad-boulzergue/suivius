export interface Permission{
    id:number,
    title:string
}

export interface User{
    id:number,
    username:string,
    password:string,
    isAdmin:boolean
}

export interface Step{
    id:number,
    title:string
}
export interface StepStatus{
    id:number,
    title:string,
    id_step:number,
    step?:Step
}
export interface StepUserPermission{
    id_user : number,
    id_step : number,
    id_project : number,
    step?:Step,
    permission:string
}

export interface SuiviePermission{
    step:Step,
    id_project:number,
    permissions:Array<string>
}

export interface EquipmentType {
    id:number,
    title:string
}
export interface CableType {
    id:number,
    title:string
}


export interface WorkDetails{
    id:number,
    title:string,
    value:string
}

export interface StatusUpdateResponseDto{
    projectId:number;
    stepStatusId:number;
}

export interface ProjectWorkDetails{
    id_project:number,
    id_info:number,
    title:string,
    value:string
}

export interface ConnectionType {
    id:number,
    title:string
}
export interface SiteType {
    id:number,
    title:string
}

export interface Document{
    id?:number,
    path:string,
    type:string|null,
    name:string
}
export interface History{
    id?:number,
    id_project:number,
    id_user:number,
    id_step_status:number,
    dateUpdate:Date,
    id_device:string
}
export interface DocumentProject{
    document:Document,
    type:string
}


export type  UserPermission = "EDITER_TSS" | "PRE_VALIDATION_TSS" | "CONSULTATION" | "AFFECTATION" | "VALIDATION_TSS" | "EDITER_APD"
                             | "VALIDATION_APD" | "PRE_VALIDATION_APD" 

