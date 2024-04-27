import { World } from '@core/models'
import { createStore } from 'solid-js/store'

interface GlobalStoreState {
    currentWorld: World | null
    navHeight: number
    contentHeight: number
}

const [store, setStore] = createStore<GlobalStoreState>({
    currentWorld: null,
    navHeight: 64,
    contentHeight: document.body.clientHeight - 64
})

export const useGlobalStore = () => {
    return {
        state: store,
        setStore
    }
}
