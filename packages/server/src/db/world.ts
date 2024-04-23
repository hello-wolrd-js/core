import { World } from '@core/models'
import { WorldModel } from './schema/world'
import { Types } from 'mongoose'
import { UserModel } from './schema/user'

//敏感字段
type SensitiveField = 'id' | 'checked' | 'owner'

//基本的增删改查
//#region

export const createWorld = async (world: Omit<World, SensitiveField | 'star'>, userId: string) => {
    const newWorld = new WorldModel({
        ...world,
        star: 0,
        checked: false,
        owner: new Types.ObjectId(userId)
    })
    await newWorld.save()

    const user = await UserModel.findById(userId)
    if (!user) throw '该用户不存在!'
    user.released_worlds.push(newWorld._id.toString())
    await user.save()

    return newWorld
}

export const getWorld = async (name?: string) => {
    const filter = name ? { name } : {}
    return await WorldModel.find(filter).populate('owner', 'id username role')
}

export const deleteWorld = async (id: string) => {
    return await WorldModel.deleteOne({ _id: id })
}

export const updateWorld = async (id: string, world: Omit<World, SensitiveField>) => {
    return await WorldModel.findByIdAndUpdate(id, world)
}

//#endregion

//审核
//#region
export const checkedWorld = async (id: string) => {
    //文档转移
    const world = await WorldModel.findById(id)
    if (!world) throw '无效世界id'
    world.checked = true
    return world
}
export const uncheckedWorld = async (id: string) => {
    //文档转移
    const world = await WorldModel.findById(id)
    if (!world) throw '无效世界id'
    world.checked = false
    return world
}
//#endregion

export default {
    createWorld,
    getWorld,
    deleteWorld,
    updateWorld,
    checkedWorld,
    uncheckedWorld
}
