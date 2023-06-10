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
import UserDao from '../database/dao/UserDao';
import StepStatusDao from '../database/dao/StepStatusDao';
import HistoryDao from '../database/dao/HistoryDoa';
import { RootStore } from './context';
import TssDao from '../database/dao/TssDao';
import ProjectWorkDetailsDao from '../database/dao/ProjectWorkDetailsDao';


export class RootDaoStore {

    projectDao: ProjectDao;
    autorisationDao : AutorisationDao;
    stepDao :StepDao;
    stepStatusDao :StepStatusDao;
    localisationDao:LocalisationDao;
    workDao : WorkDao;
    articleConsumeDao:ArticleConsumeDao
    workToolsUsageDao:WorkToolsUsageDao
    articleDao : ArticleDao
    workToolsDao : WorkToolsDao
    documentDao:DocumentDao
    staffDao: StaffDao
    userDao: UserDao
    historyDao:HistoryDao
    tssDao:TssDao
    projectWorkDetailsDao:ProjectWorkDetailsDao
  constructor(private database :Database, private stores:RootStore) {
    this.projectDao = new ProjectDao(database,stores);
    this.autorisationDao = new AutorisationDao(database);
    this.stepDao = new StepDao(database);
    this.stepStatusDao = new StepStatusDao(database);
    this.localisationDao = new LocalisationDao(database);
    this.staffDao = new StaffDao(database)
    this.workDao = new WorkDao(database,this.staffDao);
    this.workToolsDao = new WorkToolsDao(database);
    this.workToolsUsageDao = new WorkToolsUsageDao(database,this.workToolsDao);
    this.articleDao = new ArticleDao(database);
    this.articleConsumeDao = new ArticleConsumeDao(database,this.articleDao);
    this.documentDao = new DocumentDao(database);
    this.userDao = new UserDao(database,this);
    this.historyDao = new HistoryDao(database);
    this.tssDao = new TssDao(database);
    this.projectWorkDetailsDao = new ProjectWorkDetailsDao(database);
  }
  getDatabase(){
    return this.database;
  }
  resetStore() {
  }
}

