import { WorldList } from '@core/models'
import { createStore, produce } from 'solid-js/store'
import { useEmptyResult, useToWorldFn, useUpdateUserFavoriteFn } from '.'
import { debounce } from 'lodash'
import { onMount, onCleanup, For, Show } from 'solid-js'
import { WorldCard } from '../client/src/components/card/WorldCard'

export const useEmptyWorldList = (): WorldList => {
    return {
        list: [],
        totalItems: 0,
        totalPages: 0
    }
}

export const useWorldList = (options: {
    getter: () => Promise<WorldList>
    init: boolean
    refresh: {
        getter: (page: number, pageSize: number) => Promise<WorldList>
        refreshDistance: number
    }
}) => {
    const [store, setStore] = createStore<WorldList>({
        list: [],
        totalItems: 0,
        totalPages: 0
    })
    options.init && options.getter().then((res) => setStore(res))

    //分页下滑刷新
    //#region
    let containerRef: HTMLDivElement | undefined
    let page = 1
    const pageSize = 10
    const handleTouchDownRefresh = debounce(async () => {
        //大于总页数时要退出
        if (!containerRef || store.list.length >= store.totalItems) return
        //下滑距离判断
        if (
            containerRef.clientHeight + containerRef.scrollTop >=
            containerRef.scrollHeight - options.refresh.refreshDistance
        ) {
            //计算差值
            const diff = store.totalItems - store.list.length
            const result = await options.refresh.getter(page++, diff > pageSize ? pageSize : diff)
            setStore(
                produce((state) => {
                    //去重
                    state.list = state.list.concat(
                        result.list.filter(
                            (v, i, a) =>
                                a.findIndex((t) => t.id === v.id && t.name === v.name) === i
                        )
                    )
                })
            )
            setStore('totalItems', result.totalItems)
            setStore('totalPages', result.totalPages)
        }
    }, 500)
    //监听与解除监听
    onMount(() => {
        containerRef && containerRef.addEventListener('scroll', handleTouchDownRefresh)
    })
    onCleanup(() => {
        containerRef && containerRef.removeEventListener('scroll', handleTouchDownRefresh)
    })
    //#endregion

    //JSX
    //#region
    const handleToWorld = useToWorldFn()
    const handleUpdateFavorite = useUpdateUserFavoriteFn(setStore)
    const WorldList = (
        <div ref={containerRef} class="flex justify-evenly flex-wrap h-full overflow-y-auto">
            <Show when={store.list.length} fallback={useEmptyResult('暂无世界')}>
                <For each={store.list}>
                    {(world) => (
                        <WorldCard
                            world={world}
                            onUpdateFavorite={handleUpdateFavorite}
                            onToWorld={handleToWorld}
                        ></WorldCard>
                    )}
                </For>
            </Show>
        </div>
    )
    //#endregion

    return {
        state: store,
        WorldList
    }
}
