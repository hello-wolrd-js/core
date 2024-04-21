import { LoginParams, User } from '@core/models'
import { handleRequest } from './handle'
import { USER_API_INSTANCE } from './instance'

export const login = async (params: LoginParams) => {
    return await handleRequest<{ user: User; token: string }>(() =>
        USER_API_INSTANCE.post('/login', params)
    )
}

export const getUserInfo = async () => {
    return await handleRequest<User>(() => USER_API_INSTANCE.get('/info'))
}

export default { login, getUserInfo }
