import { LoginParams, User } from '@core/models'
import { handleRequest } from './handle'
import { USER_API_INSTANCE } from './instance'

export const login = async (params: LoginParams) => {
    return await handleRequest<User>(() => USER_API_INSTANCE.post('/login', params))
}

export default { login }
