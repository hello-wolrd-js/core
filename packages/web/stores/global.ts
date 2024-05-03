import { World } from '@core/models'
import { createStore } from 'solid-js/store'
import mitt, { Emitter } from 'mitt'
import { JSXElement } from 'solid-js'

type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
interface GlobalStoreState {
    current: {
        world: World | null
    }
    nav: {
        height: number
        extra: JSXElement
    }
    content: {
        width: number
        height: number
        size: ScreenSize
    }
}

//尝试获取currentWorld用于刷新后也能加载出
const _currWorld = sessionStorage.getItem('current-world')
const getScreenSize = (width: number = document.body.clientWidth): ScreenSize => {
    if (width > 1536) {
        return '2xl'
    } else if (width > 1280) {
        return 'xl'
    } else if (width > 1024) {
        return 'lg'
    } else if (width > 768) {
        return 'md'
    } else {
        return 'sm'
    }
}
const [store, setStore] = createStore<GlobalStoreState>({
    current: {
        world: _currWorld ? JSON.parse(_currWorld) : null
    },
    nav: {
        height: 64,
        extra: null
    },
    content: {
        width: document.body.clientWidth,
        height: document.body.clientHeight - 64,
        size: getScreenSize()
    }
})

const emitter = mitt() as Emitter<{
    'refresh-worlds': void
}>

window.addEventListener('resize', () => {
    setStore('content', 'width', document.body.clientWidth)
    setStore('content','size',getScreenSize())
})

export const useGlobalStore = () => {
    return {
        state: store,
        setStore,
        emitter
    }
}
