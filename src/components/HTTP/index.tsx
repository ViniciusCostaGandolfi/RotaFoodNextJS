import axios from "axios"



const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_PRODUCTION_URL: process.env.NEXT_PUBLIC_API_LOCAL_URL,

    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    } 
});  




http.interceptors.request.use( function (config) {
    const token = sessionStorage.getItem('acess_token')
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
    }, function (error) {
        console.log('Erro no interceptador do axios!!!');
        return Promise.reject(error);
    } )

axios.interceptors.request.use( function (config) {
    const token = sessionStorage.getItem('acess_token')
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
    }, function (error) {
        console.log('Erro no interceptador do axios!');
        return Promise.reject(error);
    } )

export default http;