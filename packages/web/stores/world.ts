import { WORLD_API } from '@api/world'
import { World, WorldList, WorldQueryParams } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { createStore, produce } from 'solid-js/store'

interface WorldStoreState extends WorldList {
    queryParams?: WorldQueryParams
}

// const _worldMap = new Map<string, World>()
const [store, setStore] = createStore<WorldStoreState>({
    list: [],
    totalItems: 0,
    totalPages: 0,
    queryParams: void 0
})

const getWorld = async (params?: WorldQueryParams) => {
    const result = await WORLD_API.getWorld({ ...store.queryParams, ...params })
    if (isSuccessResponse(result)) {
        setStore(
            produce((state) => {
                //去重
                state.list = state.list.concat(
                    result.data.list.filter(
                        (v, i, a) => a.findIndex((t) => t.id === v.id && t.name === v.name) === i
                    )
                )
            })
        )
        setStore('totalItems', result.data.totalItems)
        setStore('totalPages', result.data.totalPages)
    }
    return result
}

const refreshWorld = async (status?: 'checked' | 'unchecked') => {
    const result = await WORLD_API.getWorld({
        pageSize: `${store.list.length}`,
        status
    })
    if (isSuccessResponse(result)) {
        setStore('list', result.data.list)
        setStore('totalItems', result.data.totalItems)
        setStore('totalPages', result.data.totalPages)
    }
    return result
}

const deleteWorld = async (id: string) => {
    const result = await WORLD_API.deleteWorld(id)
    if (isSuccessResponse(result)) {
        setStore(
            produce((state) => {
                state.list = state.list.filter((w) => w.id !== id)
            })
        )
    }
    return result
}

const checkWorld = async (id: string) => {
    const result = await WORLD_API.checkWorld(id)
    if (isSuccessResponse(result)) {
        setStore(
            'list',
            (world) => world.id === id,
            produce((world) => (world.status = 'checked'))
        )
    }
    return result
}
const uncheckWorld = async (id: string) => {
    const result = await WORLD_API.uncheckWorld(id)
    if (isSuccessResponse(result)) {
        setStore(
            'list',
            (world) => world.id === id,
            produce((world) => (world.status = 'unchecked'))
        )
    }
    return result
}

export const useWorldStore = () => {
    return {
        state: store, //为了避免歧义
        getWorld,
        deleteWorld,
        checkWorld,
        uncheckWorld,
        setStore,
        refreshWorld
    }
}
