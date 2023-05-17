
import {rootStore} from '../stores/context';
import {API_URL} from '../config';
import axios from 'axios';

const http = axios.create();

http.interceptors.response.use(undefined, async( error :any) => {
  if (
    error?.response?.status === 401 &&
    error.config &&
    !error.config.__isRetryRequest
  ) {
    if (
      error?.request?.responseURL ===
      rootStore.apiStore.defaultUrl + API_URL.refreshTokenURL
    ) {
      return Promise.reject(error);
    }
    await rootStore.loginStore.getRefreshToken();

    if (rootStore.loginStore.userToken) {
      let request = error.config;
      const token = rootStore.loginStore.userToken;
      request.headers['Authorization'] = token;

      return new Promise(resolve => {
        resolve(http(request));
      });
    }
  }
  return Promise.reject(error);
});

export const httpGet = async (url: string, token: string | null) => {
  return await http.get(url, {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export const httpPost = async (url: string, body: any, token: string) => {
  return await http.post(url, body, {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export const httpDelete = async (url:string, token:string) => {
  return await http.delete(url, {
    headers: {
      Authorization: token,
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
    },
  });
};

export const httpUpload = async (url:string, body:any, token:string, onProgress:Function) => {
  return await http.post(url, body, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    onUploadProgress: (ev:any) => {
      const progress = (ev.loaded / ev.total) * 100;
      onProgress(Math.round(progress));
    },
  });
};

export const httpPut = async (url: string, body: any, token: string) => {
  return await axios
    .put(url, body, {
      headers: {
        Authorization: token,
        'Accept-encoding': 'gzip, deflate',
      },
    })
    .catch((err:any) => {
      console.log(err, body, url);
    });
};

export const httpUploadPut = async (
  url: string,
  body: any,
  token: string,
  onProgress: (progress: number) => void,
) => {
  return await http.put(url, body, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',

      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    onUploadProgress: (ev:any) => {
      const progress = (ev.loaded / ev.total) * 100;
      onProgress(Math.round(progress));
    },
  });
};