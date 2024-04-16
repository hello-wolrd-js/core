import { WorldCard } from '@core/models'
import { WORLD_API_INSTANCE } from './instance'
import { handleRequest } from './handle'

export async function getWorldCard() {
    return await handleRequest<WorldCard[]>(() => WORLD_API_INSTANCE.get('/card'))
}

export default {
    getWorldCard
}
