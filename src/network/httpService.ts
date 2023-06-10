
import {rootStore} from '../stores/context';
import {API_URL} from '../config';
import axios from 'axios';
import { Alert } from 'react-native';
import { showError } from '../components/toast';

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

  if (!error.response) {
    // Network error
    console.error('Network Error:', error.message);
    showError("Erreur de connexion","la connexion au sereur à echoué");
    throw new Error('Network Error. Please check your internet connection.');
  } else {
    // Server error
    showError("Erreur de connexion","la connexion au sereur à echoué");
    console.error('Server Error:', error.response.status, error.response.data);
    throw new Error('An error occurred. Please try again later.');
  }


  return Promise.reject(error);
});

export const httpGet = async <T>(url: string, token: string | null) => {
  console.log("httpGet : ", url)
  return await http.get<T>(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response=>  response.data)
  .catch(err=>{
     console.log("http get error : " , err)
  });
};

export const get= async(url:string,token: string | null)=>{
  return http.get(url, {
      method: 'GET',
      withCredentials: true,
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
  }).catch(err=>{
    console.log("http get error : " , err)
 });
}

export const httpPost = async<T>(url: string, body: any, token: string) => {
  console.log("httpPost : ", url)
  return await http.post<T>(url, body, {
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
export const sendFileToServer = async (url:string,formData:FormData) => {
  try {
    const fileUri = 'file:///data/user/0/com.suivius/cache/Camera/4b3f3f6a-a26b-4eee-98a8-f5c772417700.jpg'; // Replace with the actual file URI

    const response = await http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'your_token', // Replace with the authorization token if required
      },
      onUploadProgress: (progressEvent:any) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        console.log(`Upload Progress: ${progress}%`);
      },
    });

    console.log('Upload response:', response.data);
  } catch (error:any) {
    console.log('File upload error:', error);
    if (error.response) {
      console.log('Response Data:', error.response.data);
      console.log('Response Status:', error.response.status);
      console.log('Response Headers:', error.response.headers);
    }
  }
};
export const httpUpload = async (url:string, body:any, token:string, onProgress:Function) => {
  console.log(url)
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