import { World } from '@core/models'
import { WORLD_API_INSTANCE } from './instance'
import { handleRequest } from './handle'
import { AxiosInstance } from 'axios'

export async function getWorld() {
    return await handleRequest<World[]>(() => WORLD_API_INSTANCE.get('/'))
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

export async function createWorld(world: Omit<World, 'id' | 'star' | 'checked'>) {
    return await handleRequest<World>(() => WORLD_API_INSTANCE.post('/', world))
}

export default {
    getWorld,
    deleteWorld,
    createWorld
}
