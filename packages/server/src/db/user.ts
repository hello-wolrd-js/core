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
    //通过接口创建的用户只能是common, 管理员必须手动改
    return await UserModel.create({ username, password, role: 'common' })
}

export default {
    getUser,
    createUser
}
