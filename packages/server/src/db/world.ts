import { World } from '@core/models'
import { WorldModel } from './schema'

export const createWorld = async (world: Omit<World, 'id' | 'star'>) => {
    const newWorld = new WorldModel({
        ...world,
        star: 0
    })
    return await newWorld.save()
}
export const getWorld = async (name?: string) => {
    const filter = name ? { name } : {}
    return await WorldModel.find(filter)
}

export const deleteWorld = async (id: string) => {
    return await WorldModel.deleteOne({ _id: id })
}

export const updateWorld = async (id: string, world: Omit<World, 'id'>) => {
    return await WorldModel.findByIdAndUpdate(id, world)
}

export default {
    createWorld,
    getWorld,
    deleteWorld,
    updateWorld
}
