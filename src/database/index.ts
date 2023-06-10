import  SQLite from "react-native-sqlite-storage";
import { data_insert,data_table_create } from "./data";
import { Filter } from "./dao/expression";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "keno.db";
const database_version = "1.1";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
const location = "default"

interface SuiviDao{
    findById :(id:string)=>void;
    getAll :() =>void
}

export interface ProjectRepository{
    getAll :(cols?:Array<string>)=> Promise<SQLite.ResultSetRowList>;
    delete : (id:string)=> void,
    insert : (prod : Map<string,string>) => void
}

export default class Database{
    private db! :SQLite.SQLiteDatabase ;

    initDB() {
        return new Promise<SQLite.SQLiteDatabase>((resolve) => {
            console.log("Opening database ...");
            SQLite.openDatabase({
                name: database_name,
                location: location,
              }).then(DB => {
                            this.db = DB;
                            this.resetDB();
                            this.db.executeSql('SELECT 1 FROM Users LIMIT 1').then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) =>{
                                console.log("Database not yet ready, Received error: ", error);
                                this.db.transaction((tx) => {
                                    this.createTables(tx)
                                    this.initData(tx);
                                }).then(() => {
                                    console.log("Table created successfully");
                                }).catch((error:any) => {
                                    console.log(error);
                                });
                            });
                            resolve(this.db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                
        });
    }
    createTables(tx:SQLite.Transaction){
        data_table_create.split(";")
         .map(query=>query.replace("\n",""))
         .filter( q => q && q.trim().length>0 && !q.trim().startsWith("#"))
         .forEach(q => tx.executeSql(q))
    }
    resetDB(){
        ["Users","Client","PrestataireUsers","Prestataire","PROJECT","STEP","CATEGORIE",
        "ClientUsers","LOCALISATION","StepUserPermission","ProjectAffectation",
        "AUTORISATION","StaffMember","Work","Article","ArticleConsume",
        "WorkTools","WorkToolsUsage","Document","DocumentProject","TSS","ProjectWorkDetails"]
        .forEach(table=>{
            this.db.executeSql('DROP TABLE IF EXISTS '+table)                        
        })
    }
    initData(tx:SQLite.Transaction){
        data_insert.split("\n")
        .filter(q=>!q.startsWith('#'))
        .forEach(query=>{
           if(query && query.trim())
                tx.executeSql(query);
        })
    }

    closeDatabase(db:SQLite.SQLiteDatabase) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then((status :any) => {
                    console.log("Database CLOSED : " , status);
                })
                .catch((error : any) => {
                    console.log("Database error : " , error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    }

    selectFromTableWithFilter(tableName : string,cols:Array<string>,conditions:{[key: string]: Filter}){
        let queryColumn = 'tb.*';
        let where ="";
        if (cols && cols.length>0)
            queryColumn = 'tb.'.concat(cols.join(', tb.'));
        if(conditions && Object.keys(conditions).length>0){
            where = "WHERE " + Object.keys(conditions)
            .map(key=> key.concat(" ").concat(conditions[key].value()))
            .join(" AND ");
        }
        return this.executeQuery('SELECT '+queryColumn+' FROM '+tableName+' tb ' + where, []);
    }
    selectFromTable(tableName : string,cols:Array<string>,conditions:{[key: string]: any}){
        let queryColumn = 'tb.*';
        let where ="";
        if (cols && cols.length>0)
            queryColumn = 'tb.'.concat(cols.join(', tb.'));
        if(conditions && Object.keys(conditions).length>0){
            where = "WHERE " + Object.keys(conditions)
            .map(key=> key.concat("='").concat(conditions[key]).concat("'"))
            .join(" AND ");
        }
        return this.executeQuery('SELECT '+queryColumn+' FROM '+tableName+' tb ' + where, []);
    }

    deleteFromTable(tableName:string , where:Map<string,string>){
        let queryColumn ="";
        if (where)
            queryColumn = Object.keys(where)
                  .map((key:string)=>{ return  'tb.'.concat(key).concat(" = '").concat(where.get(key)!).concat("'") })
                 .join('and ')
        return this.executeQuery("DELETE FROM "+tableName+' tb WHERE '+queryColumn, []);
    }
    update(tableName:string ,fileds:{[key:string]:any}, where:{[key:string]:any}){

        let queryColumn ="";
        let set = Object.keys(fileds)
                    .map(key=>{return key.concat("='").concat(fileds[key]).concat("'")})
                    .join(',')
        if (where){
            queryColumn = Object.keys(where)
                  .map((key:string)=>{ return key.concat(" = '").concat(where[key]).concat("'") })
                 .join(' and ')
        }

        return this.executeQuery("UPDATE "+tableName+' SET '+set+' WHERE '+queryColumn, []);
    }
    insert(tableName:string ,fileds:{[key:string]:any}):Promise<number>{

        let queryColumn = Object.keys(fileds)
                    .join(',')
        let values = Object.keys(fileds)
                    .map((key:string)=>{ 
                        let value = fileds[key] || "";
                        return "'".concat(value).concat("'")
                     })
                    .join(',')

        return this.executeInsertQuery("INSERT INTO  "+ tableName +'('+ queryColumn +') VALUES('+ values +')', []);
    }

    executeInsertQuery(presparedQuery :string, args : Array<string>):Promise<number> {
        return new Promise((resolve) => {
            this.db.transaction((tx) => {
                    tx.executeSql( presparedQuery, args )
                    .then(async ([tx, results]) => {
                        let lastIdResult= await this.executeQuery( 'SELECT last_insert_rowid() as lastId', [] )
                        let lastId :number= lastIdResult.item(0).lastId;  
                        return lastId;

                    }).then((results)=> resolve(results));
                }).catch((err:any) => {
                    console.log(err);
                });
            
        });
    }
    executeQuery(presparedQuery :string, args : Array<string>):Promise<SQLite.ResultSetRowList> {
        return new Promise((resolve) => {
            this.db.transaction((tx) => {
                    tx.executeSql( presparedQuery, args ).then(([tx, results]) => {
                       return results.rows;
                    }).then((results)=> resolve(results));
                }).catch((err:any) => {
                    console.log(err);
                });
            
        });
    }
}
