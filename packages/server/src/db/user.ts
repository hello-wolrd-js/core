import { UserLoginParams, World } from '@core/models'
import { UserModel } from './schema/user'
import { WorldModel } from './schema/world'
import { Types } from 'mongoose'

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
    const user = await UserModel.findById(id)
    if (!user) throw '该用户不存在!'
    return user.getInfo()
}

export const updateUserFavoriteWorld = async (
    userId: string,
    worldId: string,
    action: 'add' | 'delete' | string
) => {
    if (action !== 'add' && action !== 'delete') throw '无效action参数: 应为 add / delete'
    //注意这里不填充!
    const user = await UserModel.findById(userId)
    if (!user) throw '该用户不存在!'

    const world = await WorldModel.findById(worldId)
    if (!world) throw '目标世界不存在!'

    let _tmp = user.favorite_worlds
    if (action === 'add' && _tmp.findIndex((v) => v.toString() === worldId) === -1) {
        _tmp.push(new Types.ObjectId(worldId))
        world.star++
    } else if (action === 'delete' && _tmp.findIndex((v) => v.toString() === worldId) !== -1) {
        _tmp = _tmp.filter((id) => id.toString() !== worldId)
        world.star--
    }
    user.favorite_worlds = _tmp
    await world.save()
    await user.save()
    return _tmp
}

export const getUserFavoriteWorlds = async (userId: string) => {
    const user = await UserModel.findById(userId).populate('favorite_worlds')
    if (!user) throw '该用户不存在!'

    return user.favorite_worlds as unknown as World[]
}

export const getUserReleasedWorlds = async (userId: string) => {
    const user = await UserModel.findById(userId).populate('released_worlds')
    if (!user) throw '该用户不存在!'

    return user.released_worlds as unknown as World[]
}

export default {
    login,
    createUser,
    getUser,
    updateUserFavoriteWorld,
    getUserFavoriteWorlds,
    getUserReleasedWorlds
}
