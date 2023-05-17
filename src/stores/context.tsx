import React, {createContext, useContext} from 'react';
import { LoginStore } from './LoginStore';
import { ApiStore } from './apiStore';


export class RootStore {

    loginStore: LoginStore;
    apiStore  : ApiStore;

  constructor() {
    this.loginStore = new LoginStore(this);
    this.apiStore = new ApiStore();
  }

  resetStore() {
    this.loginStore.setInitialState();
    this.apiStore.setInitialState();
  }
}

export const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({children}: any) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);