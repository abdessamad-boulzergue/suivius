
export const TABLES={
    Work:{
        name:"Work",
        fields:{
            ID:{name:"id", type:"number"},
            NBR_HOUR:{name:"nbr_hour", type:"string"},
            NBR_ADD_HOUR:{name:"nbr_add_hour", type:"string"}
        }
    },
    ProjectWorkDetails:{
        name:"ProjectWorkDetails",
    },
    Document:{
        name:"Document",
        fields:{
            ID:{name:"id", type:"number"},
            PATH:{name:"path", type:"string"},
            DATA:{name:"data", type:"string"}
        }
    },
    Tss:{
        name:"Tss",
        fields:{
            ID:{name:"project_id", type:"number"}
        }
    },
    History:{
        name:"History", 
    },
    User:{
        name:"Users",
        fields:{
            ID:{name:"id", type:"number"},
            USERNAME:{name:"username", type:"string"},
            PASSWORD:{name:"password", type:"string"}
        }
    },
    
    StepUserPermission:{
        name:"StepUserPermission",
        fields:{
            ID_USER:{name:"id_user", type:"number"},
            ID_STEP:{name:"id_step", type:"number"},
            ID_PERMISSION:{name:"id_permission", type:"number"}
        }
    },
    Step:{
        name:"Step",
        fields:{
            ID:{name:"id", type:"number"},
            TITLE:{name:"title", type:"string"},
        }
    },
    
    StepStatus:{
        name:"StepStatus",
        fields:{
            ID:{name:"id", type:"number"},
            TITLE:{name:"title", type:"string"},
        }
    },
    Permission:{
        name:"Permission",
        fields:{
            ID:{name:"id", type:"number"},
            TITLE:{name:"title", type:"string"},
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
    PROJECT:{
        name:"PROJECT",
    },
    ProjectAffectation:{
        name:"ProjectAffectation",
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