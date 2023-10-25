import axios from "axios"
import { env } from "process";



const http = axios.create({
    baseURL: 'https://rotafooddrf-production.up.railway.app/',
    // baseURL: 'http://127.0.0.1:8000/',

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