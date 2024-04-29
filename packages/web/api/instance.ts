import { useUserStore } from '@stores/user'
import axios, { AxiosRequestHeaders } from 'axios'
import config from '@root/hwjs.config'

const baseUrl = `${config.server.host}:${config.server.port}`

const createAPI = (url: string) => {
    const _instance = axios.create({
        baseURL: baseUrl + url
    })
    _instance.interceptors.request.use((config) => {
        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders
        }
        config.headers.Authorization = 'Bearer ' + useUserStore().state.token
        return config
    })
    return _instance
}
export const WORLD_API_INSTANCE = createAPI('/world')
export const USER_API_INSTANCE = createAPI('/user')
