import { UserLoginParams, User, WorldList, WorldQueryParams } from '@core/models'
import { handleRequest } from './handle'
import { USER_API_INSTANCE } from './instance'

//不鉴权的接口
//#region
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
//#endregion

//common级别鉴权的接口
//#region

//获取用户信息
export const getUserInfo = async () => {
    return await handleRequest<User>(() => USER_API_INSTANCE.get('/info'))
}

//更新用户的收藏: 增加/删除
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

//获取用户收藏的世界
export const getUserFavoriteWorlds = async (params?: WorldQueryParams) => {
    return await handleRequest<WorldList>(() =>
        USER_API_INSTANCE.get('/favorite/world', {
            params
        })
    )
}

//获取用户发布的世界
export const getUserReleasedWorlds = async (params?: WorldQueryParams) => {
    return await handleRequest<WorldList>(() =>
        USER_API_INSTANCE.get('/released/world', {
            params
        })
    )
}
//#endregion

export const USER_API = {
    login,
    register,
    getUserInfo,
    updateUserFavoriteWorld,
    getUserFavoriteWorlds,
    getUserReleasedWorlds
}
