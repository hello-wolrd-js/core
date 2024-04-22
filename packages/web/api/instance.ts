import { useUserStore } from '@stores'
import axios, { AxiosRequestHeaders } from 'axios'
const baseUrl = 'http://tyee.life:4000'

const userStore = useUserStore()
const createAPI = (url: string) => {
    const _instance = axios.create({
        baseURL: baseUrl + url
    })
    _instance.interceptors.request.use((config) => {
        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders
        }
        config.headers.Authorization = 'Bearer ' + userStore.store.token
        return config
    })
    return _instance
}
export const WORLD_API_INSTANCE = createAPI('/world')
export const USER_API_INSTANCE = createAPI('/user')
