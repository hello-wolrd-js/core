import { UserLoginParams, User } from '@core/models'
import { handleRequest } from './handle'
import { USER_API_INSTANCE } from './instance'

export const login = async (params: UserLoginParams) => {
    return await handleRequest<{ user: User; token: string }>(() =>
        USER_API_INSTANCE.post('/login', params)
    )
}

export const getUserInfo = async () => {
    return await handleRequest<User>(() => USER_API_INSTANCE.get('/info'))
}

export const updateUserFavoriteWorld = async (worldId: string) => {
    return await handleRequest<string[]>(() =>
        USER_API_INSTANCE.put('/favorite/world', {
            world_id: worldId
        })
    )
}

export const USER_API = { login, getUserInfo, updateUserFavoriteWorld }
