//import DeviceInfo from 'react-native-device-info';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { projectObjectStore } from '../stores/objectsStore';

const endPoints = ['DEV', 'QA', 'PROD'];

const appEndpoint:string = endPoints[0];
//const appVersion = DeviceInfo.getVersion();
const TOKENS :{[key:string]:string} = {
    DEV: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxZTU1YzlkOTBlYTk5NTk0YmM3ZTZhMiIsImFwcE5hbWUiOiJFdGhvcmEiLCJhcHBHb29nbGVJZCI6Ijk3MjkzMzQ3MDA1NC1oYnNmMjlvaHBhdG83NnRpbDJqdGY2amdnMWI0Mzc0Yy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImNyZWF0b3JJZCI6IjYyYzNmNGE5M2FkMjcwNjc0YzFmNjJmYiIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDVUMDg6Mjc6MjYuMzM2WiIsIl9fdiI6MH0sImlhdCI6MTY1NzAwOTY1OH0.dnvrO_dQ_2GLyUX-b71CcHFDnphpjeTYOxz6vZ2fsPY',
    QA: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxZTU1YzlkOTBlYTk5NTk0YmM3ZTZhMiIsImFwcE5hbWUiOiJFdGhvcmEiLCJhcHBEZXNjcmlwdGlvbiI6InVuZGVmaW5lZCIsImFwcFVybCI6InVuZGVmaW5lZCIsImFwcExvZ29IYXNoIjpudWxsLCJjcmVhdG9ySWQiOiI2MWU1NWM4OTkwZWE5OTU5NGJjN2U2NTYiLCJjcmVhdGVkQXQiOiIyMDIyLTAxLTE3VDEyOjEwOjA1Ljk2N1oiLCJfX3YiOjAsInJhbmRvbVN0cmluZyI6ImluemlURmMyU0VOZFp6KzRqRW9rSmI0UWlxbVlYQ0wrbHkwOExxMDNObVlES1JyUDd4UU11V0dmdGNFSkdpaFlkZVVyaS8zU2FlS0FPTGF0T1U1UThuNWo3U3Ezd0FaMWo3cUo1YkdlZVF1VEVrV2gifSwiaWF0IjoxNjQyNDIxNDE5fQ.9xYd1WmPesYrBkF9fUQFMBeXHBFSCOdFWX-CBIzyjmU',
    PROD: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyZDAwNTQyMGY5NTFhNjA0MjJhNTRhNCIsImFwcE5hbWUiOiJFdGhvcmEgUHJvZCIsImFwcERlc2NyaXB0aW9uIjoidW5kZWZpbmVkIiwiYXBwVXJsIjoidW5kZWZpbmVkIiwiYXBwR29vZ2xlSWQiOiI5NzI5MzM0NzAwNTQtdjY0dWE5NDc5MWczMmZhMHNoZG0zbGZvZjkzMGhvbjAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJjcmVhdG9ySWQiOiI2MmQwMDM5NzBmOTUxYTYwNDIyYTUzNTAiLCJjcmVhdGVkQXQiOiIyMDIyLTA3LTE0VDEyOjAwOjAyLjM4OFoiLCJfX3YiOjB9LCJpYXQiOjE2NTc4MDAwMTR9.qCOeOhL6fFMzmHr3rI6CF28KUS4c9mMNaWN0rxnSniY',
  };
  //http://192.168.186.223:8083/
  const APP_TOKEN :string = TOKENS[appEndpoint];
  export const API_ROOT_URL= ()=>{
    /*
    const root = (async ()=>await  AsyncStorage.getItem('SERVER_IP'))();
    console.log(root)
    return root + '/suivius/api/v1'*/
    console.log("projectObjectStore.API_URL",projectObjectStore.API_URL)
    return projectObjectStore.API_URL +'/suivius/api/v1';

  }

  const API_URL={
    refreshTokenURL : API_ROOT_URL()+"/users/login/refresh",
    getProjects:()=>API_ROOT_URL()+"/projects",
    tss:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/tss')),
    boq:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/boq')),
    preValidateTss:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/tss/preValidation')),
    validateTss:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/tss/validation')),
    issues:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/issue')),
    preValidateAPD:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/apd/preValidation')),
    validateAPD:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/apd/validation')),
    startStudy:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/study')),
    startTss:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/tss/edition')),
    getUserProjects:(user_id:any)=>API_ROOT_URL()+"/projects/user/".concat(user_id),
    getUserPermissions:(user_id:any)=>API_ROOT_URL()+"/permissions/user/".concat(user_id),
    references:()=>API_ROOT_URL()+"/references",
    staff:()=>API_ROOT_URL()+"/staff",
    squad:(project_id:number)=>API_ROOT_URL()+"/staff/project/"+project_id,
    staffWork:(project_id:number)=>API_ROOT_URL()+"/staff/project/"+project_id+"/work",
    toolUsage:(project_id:number)=>API_ROOT_URL()+"/tools/project/"+project_id,
    authorization:(project_id:number)=>API_ROOT_URL()+"/projects/"+project_id+"/authorization",
    workInfo:()=>API_ROOT_URL() + "/work/info",
    rejectTss:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/tss/rejection')),
    rejectApd:(project_id:number)=>API_ROOT_URL()+"/projects/".concat(project_id.toString().concat('/apd/rejection')),
    documents:(type:string,project_id:number)=>API_ROOT_URL()+"/documents/project/" + project_id.toString() +"/files"+"/"+type,
    projectsDocumentsContentForUser:(user_id:number)=>API_ROOT_URL()+"/documents/projects/user/" + user_id.toString() +"/content",
    articles:()=>API_ROOT_URL()+"/articles"
  }

  type RUN_TYPES = "DEBUG" | "DEV" | "TEST" | "PROD"
  
  export {
    APP_TOKEN,
    appEndpoint,
    API_URL,
  }