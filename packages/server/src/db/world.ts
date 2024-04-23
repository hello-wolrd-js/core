import { World, WorldStatus } from '@core/models'
import { ArchivedWorldModel, CheckedWorldModel, UncheckedWorldModel } from './schema'
import { Types } from 'mongoose'
import { UserModel } from './schema/user'

//敏感字段
type SensitiveField = 'id' | 'checked' | 'owner'

//基本的增删改查
//#region

export const createWorld = async (world: Omit<World, SensitiveField | 'star'>, userId: string) => {
    const newWorld = new ArchivedWorldModel({
        ...world,
        star: 0,
        checked: false,
        owner: new Types.ObjectId()
    })
    await newWorld.save()

    const user = await UserModel.findById(userId)
    if (!user) throw '该用户不存在!'
    user.released_worlds.push(newWorld.id)
    await user.save()

    return await UncheckedWorldModel.create(newWorld.toObject())
}

export const getWorld = async (status: WorldStatus | string, name?: string) => {
    const filter = name ? { name } : {}
    switch (status) {
        case 'checked':
            return await CheckedWorldModel.find(filter).populate('owner', 'id username role')
        case 'unchecked':
            return await UncheckedWorldModel.find(filter).populate('owner', 'id username role')
        case 'archived':
            return await ArchivedWorldModel.find(filter).populate('owner', 'id username role')
        default:
            throw '世界状态参数错误!'
    }
}

export const deleteWorld = async (id: string) => {
    return await CheckedWorldModel.deleteOne({ _id: id })
}

export const updateWorld = async (id: string, world: Omit<World, SensitiveField>) => {
    return await CheckedWorldModel.findByIdAndUpdate(id, world)
}

//#endregion

//审核
//#region
export const checkedWorld = async (id: string) => {
    //文档转移
    const world = await UncheckedWorldModel.findById(id)
    const _archivedWorld = await ArchivedWorldModel.findById(id)
    if (!world || !_archivedWorld) throw '无效世界id'

    _archivedWorld.checked = world.checked = true
    await CheckedWorldModel.create(world.toObject())
    await _archivedWorld.save()
    await world.deleteOne()
}
export const uncheckedWorld = async (id: string) => {
    //文档转移
    const world = await CheckedWorldModel.findById(id)
    const _archivedWorld = await ArchivedWorldModel.findById(id)
    if (!world || !_archivedWorld) throw '无效世界id'

    _archivedWorld.checked = world.checked = false
    await UncheckedWorldModel.create(world.toObject())
    await _archivedWorld.save()
    await world.deleteOne()
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
