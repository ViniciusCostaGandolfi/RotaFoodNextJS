import axios from "axios"
import { env } from "process";


const url = env.API_PRODUCTION_URL

export const httpServer = axios.create({
    baseURL: url,
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    } 
});  
