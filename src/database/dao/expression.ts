export  interface Filter{
    key:string,
    value:()=>string
}
export const eq=(key:string):Filter=>{
    return {
        key:key,
        value:()=>"='"+key+"'"
    }
}

export const like=(key:string):Filter=>{
    return {
        key:key,
        value:()=>" like '%"+key+"%'"
    }
}