import { World } from '@core/models'
import { WORLD_API_INSTANCE } from './instance'
import { handleRequest } from './handle'

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

export default {
    getWorld,
    deleteWorld
}
