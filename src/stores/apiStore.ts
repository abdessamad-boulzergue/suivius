import {makeAutoObservable, runInAction} from 'mobx';
import {APP_TOKEN, appEndpoint} from '../config';

export class ApiStore {
  modes :{[key:string]:string}  = {
    DEV: 'http://192.168.56.223:8083/suivius/api/v1',
    PROD: 'https://app.dappros.com/v1',
    QA: 'https://app-dev.dappros.com/v1',
  };
  tokens = {
    dev: APP_TOKEN,
    prod: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxODRmZjNiYzU0MDkzNmMwY2I3Y2M2OCIsImFwcE5hbWUiOiJFdGhvcmExIiwiYXBwRGVzY3JpcHRpb24iOiJudWxsIiwiYXBwVXJsIjoibnVsbCIsImFwcExvZ29IYXNoIjpudWxsLCJjcmVhdG9ySWQiOiI2MTg0ZmYxM2M1NDA5MzZjMGNiN2NiZmEiLCJjcmVhdGVkQXQiOiIyMDIxLTExLTA1VDA5OjU0OjAzLjQ4NloiLCJfX3YiOjAsInJhbmRvbVN0cmluZyI6IlFpaFdNcUNRNWJBQXpRWUZiODJnVlM0VFNBRTZ0cWVJamhHenU0bzFIWFNmZ0xJenB1dGU4Y2t4eXJrdGdSakMvUDJYeEVDbWNVUzAwaWk5RmgyQ25PSnd5V3VpWXFlWW50OHBOZ0hST0FDVFdIOFhybThHRjRhTVpYMUdhdkh5UWc5MEFjNjQrUzV0dW1WcjA0dk9vc1Nqd1FpeXBtKzA1QWNQYlAifSwiaWF0IjoxNjM2MTA2MDU4fQ.V9Q7uqfG6h__GI3yRD-omjYZj-eD-O2RuhWgUieboEk',
  };
  
  defaultUrl:string = this.modes[appEndpoint];
  defaultToken = APP_TOKEN;

  constructor() {
    makeAutoObservable(this);
  }

  setInitialState() {
    runInAction(() => {
      this.modes = {
        DEV: 'https://app-dev.dappros.com/v1',
        PROD: 'https://app.dappros.com/v1',
        QA: 'https://app-dev.dappros.com/v1',
      };
      this.tokens = {
        dev: APP_TOKEN,
        prod: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxODRmZjNiYzU0MDkzNmMwY2I3Y2M2OCIsImFwcE5hbWUiOiJFdGhvcmExIiwiYXBwRGVzY3JpcHRpb24iOiJudWxsIiwiYXBwVXJsIjoibnVsbCIsImFwcExvZ29IYXNoIjpudWxsLCJjcmVhdG9ySWQiOiI2MTg0ZmYxM2M1NDA5MzZjMGNiN2NiZmEiLCJjcmVhdGVkQXQiOiIyMDIxLTExLTA1VDA5OjU0OjAzLjQ4NloiLCJfX3YiOjAsInJhbmRvbVN0cmluZyI6IlFpaFdNcUNRNWJBQXpRWUZiODJnVlM0VFNBRTZ0cWVJamhHenU0bzFIWFNmZ0xJenB1dGU4Y2t4eXJrdGdSakMvUDJYeEVDbWNVUzAwaWk5RmgyQ25PSnd5V3VpWXFlWW50OHBOZ0hST0FDVFdIOFhybThHRjRhTVpYMUdhdkh5UWc5MEFjNjQrUzV0dW1WcjA0dk9vc1Nqd1FpeXBtKzA1QWNQYlAifSwiaWF0IjoxNjM2MTA2MDU4fQ.V9Q7uqfG6h__GI3yRD-omjYZj-eD-O2RuhWgUieboEk',
      };
      this.defaultUrl = this.modes[appEndpoint];
      this.defaultToken = APP_TOKEN;
    });
  }

 
}