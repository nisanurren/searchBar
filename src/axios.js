import axios from "axios";
import { store } from './store'

//const headers = {
//   Authorization: 'Bearer ' + apiKey,
//  'Content-Type': 'application/json'
//};

const axiosInstance = axios.create({
    baseURL: "https://api-prod.usefini.com",

});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const apiKey = state.user.apiKey;

        if (apiKey) {
            config.headers.Authorization = `Bearer ${apiKey}`;
        }

        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;
