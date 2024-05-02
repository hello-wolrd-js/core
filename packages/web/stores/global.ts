import { World } from '@core/models'
import { createStore } from 'solid-js/store'
import mitt, { Emitter } from 'mitt'
import { JSXElement } from 'solid-js'
interface GlobalStoreState {
    current: {
        world: World | null
    }
    nav: {
        height: number
        extra: JSXElement
    }
    content: {
        height: number
    }
}

//尝试获取currentWorld用于刷新后也能加载出
const _currWorld = sessionStorage.getItem('current-world')
const [store, setStore] = createStore<GlobalStoreState>({
    current: {
        world: _currWorld ? JSON.parse(_currWorld) : null
    },
    nav: {
        height: 64,
        extra: null
    },
    content: {
        height: document.body.clientHeight - 64
    }
})

const emitter = mitt() as Emitter<{
    'refresh-worlds': void
}>

export const useGlobalStore = () => {
    return {
        state: store,
        setStore,
        emitter
    }
}
