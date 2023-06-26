import axios from "axios";
import { BASE_API_URL } from "../js/script";

const axiosClient = axios.create({
    baseURL: BASE_API_URL
})
axiosClient.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('TOKEN')}`
    config.headers['Access-Control-Allow-Origin'] = `*`
    config.headers['Access-Control-Allow-Methods'] = "OPTIONS, DELETE, POST, GET, PATCH, PUT";
    return config
})
export default axiosClient