import axios from 'axios'
import localStorageUtil from './localStorage'
import url from '../Url'

const axiosInstance = axios.create({
    baseURL: url
});

axiosInstance.interceptors.request.use((config)=> {
    const token = localStorageUtil.getDecryptedItem("token")

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
}, (error)=> {
    return Promise.reject(error)
})

export default axiosInstance;