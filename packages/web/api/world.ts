import { World, WorldQueryParams } from '@core/models'
import { WORLD_API_INSTANCE } from './instance'
import { handleRequest } from './handle'

export async function getWorld(params?: WorldQueryParams) {
    return await handleRequest<World[]>(() =>
        WORLD_API_INSTANCE.get('/', {
            params
        })
    )
}
export async function deleteWorld(id: string) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.delete('/', {
            params: {
                id
            }
        })
    )
}

export async function checkWorld(id: string) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.post('/check', {
            id
        })
    )
}
export async function uncheckWorld(id: string) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.post('/uncheck', {
            id
        })
    )
}

export async function createWorld(world: Omit<World, 'id' | 'star' | 'status' | 'owner'>) {
    return await handleRequest<World>(() => WORLD_API_INSTANCE.post('/', world))
}

export const WORLD_API = {
    getWorld,
    deleteWorld,
    createWorld,
    checkWorld,
    uncheckWorld
}
