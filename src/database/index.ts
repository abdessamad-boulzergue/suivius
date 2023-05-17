import  SQLite from "react-native-sqlite-storage";
import { data_insert,data_table_create } from "./data";
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
                            
                            ["Users","PROJECT","STEP","CATEGORIE","LOCALISATION",
                            "AUTORISATION","StaffMember","Work","Article","ArticleConsume",
                            "WorkTools","WorkToolsUsage"]
                            .forEach(table=>{
                                this.db.executeSql('DROP TABLE IF EXISTS '+table)                        
                            })

                            this.db.executeSql('SELECT 1 FROM Users LIMIT 1').then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) =>{
                                console.log("Received error: ", error);
                                console.log("Database not yet ready ... populating data");
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
         .filter( q => q && q.trim().length>0)
         .forEach(q => tx.executeSql(q))
    }
    initData(tx:SQLite.Transaction){
        data_insert.split("\n")
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
