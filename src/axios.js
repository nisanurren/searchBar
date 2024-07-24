import axios from "axios";
import.meta.env.VITE_API_KEY

//const headers = {
//   Authorization: 'Bearer ' + apiKey,
//  'Content-Type': 'application/json'
//};

const axiosInstance = axios.create({
    baseURL: "https://api-prod.usefini.com",

});

axiosInstance.interceptors.request.use(
    (config) => {

        const apiKey = import.meta.env.VITE_API_KEY


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
