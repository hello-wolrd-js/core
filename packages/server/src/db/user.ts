import { LoginParams } from '@core/models'
import { UserModel } from './schema/user'

export const getUser = async ({ username, password }: LoginParams) => {
    const user = await UserModel.findOne({ username })
    if (!user) throw '不存在该用户!'
    if (user.password !== password) throw '密码错误!'

    return user
}

export const createUser = async ({ username, password }: LoginParams) => {
    const user = await UserModel.findOne({ username })
    if (user) throw '存在同名用户!'

    return await UserModel.create({ username, password })
}

export default {
    getUser,
    createUser
}
