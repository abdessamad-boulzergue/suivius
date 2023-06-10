export const data_table_create=`
CREATE TABLE IF NOT EXISTS PROJECT (
    id INTEGER UNIQUE NOT NULL,
    title VARCHAR(100)  NOT NULL,
    description VARCHAR(100)  NOT NULL, 
    debut_estime DATE NOT NULL,
    debut_reel DATE NOT NULL, 
    fin_estime DATE NOT NULL, 
    fin_reel DATE NOT NULL,
    id_client INTEGER NOT NULL,
    budget_estime REAL,
    id_step INTEGER NOT NULL,
    id_categorie INTEGER NOT NULL,
    id_step_status INTEGER NOT NULL,
    type_prestation VARCHAR(100),
    type_partage VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS ProjectAffectation(id_project INTEGER  NOT NULL,id_user INTEGER  NOT NULL);
CREATE TABLE IF NOT EXISTS TSS(id INTEGER UNIQUE NOT NULL ,cableType VARCHAR,connectionType VARCHAR,equipmentType VARCHAR,siteType VARCHAR);

CREATE TABLE IF NOT EXISTS LOCALISATION(id_project INTEGER UNIQUE NOT NULL,site VARCHAR(100) , region VARCHAR(100),province VARCHAR(100),addresse VARCHAR(100),lat REAL,lng REAL,lat2 REAL,lng2 REAL);
CREATE TABLE IF NOT EXISTS AUTORISATION (id_project INTEGER UNIQUE NOT NULL, date_demande DATE, date_commission DATE, date_decision DATE, date_paiment DATE,date_sign DATE);
CREATE TABLE IF NOT EXISTS STEP (id INTEGER UNIQUE NOT NULL, title VARCHAR(100)  NOT NULL);
CREATE TABLE IF NOT EXISTS CATEGORIE (id INTEGER UNIQUE NOT NULL, title VARCHAR(100)  NOT NULL);
CREATE TABLE IF NOT EXISTS MOBILE (id_step INTEGER NOT NULL,id_user INTEGER NOT NULL,lat REAL,lng REAL,id_device VARCHAR);
CREATE TABLE IF NOT EXISTS Users (id INTEGER UNIQUE NOT NULL ,username VARCHAR(20) NOT NULL, password  VARCHAR(50));
CREATE TABLE IF NOT EXISTS Client (id INTEGER UNIQUE NOT NULL ,NAME VARCHAR(20) NOT NULL);
CREATE TABLE IF NOT EXISTS Prestataire (id INTEGER UNIQUE NOT NULL ,label VARCHAR(20) NOT NULL,code VARCHAR(50));
CREATE TABLE IF NOT EXISTS PrestataireUsers (id_presta INTEGER  NOT NULL ,id_user INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS ClientUsers (id_client INTEGER  NOT NULL ,id_user INTEGER NOT NULL);

CREATE TABLE IF NOT EXISTS permissions ( id INTEGER ,role VARCHAR(20) NOT NULL);

CREATE TABLE IF NOT EXISTS StepUserPermission (id_user INTEGER NOT NULL,id_step INTEGER NOT NULL,id_project INTEGER NOT NULL,permission VARCHAR(15) NOT NULL);


CREATE TABLE IF NOT EXISTS StaffMember ( id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20) NOT NULL);

CREATE TABLE IF NOT EXISTS Work (id_staff INTEGER  NOT NULL ,id_project INTEGER  NOT NULL,nbr_hour VARCHAR(10),nbr_add_hour VARCHAR(10) );
CREATE TABLE IF NOT EXISTS ProjectWorkDetails (id_project INTEGER  NOT NULL,id_info INTEGER, title VARCHAR(10),value VARCHAR(10) );

CREATE TABLE IF NOT EXISTS Article (id INTEGER UNIQUE NOT NULL ,title VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS ArticleConsume (id_article INTEGER  NOT NULL ,id_project INTEGER NOT NULL, quantity INTEGER);
CREATE TABLE IF NOT EXISTS  WorkTools (id INTEGER UNIQUE NOT NULL ,title VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS  WorkToolsUsage (id_tool INTEGER  NOT NULL ,id_project INTEGER NOT NULL, nbr_hour VARCHAR(10));

CREATE TABLE IF NOT EXISTS  Document (id INTEGER PRIMARY KEY AUTOINCREMENT , name VARCHAR(100),path VARCHAR(100), type VARCHAR);
CREATE TABLE IF NOT EXISTS  DocumentProject (id_project INTEGER NOT NULL , id_document INTEGER NOT NULL,type VARCHAR(50));

CREATE TABLE IF NOT EXISTS  StepStatus(id INTEGER  NOT NULL ,id_step INTEGER  NOT NULL,title VARCHAR(50));

CREATE TABLE IF NOT EXISTS  History( id INTEGER PRIMARY KEY AUTOINCREMENT,id_user INTEGER  NOT NULL ,id_project INTEGER  NOT NULL,id_step_status INTEGER  NOT NULL,dateUpdate DATE,device_uid VARCHAR);

CREATE TABLE IF NOT EXISTS  BLOCAGE (id INTEGER PRIMARY KEY AUTOINCREMENT ,id_project INTEGER NOT NULL,id_step_status INTEGER NOT NULL,motif VARCHAR(200))
`

