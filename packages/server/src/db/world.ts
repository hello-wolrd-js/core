import { World } from '@core/models'
import { ArchivedWorldModel, CheckedWorldModel, UncheckedWorldModel } from './schema'

//敏感字段
type SensitiveField = 'id' | 'checked'

export const createWorld = async (world: Omit<World, SensitiveField | 'star'>) => {
    const newWorld = new ArchivedWorldModel({
        ...world,
        star: 0,
        checked: false
    })
    await newWorld.save()
    return await UncheckedWorldModel.create(newWorld.toObject())
}
export const getWorld = async (name?: string) => {
    const filter = name ? { name } : {}
    return await CheckedWorldModel.find(filter)
}

export const deleteWorld = async (id: string) => {
    return await CheckedWorldModel.deleteOne({ _id: id })
}

export const updateWorld = async (id: string, world: Omit<World, SensitiveField>) => {
    return await CheckedWorldModel.findByIdAndUpdate(id, world)
}

//审核
//#region
export const checkedWorld = async (id: string) => {
    //文档转移
    const world = await UncheckedWorldModel.findById(id)
    if (!world) throw '无效世界id'
    world.checked = true
    await CheckedWorldModel.create(world.toObject())
    await world.deleteOne()
}
export const uncheckedWorld = async (id: string) => {
    //文档转移
    const world = await CheckedWorldModel.findById(id)
    if (!world) throw '无效世界id'
    world.checked = false
    await UncheckedWorldModel.create(world.toObject())
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
