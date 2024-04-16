import { WorldCard } from '@core/models'
import { WORLD_API_INSTANCE } from './instance'
import { handleRequest } from './handle'

export async function getWorldCard() {
    return await handleRequest<WorldCard[]>(() => WORLD_API_INSTANCE.get('/card'))
}
export async function deleteWorld(id: string) {
    return await handleRequest<WorldCard>(() =>
        WORLD_API_INSTANCE.delete('/', {
            params: {
                id
            }
        })
    )
}

export default {
    getWorldCard
}
