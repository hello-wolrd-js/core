import { LoginParams } from '@core/models'
import { UserModel } from './schema/user'

export const login = async ({ username, password }: LoginParams) => {
    const user = await UserModel.findOne({ username })
    if (!user) throw '不存在该用户!'
    if (user.password !== password) throw '密码错误!'
    return user.getInfo()
}

export const createUser = async ({ username, password }: LoginParams) => {
    const user = await UserModel.findOne({ username })
    if (user) throw '存在同名用户!'
    //通过接口创建的用户只能是common, 管理员必须手动改
    return (await UserModel.create({ username, password, role: 'common' })).getInfo()
}

export const getUser = async (id: string) => {
    const user = await UserModel.findById(id)
    if (!user) throw '不存在该用户!'
    return user.getInfo()
}

export default {
    login,
    createUser,
    getUser
}
