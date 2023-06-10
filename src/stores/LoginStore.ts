import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStore } from './context';

import {makeAutoObservable, runInAction, autorun, action} from 'mobx';
import { API_URL } from '../config';
import { asyncStorageSetItem } from '../utils/cache/storage';
import { httpPost } from '../network/httpService';
import UserManager from '../models/user';
import { User } from '../database/types';
 
export interface InitialDataProps {
  firstName: string;
  lastName: string;
  email: string;
}
export class LoginStore {
   
    stores: RootStore;
    userToken: string = '';
    loggedUserManager!:UserManager
    isFetching :boolean = false;
    loading:boolean = false;
    refreshToken: string = '';
    initialData: InitialDataProps = {
        firstName:"",
        lastName:"",
        email:""
    }

    constructor(stores: RootStore) {
        makeAutoObservable(this);
        this.stores = stores;
    }

    setInitialState = () => {
        runInAction(() => {
            this.userToken = '';
            this.isFetching = false;
        })
    }

    setInitialDetailsFromAsyncStorage = async () => {
        this.isFetching = true;
        await AsyncStorage.getItem('initialLoginData').then(
          action((data: any) => {
            if (data) {
              this.initialData = JSON.parse(data);
            }
            this.isFetching = false;
          }),
        );
      };

    getRefreshToken = async () => {
        try {
          const response = await httpPost<{data:{token:string,refreshToken:str}}>(
            this.stores.apiStore.defaultUrl + API_URL.refreshTokenURL,
            {},
            this.refreshToken,
          );
          runInAction(() => {
            this.userToken = response.data.token;
            this.refreshToken = response.data.refreshToken;
          });
          await asyncStorageSetItem('userToken', response.data.token);
          await asyncStorageSetItem('refreshToken', response.data.refreshToken);
        } catch (error) {
          console.log(error);
        }
      };
    setTokenFromAsyncStorage = async () => {
        runInAction(() => {
          this.loading = true;
        });
        const userToken = '';
        runInAction(() => {
            this.userToken = userToken;
            this.loading = false;
            });
    };

    regularLogin = async ({username, password}:{username :string, password:string}) => {
      const body = {username, password};
      
      const user :User | null = await this.stores.daoStores.userDao.getUserByName(username)
      console.log("USER : " , user,"  password ", password , "  ", typeof password , typeof user?.password)
      if(user && user.password === password){
        this.loggedUserManager = new UserManager(user);
        const {rightsStore} = this.stores;
        rightsStore.setUser(user);
       
        this.loginHandler({data:{token:"test"}})
      }
    };
    logout(): void {
      runInAction(() => {
        this.userToken = '';
    });
    }

    loginHandler = async (response: any) => {
        runInAction(() => {
            this.userToken = response.data.token;
        });
    }

}