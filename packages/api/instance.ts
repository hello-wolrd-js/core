import axios from 'axios'
const baseUrl = 'http://tyee.life:4000'

const createAPI = (url: string) => {
    return axios.create({
        baseURL: baseUrl + url
    })
}
export const WORLD_API_INSTANCE = createAPI('/world')
export const USER_API_INSTANCE = createAPI('/user')
