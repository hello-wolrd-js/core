import {
    World,
    WorldCreateParams,
    WorldList,
    WorldQueryParams,
    WorldUpdateParams
} from '@core/models'
import { WORLD_API_INSTANCE } from './instance'
import { handleRequest } from './handle'

//common级接口
//#region

//获取世界
export async function getWorld(params?: WorldQueryParams) {
    return await handleRequest<WorldList>(() =>
        WORLD_API_INSTANCE.get('/', {
            params
        })
    )
}

//获取star最多的世界
export async function getMostStarWorld(limit: number) {
    return await handleRequest<World[]>(() =>
        WORLD_API_INSTANCE.get('/most/star', {
            params: {
                limit
            }
        })
    )
}

//删除世界
export async function deleteWorld(id: string) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.delete('/', {
            params: {
                id
            }
        })
    )
}

//举报世界
export async function reportWorld(id: string, reason: string) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.put('/report', {
            id,
            reason
        })
    )
}

//创建世界
export async function createWorld(world: WorldCreateParams) {
    return await handleRequest<World>(() => WORLD_API_INSTANCE.post('/', world))
}

//更新世界信息
export async function updateWorld(newWorld: WorldUpdateParams, id: World['id']) {
    return await handleRequest<World>(() =>
        WORLD_API_INSTANCE.put('/', newWorld, {
            params: {
                id
            }
        })
    )
}
//#endregion

//admin级接口
//#region
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
//#endregion

export const WORLD_API = {
    getWorld,
    deleteWorld,
    createWorld,
    updateWorld,
    checkWorld,
    uncheckWorld,
    getMostStarWorld,
    reportWorld
}
