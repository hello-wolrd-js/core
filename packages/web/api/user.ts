import { UserLoginParams, User, WorldList, WorldQueryParams } from '@core/models'
import { handleRequest } from './handle'
import { USER_API_INSTANCE } from './instance'

export const login = async (params: UserLoginParams) => {
    return await handleRequest<{ user: User; token: string }>(() =>
        USER_API_INSTANCE.post('/login', params)
    )
}

export const register = async (params: UserLoginParams) => {
    return await handleRequest<{ user: User; token: string }>(() =>
        USER_API_INSTANCE.post('/register', params)
    )
}

export const getUserInfo = async () => {
    return await handleRequest<User>(() => USER_API_INSTANCE.get('/info'))
}

export const updateUserFavoriteWorld = async (id: string, action: 'add' | 'delete') => {
    return await handleRequest<string[]>(() =>
        USER_API_INSTANCE.put('/favorite/world', null, {
            params: {
                world_id: id,
                action
            }
        })
    )
}

export const getUserFavoriteWorlds = async (params?: WorldQueryParams) => {
    return await handleRequest<WorldList>(() =>
        USER_API_INSTANCE.get('/favorite/world', {
            params
        })
    )
}

export const getUserReleasedWorlds = async (params?: WorldQueryParams) => {
    return await handleRequest<WorldList>(() =>
        USER_API_INSTANCE.get('/released/world', {
            params
        })
    )
}

export const USER_API = {
    login,
    register,
    getUserInfo,
    updateUserFavoriteWorld,
    getUserFavoriteWorlds,
    getUserReleasedWorlds
}
