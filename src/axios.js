import axios from "axios";

//const headers = {
//   Authorization: 'Bearer ' + apiKey,
//  'Content-Type': 'application/json'
//};

const axiosInstance = axios.create({
    baseURL: "https://api-prod.usefini.com",

});

axiosInstance.interceptors.request.use(
    (config) => {

        const apiKey = localStorage.getItem('apiKey')


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
