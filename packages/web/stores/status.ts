import { World } from '@core/models'
import { createStore } from 'solid-js/store'

interface StatusStoreState {
    currentWorld: World | null
    navHeight: number
    contentHeight: number
}

const [store, setStore] = createStore<StatusStoreState>({
    currentWorld: null,
    navHeight: 64,
    contentHeight: document.body.clientHeight - 64
})

export const useStatusStore = () => {
    return {
        state: store,
        setStore
    }
}
