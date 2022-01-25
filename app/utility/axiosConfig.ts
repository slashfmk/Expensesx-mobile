import axios, { AxiosRequestConfig } from 'axios';
import tokenStorage from './storage';
import {SecureStore} from "expo";


// const axiosDefault = async () =>  {
//     const token = await tokenStorage.getToken();
//     try{
//         if(!token) return null;
//         axios.defaults.headers.common["Authorization"] = token.getToken();
//     }catch (e) {
//         console.log(e);
//     }
//
// }


axios.interceptors.request.use(
    //@ts-ignore
    async (config: AxiosRequestConfig) => {

    try{
        //@ts-ignore
       // const token = await tokenStorage.getToken();
        const token = await SecureStore.getItemAsync("token");
        console.log(token);

        if(!token) return null;
        // @ts-ignore
        config.headers.Authorization =  token;
    }catch (e) {
        console.log(e);
    }
    return config;
});


// @ts-ignore
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if(expectedError){
       //   logger.log(error);
       // console.log(expectedError);
    }

    return Promise.reject(error);
});


// export default axiosDefault;
