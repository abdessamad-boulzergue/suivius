export const data_table_create=`
CREATE TABLE IF NOT EXISTS PROJECT (
    id INTEGER UNIQUE NOT NULL, title VARCHAR(100)  NOT NULL, description, 
    debut_estime DATE NOT NULL, debut_reel DATE NOT NULL, fin_estime DATE NOT NULL, 
    fin_reel DATE NOT NULL,
    id_client INTEGER NOT NULL,
    id_assign INTEGER NOT NULL,
    id_step INTEGER NOT NULL,
    id_categorie INTEGER NOT NULL,
    id_step_status INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS LOCALISATION(id_project INTEGER UNIQUE NOT NULL,site VARCHAR(100) , region VARCHAR(100),province VARCHAR(100),addresse VARCHAR(100),type_prestation VARCHAR(100),lat REAL,lng REAL);
CREATE TABLE IF NOT EXISTS AUTORISATION (id_project INTEGER UNIQUE NOT NULL, date_demande DATE, date_commission DATE, date_decision DATE, date_paiment DATE,date_sign DATE);
CREATE TABLE IF NOT EXISTS STEP (id INTEGER UNIQUE NOT NULL, title VARCHAR(100)  NOT NULL);
CREATE TABLE IF NOT EXISTS CATEGORIE (id INTEGER UNIQUE NOT NULL, title VARCHAR(100)  NOT NULL);
CREATE TABLE IF NOT EXISTS Product (ID INTEGER UNIQUE NOT NULL, NAME VARCHAR(100) UNIQUE NOT NULL, DESCRIPTION, IMAGE, PRICE DOUBLE);
CREATE TABLE IF NOT EXISTS Post (ID INTEGER UNIQUE NOT NULL , TITLE VARCHAR(100) NOT NULL,DATE_POST DATE, DESCRIPTION  VARCHAR(255), IMAGE_URI TEXT);
CREATE TABLE IF NOT EXISTS DetailsPost (ID INTEGER UNIQUE NOT NULL, ID_POST INTEGER  NOT NULL , TITLE VARCHAR(100) NOT NULL, DESCRIPTION  VARCHAR(255), IMAGE_URI TEXT);
CREATE TABLE IF NOT EXISTS Users (ID INTEGER UNIQUE NOT NULL ,NAME VARCHAR(20) NOT NULL, PASSWORD  VARCHAR(50));
CREATE TABLE IF NOT EXISTS StaffMember ( id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20) NOT NULL);
CREATE TABLE IF NOT EXISTS Work (id_staff INTEGER  NOT NULL ,id_project INTEGER  NOT NULL,nbr_hour VARCHAR(10),nbr_add_hour VARCHAR(10) );
CREATE TABLE IF NOT EXISTS Article (id INTEGER UNIQUE NOT NULL ,title VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS  ArticleConsume (id_article INTEGER  NOT NULL ,id_project INTEGER NOT NULL, quantity INTEGER);
CREATE TABLE IF NOT EXISTS WorkTools (id INTEGER UNIQUE NOT NULL ,title VARCHAR(50) NOT NULL);
CREATE TABLE IF NOT EXISTS  WorkToolsUsage (id_tool INTEGER  NOT NULL ,id_project INTEGER NOT NULL, nbr_hour VARCHAR(10));
CREATE TABLE IF NOT EXISTS  Document (id INTEGER PRIMARY KEY AUTOINCREMENT , path VARCHAR(100), type VARCHAR);
CREATE TABLE IF NOT EXISTS  DocumentProject (id_project INTEGER NOT NULL , id_document INTEGER NOT NULL,type VARCHAR(50));
CREATE TABLE IF NOT EXISTS  StepStatus(id INTEGER  NOT NULL ,id_step INTEGER  NOT NULL,title VARCHAR(50));
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

INSERT INTO  StepStatus     VALUES("1","2","initialisation")
INSERT INTO  StepStatus     VALUES("2","2","demarage")
INSERT INTO  StepStatus     VALUES("3","2","attent validation")
INSERT INTO  StepStatus     VALUES("4","2","validation TSS")
INSERT INTO  StepStatus     VALUES("5","2","realisation POQ")
INSERT INTO  StepStatus     VALUES("6","2","validation POQ")
INSERT INTO  StepStatus     VALUES("7","2","blockage")


INSERT INTO  CATEGORIE      VALUES("1","FTTS")
INSERT INTO  CATEGORIE      VALUES("2","B2B")
INSERT INTO  CATEGORIE      VALUES("3","FTTH")

INSERT INTO  PROJECT        VALUES("1","project inwi travaux", "description p1","2012-10-10","2012-10-10","2012-10-10","2012-10-10","1","1","1","1","1")
INSERT INTO  PROJECT        VALUES("2","project inwi Etude", "description p1","2012-10-10","2012-10-10","2012-10-10","2012-10-10","1","1","2","2","1")
INSERT INTO  PROJECT        VALUES("3","project inwi Autorization", "description p1","2012-10-10","2012-10-10","2012-10-10","2012-10-10","1","1","3","3","1")
INSERT INTO  PROJECT        VALUES("4","project 2 inwi  ", "description p1","2012-10-10","2012-10-10","2012-10-10","2012-10-10","1","1","1","1","1")
INSERT INTO  PROJECT        VALUES("5","project 3 inwi ", "description p1","2012-10-10","2012-10-10","2012-10-10","2012-10-10","1","1","1","1","1")
INSERT INTO  PROJECT        VALUES("6","project 4 inwi ", "description p1","2012-10-10","2012-10-10","2012-10-10","2012-10-10","1","1","1","1","1")

INSERT INTO  LOCALISATION   VALUES("1","INWI","Rabat-Salé","---","---","propre",'37.78825','-122.4324')
INSERT INTO  AUTORISATION   VALUES("1","2012-10-10","2012-10-12","2012-10-19","2012-1-10","2012-11-10")

INSERT INTO Work            VALUES("1","1","8","1:30")
INSERT INTO Work            VALUES("2","1","8","1")
INSERT INTO Work            VALUES("3","1","3:30","")

INSERT INTO ArticleConsume  VALUES("1","1","")
INSERT INTO ArticleConsume  VALUES("2","1","")
INSERT INTO ArticleConsume  VALUES("3","1","")

INSERT INTO WorkToolsUsage  VALUES("1","1","")
INSERT INTO WorkToolsUsage  VALUES("2","1","")
INSERT INTO WorkToolsUsage  VALUES("3","1","")
`