import { World, WorldQueryParams } from '@core/models'
import { createStore } from 'solid-js/store'
import mitt, { Emitter } from 'mitt'
import { JSXElement } from 'solid-js'
interface GlobalStoreState {
    current: {
        world: World | null
    }
    nav: {
        height: number
        search: JSXElement
    }
    content: {
        height: number
    }
}

const [store, setStore] = createStore<GlobalStoreState>({
    current: {
        world: null
    },
    nav: {
        height: 64,
        search: null
    },
    content: {
        height: document.body.clientHeight - 64
    }
})

export const useGlobalStore = () => {
    return {
        state: store,
        setStore,
        emitter: mitt() as Emitter<{
            'search-world': WorldQueryParams
            'refresh-worlds': void
        }>
    }
}
