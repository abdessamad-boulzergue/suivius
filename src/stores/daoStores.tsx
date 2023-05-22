import React, {createContext, useContext, useEffect} from 'react';

import ProjectDao from '../database/dao/ProjectDao';
import Database from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { action } from 'mobx';
import AutorisationDao from '../database/dao/AutorisationDao';
import StepDao from '../database/dao/StepDao';
import LocalisationDao from '../database/dao/LocalisationDao';
import WorkDao from '../database/dao/WorkDao';
import ArticleConsumeDao from '../database/dao/ArticleConsumeDao';
import WorkToolsUsageDao, { WorkToolsUsage } from '../database/dao/WorkToolsUsageDao';
import ArticleDao from '../database/dao/ArticleDao';
import WorkToolsDao from '../database/dao/WorkToolsDao';
import DocumentDao from '../database/dao/DocumentDao';
import StaffDao from '../database/dao/StaffDao';


export class RootDaoStore {

    projectDao: ProjectDao;
    autorisationDao : AutorisationDao;
    stepDao :StepDao;
    localisationDao:LocalisationDao;
    workDao : WorkDao;
    articleConsumeDao:ArticleConsumeDao
    workToolsUsageDao:WorkToolsUsageDao
    articleDao : ArticleDao
    workToolsDao : WorkToolsDao
    documentDao:DocumentDao
    staffDao: StaffDao
  constructor(private database :Database) {
    this.projectDao = new ProjectDao(database);
    this.autorisationDao = new AutorisationDao(database);
    this.stepDao = new StepDao(database);
    this.localisationDao = new LocalisationDao(database);
    this.staffDao = new StaffDao(database)
    this.workDao = new WorkDao(database,this.staffDao);
    this.workToolsDao = new WorkToolsDao(database);
    this.workToolsUsageDao = new WorkToolsUsageDao(database,this.workToolsDao);
    this.articleDao = new ArticleDao(database);
    this.articleConsumeDao = new ArticleConsumeDao(database,this.articleDao);
    this.documentDao = new DocumentDao(database);

  }
  getDatabase(){
    return this.database;
  }
  resetStore() {
  }
}

export const rootDao = new RootDaoStore(new Database());

const StoreDaoContext = createContext<RootDaoStore>(rootDao);

export const StoreDaoProvider = ({children}: any) => {
    
  useEffect(() => {
    AsyncStorage.getItem('db_inited').then(
            action((data: any) => {
              if (!data) {
                rootDao.getDatabase().initDB();
              }
            }),
          );
  }, []);


  return (
    <StoreDaoContext.Provider value={rootDao}>{children}</StoreDaoContext.Provider>
  );
};

export const useDao = () => useContext(StoreDaoContext);