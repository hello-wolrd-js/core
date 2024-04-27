import { World, WorldQueryParams } from '@core/models'
import { createStore } from 'solid-js/store'
import mitt, { Emitter } from 'mitt'
interface GlobalStoreState {
    currentWorld: World | null
    navHeight: number
    contentHeight: number
    emitter: Emitter<{
        'search-world': WorldQueryParams
        'refresh-worlds': void
    }>
}

const [store, setStore] = createStore<GlobalStoreState>({
    currentWorld: null,
    navHeight: 64,
    contentHeight: document.body.clientHeight - 64,
    emitter: mitt()
})

export const useGlobalStore = () => {
    return {
        state: store,
        setStore
    }
}
