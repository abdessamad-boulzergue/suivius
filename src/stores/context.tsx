import React, {createContext, useContext, useEffect} from 'react';
import { LoginStore } from './LoginStore';
import { ApiStore } from './apiStore';
import { RootDaoStore} from './daoStores';
import { RightsStore } from './rightsStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import Database from '../database';


export class RootStore {

    loginStore: LoginStore;
    apiStore  : ApiStore;
    daoStores : RootDaoStore;
    rightsStore : RightsStore;
    isLoadingData:boolean =true;

    startLoadingData(start:boolean){
      this.isLoadingData = start;
    }
  constructor() {
    makeAutoObservable(this);

    this.loginStore = new LoginStore(this);
    this.apiStore = new ApiStore();
    this.daoStores = new RootDaoStore(new Database(),this);;
    this.rightsStore  = new RightsStore(this);
  }

  resetStore() {
    this.loginStore.setInitialState();
    this.apiStore.setInitialState();
  }
}

export const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);

useEffect(() => {
  console.log('check database')
  AsyncStorage.getItem('db_inited').then(
          (data: any) => {

               rootStore.daoStores.getDatabase().initDB()
          },
        );
}, []);

export const StoreProvider = ({children}: any) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};



const StoreDaoContext = createContext<RootDaoStore>(rootStore.daoStores);

export const StoreDaoProvider = ({children}: any) => {
    
 

  return (
    <StoreDaoContext.Provider value={rootStore.daoStores}>{children}</StoreDaoContext.Provider>
  );
};

export const useDao = () => useContext(StoreDaoContext);

export const useStores = () => useContext(StoreContext);