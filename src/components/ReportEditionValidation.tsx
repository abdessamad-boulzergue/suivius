import { View } from "react-native";
import SButton from "./common/SButton";
import { Project } from "../database/dao/ProjectDao";
import { useDao, useStores } from "../stores/context";
import {  ETUDE_STATUS, ROUTES } from "../constants";
import { projectObjectStore } from "../stores/objectsStore";
import { observer } from "mobx-react-lite";
import { showAlert } from "./toast";
import { StatusUpdateResponseDto } from "../database/types";
import { ReportDto } from "../services/types";

const  ReportEditionValidation= observer(({project,report,navigation}:{project:Project,report:ReportDto,navigation:any})=>{
    
    const {rightsStore} = useStores()
    const{projectDao} = useDao();
    const currentProject    =  projectObjectStore.getProject(project.id) ;

    const canedit     = rightsStore.hasPermission(currentProject.id_step,currentProject.id,"EDIT_REPORT")   && report.status!=="VALID";
    const canValidate = rightsStore.hasPermission(currentProject.id_step,currentProject.id,'VALIDATE_REPORT')  && report.status!=="VALID";
   
    const validateReport = ()=>{
        const reportToSend = projectObjectStore.getProjectsReport(project,report.uid)
        
        const update :ReportDto={...reportToSend,status:"VALID"};
        console.log('is valid : ',update.status)

        projectDao.sendReport(project.id,update).then(reportUpdate=>{
        if(reportUpdate ){
                projectObjectStore.updateReport(project,update)
                showAlert("Rapport d'activité","est validé",()=>{
                    navigation.navigate(ROUTES.WORK_REPPORTS)
                })
            }
        });   
    }

    const sendReport = ()=>{
        const reportToSend = projectObjectStore.getProjectsReport(project,report.uid)
        projectDao.sendReport(project.id,{...reportToSend,status:""}).then(reportUpdate=>{
        if(reportUpdate ){
                projectObjectStore.updateReport(project,{...reportToSend})
                showAlert("Rapport d'activité","est envoyé",()=>{
                    navigation.navigate(ROUTES.WORK_REPPORTS)
                })
            }
        });   
     }


    return(
        <View style={{padding:10,alignItems:'center'}}>
            { canedit && 
                <SButton disabled={canedit} style={{ alignSelf:"center", height:50,  width:"70%", }} title="Envoyer" 
                        onPress={()=>sendReport()}></SButton>
            }
            { canValidate && 
                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                 <SButton disabled={canValidate} style={{ alignSelf:"center", height:50,  width:"70%", }} title="Valider" 
                        onPress={()=>validateReport()}></SButton>
                </View>
            }
        </View>
    )

})
export default ReportEditionValidation;