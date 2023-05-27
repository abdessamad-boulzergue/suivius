
export const TABLES={
    Work:{
        name:"Work",
        fields:{
            ID:{name:"id", type:"number"},
            NBR_HOUR:{name:"nbr_hour", type:"string"},
            NBR_ADD_HOUR:{name:"nbr_add_hour", type:"string"}
        }
    },
    Document:{
        name:"Document",
        fields:{
            ID:{name:"id", type:"number"},
            PATH:{name:"path", type:"string"},
            DATA:{name:"data", type:"string"}
        }
    },
    
    DocumentProject:{
        name:"DocumentProject",
        fields:{
            ID_PROJECT:{name:"id_project", type:"number"},
            ID_DOCUMENT:{name:"id_document", type:"number"},
            TYPE:{name:"type", type:"string"}
        }
    },
    WorkToolsUsage:{
        name:"WorkToolsUsage",
        fields:{
            NBR_HOUR:{name:"nbr_hour", type:"string"},
        }
    },
    Autorisation:{
        name:"AUTORISATION",
        fields:{
            ID:{name:"id", type:"number"},
            dateCommission:{name:"date_commission", type:"Date"},
            dateDemande:{name:"date_demande", type:"Date"},
            dateDecision:{name:"date_decision", type:"Date"},
            dateSignature:{name:"date_sign", type:"Date"},
            datePayment:{name:"date_paiment", type:"Date"}
        }
    }
}