export const data_insert=  `
INSERT INTO  StaffMember    VALUES("1","Badr Issoui")
INSERT INTO  StaffMember    VALUES("2","Banoun hani")
INSERT INTO  StaffMember    VALUES("3","Safriwi hassan")

INSERT INTO  StaffMember    VALUES("4","ali ")
INSERT INTO  StaffMember    VALUES("5","omar ")

INSERT INTO  WorkTools      VALUES("1","Balayeuses")
INSERT INTO  WorkTools      VALUES("2","Compresseur")
INSERT INTO  WorkTools      VALUES("3","Sablage")

INSERT INTO  Article        VALUES("1","Article 1")
INSERT INTO  Article        VALUES("2","Article 2")
INSERT INTO  Article        VALUES("3","Article 3")

INSERT INTO  STEP           VALUES("1","Travaux")
INSERT INTO  STEP           VALUES("2","Etude")
INSERT INTO  STEP           VALUES("3","Autorisation")

INSERT INTO  StepStatus     VALUES("1","2","non demarre")
INSERT INTO  StepStatus     VALUES("2","2","demarre")
INSERT INTO  StepStatus     VALUES("3","2","en edition")
INSERT INTO  StepStatus     VALUES("4","2","en cours de validation")
INSERT INTO  StepStatus     VALUES("5","2","en attent de validation TSS")
INSERT INTO  StepStatus     VALUES("6","2","en attent de APD")
INSERT INTO  StepStatus     VALUES("7","2","en attent de pre validation APD")
INSERT INTO  StepStatus     VALUES("8","2","en attent de validation APD")
INSERT INTO  StepStatus     VALUES("9","2","En attente de MAJ TSS")
INSERT INTO  StepStatus     VALUES("10","2","En attente de MAJ APD")


INSERT INTO  CATEGORIE      VALUES("1","FTTS")
INSERT INTO  CATEGORIE      VALUES("2","B2B")
INSERT INTO  CATEGORIE      VALUES("3","FTTH")

#id ,title ,description debut_estime ,debut_reel,fin_estime ,fin_reel ,
#id_client ,budget_estime ,id_step,id_tss ,id_categorie ,id_step_status ,type_prestation,type_partage 

INSERT INTO  LOCALISATION   VALUES("1","INWI","Rabat-Salé","---","---",'48.74230949','2.42786984','48.74230949','2.42786984')
INSERT INTO  AUTORISATION   VALUES("1","2012-10-10","2012-10-12","2012-10-19","2012-1-10","2012-11-10")

INSERT INTO Work            VALUES("1","1","8","1:30")
INSERT INTO Work            VALUES("2","1","8","1")
INSERT INTO Work            VALUES("3","1","3:30","")


INSERT INTO WorkToolsUsage  VALUES("1","1","")
INSERT INTO WorkToolsUsage  VALUES("2","1","")
INSERT INTO WorkToolsUsage  VALUES("3","1","")

INSERT INTO Users VALUES("1" ,"inwi", "pass")
INSERT INTO Users VALUES("2" ,"test", "pass")
INSERT INTO Users VALUES("3" ,"valid", "pass")

# VALUES (id_project , id_user)
INSERT INTO  ProjectAffectation VALUES("1","2")
INSERT INTO  ProjectAffectation VALUES("2","2")
INSERT INTO  ProjectAffectation VALUES("3","2")
INSERT INTO  ProjectAffectation VALUES("1","3")

INSERT INTO  ProjectAffectation VALUES("1","1")

INSERT INTO Client VALUES("1" ,"INWI")
INSERT INTO Prestataire VALUES("1" ,"PRESTA","AT")
INSERT INTO Prestataire VALUES("2" ,"PRESTA2","CT")

INSERT INTO PrestataireUsers VALUES("1","2")
INSERT INTO PrestataireUsers VALUES("1","3")
INSERT INTO ClientUsers VALUES("1" ,"1")

# StepUserPermission (id_user, id_step, id_project, permission)
#INSERT INTO StepUserPermission VALUES("2","2","1","DEMARRER_ETUDE")
#INSERT INTO StepUserPermission VALUES("2","2","1","EDITER_TSS")
#INSERT INTO StepUserPermission VALUES("3","2","1","PRE_VALIDATION_TSS")
#INSERT INTO StepUserPermission VALUES("1","2","1","VALIDATION_TSS")
#INSERT INTO StepUserPermission VALUES("2","2","1","EDITER_ADP")
#INSERT INTO StepUserPermission VALUES("3","2","1","PRE_VALIDATION_APD")
#INSERT INTO StepUserPermission VALUES("1","2","1","VALIDATION_APD")
`