import { WORLD_API } from '@api/world'
import { World, WorldQueryParams } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { createStore, produce } from 'solid-js/store'

interface WorldStoreState {
    worlds: World[]
}

const [store, setStore] = createStore<WorldStoreState>({
    worlds: []
})

const getWorld = async (params?: WorldQueryParams) => {
    const result = await WORLD_API.getWorld(params)
    if (isSuccessResponse(result)) {
        setStore({ worlds: result.data })
    }
    return result
}

const deleteWorld = async (id: string) => {
    const result = await WORLD_API.deleteWorld(id)
    if (isSuccessResponse(result)) {
        // 这里之后可以改成再次请求覆盖为最新的状态
        setStore((state) => ({
            ...state,
            worlds: state.worlds.filter((w) => w.id !== id)
        }))
    }
    return result
}

const checkWorld = async (id: string) => {
    const result = await WORLD_API.checkWorld(id)
    if (isSuccessResponse(result)) {
        setStore(
            'worlds',
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
            'worlds',
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
        uncheckWorld
    }
}
