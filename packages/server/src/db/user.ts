import { UserLoginParams } from '@core/models'
import { UserModel } from './schema/user'
import { WorldModel } from './schema/world'

export const login = async ({ username, password }: UserLoginParams) => {
    const user = await UserModel.findOne({ username }).populate([
        'released_worlds',
        'favorite_worlds'
    ])
    if (!user) throw '该用户不存在!'
    if (user.password !== password) throw '密码错误!'
    return user.getInfo()
}

export const createUser = async ({ username, password }: UserLoginParams) => {
    const user = await UserModel.findOne({ username })
    if (user) throw '存在同名用户!'
    //通过接口创建的用户只能是common, 管理员必须手动改
    return (await UserModel.create({ username, password, role: 'common' })).getInfo()
}

export const getUser = async (id: string) => {
    const user = await UserModel.findById(id).populate(['released_worlds', 'favorite_worlds'])
    if (!user) throw '该用户不存在!'
    return user.getInfo()
}

export const updateUserFavoriteWorld = async (userId: string, worldId: string) => {
    const user = await UserModel.findById(userId)
    if (!user) throw '该用户不存在!'

    try {
        await WorldModel.findById(worldId)
    } catch {
        throw '目标世界不存在!'
    }
    if (user.favorite_worlds.indexOf(worldId) === -1) {
        user.favorite_worlds.push(worldId)
        await user.save()
    }
    return user.favorite_worlds
}

export default {
    login,
    createUser,
    getUser,
    updateUserFavoriteWorld
}
