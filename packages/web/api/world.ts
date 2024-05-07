import {
    World,
    WorldCreateParams,
    WorldList,
    WorldQueryParams,
    WorldUpdateParams
} from '@core/models'
import { WORLD_API_INSTANCE } from './instance'
import { handleRequest } from './handle'

export async function getWorld(params?: WorldQueryParams) {
    return await handleRequest<WorldList>(() =>
        WORLD_API_INSTANCE.get('/', {
            params
        })
    )
}

export async function getMostStarWorld(limit: number) {
    return await handleRequest<World[]>(() =>
        WORLD_API_INSTANCE.get('/most/star', {
            params: {
                limit
            }
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
        WORLD_API_INSTANCE.put('/check', {
            id
        })
    )
}
export async function uncheckWorld(id: string) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.put('/uncheck', {
            id
        })
    )
}
export async function reportWorld(id: string, reason: string) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.put('/report', {
            id,
            reason
        })
    )
}

export async function createWorld(world: WorldCreateParams) {
    return await handleRequest<World>(() => WORLD_API_INSTANCE.post('/', world))
}

export async function updateWorld(newWorld: WorldUpdateParams, id: World['id']) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.put('/', newWorld, {
            params: {
                id
            }
        })
    )
}

export const WORLD_API = {
    getWorld,
    deleteWorld,
    createWorld,
    updateWorld,
    checkWorld,
    uncheckWorld,
    getMostStarWorld
}
