import { WorldCardBaseProps, WorldList, WorldQueryParams } from '@core/models'
import { createStore, produce } from 'solid-js/store'
import { useEmptyResult, useToWorldFn, useUpdateUserFavoriteFn } from '.'
import { debounce } from 'lodash'
import { onMount, onCleanup, For, Show, JSXElement } from 'solid-js'
import { Opacity } from '@components/transition/Opacity'

export const useEmptyWorldList = (): WorldList => {
    return {
        list: [],
        totalItems: 0,
        totalPages: 0
    }
}

export const useWorldList = ({
    getter,
    refresh = true,
    init = true,
    empty = useEmptyResult('暂无世界')
}: {
    getter: (params?: WorldQueryParams) => Promise<WorldList>
    init?: boolean //是否初始获取一次
    empty?: JSXElement //为空时展示
    refresh?:
        | {
              distance?: number
              debounce?: number
              onBeforeRefresh?: () => void | Promise<void>
              onRefreshed?: () => void | Promise<void>
              onAllRefreshed?: () => void | Promise<void>
          }
        | boolean
}) => {
    //默认配置
    //#region
    const _originRefresh = typeof refresh === 'boolean' ? {} : refresh
    const _refresh = { ..._originRefresh, debounce: 300, distance: 200 }
    //#endregion

    //内部状态
    //#region
    const [store, setStore] = createStore<WorldList>({
        list: [],
        totalItems: 0,
        totalPages: 0
    })
    //#endregion

    //查询参数
    //#region
    const pagination = {
        page: 1,
        pageSize: 10
    }
    const [params, setParams] = createStore({
        ...pagination
    })
    //#endregion

    //初始化
    //#region
    init && getter(params).then((res) => setStore(res))
    //#endregion

    //搜索
    //#region
    const handleSearch = async (queryParams?: WorldQueryParams) => {
        //!注意搜索前要重置分页
        setParams({ ...queryParams, ...pagination })
        setStore(await getter(params))
    }
    //#endregion

    //刷新
    //#region
    const handleRefresh = async () => {
        //!注意刷新前要重置分页
        setParams({ ...params, ...pagination })
        setStore(await getter(params))
    }
    //#endregion

    //分页下滑刷新
    //#region
    let containerRef: HTMLDivElement | undefined
    const _handleTouchDownRefresh = debounce(async () => {
        if (!containerRef) return

        //下滑距离判断
        if (
            containerRef.clientHeight + containerRef.scrollTop >=
            containerRef.scrollHeight - _refresh.distance
        ) {
            //大于总页数时说明刷新完毕
            if (store.list.length >= store.totalItems) return await _refresh.onAllRefreshed?.()

            await _refresh.onBeforeRefresh?.()
            //计算差值
            const diff = store.totalItems - store.list.length
            //更新分页参数
            setParams(
                produce((state) => {
                    state.page++
                    state.pageSize = diff > state.pageSize ? state.pageSize : diff
                })
            )
            //获取新值
            const result = await getter(params)
            //改变状态
            setStore(
                produce((state) => {
                    state.list = state.list.concat(result.list)
                    state.totalItems = result.totalItems
                    state.totalPages = result.totalPages
                })
            )
            await _refresh.onRefreshed?.()
        }
    }, _refresh.debounce)

    //监听与解除监听
    //#region
    onMount(() => {
        containerRef && refresh && containerRef.addEventListener('scroll', _handleTouchDownRefresh)
    })
    onCleanup(() => {
        containerRef &&
            refresh &&
            containerRef.removeEventListener('scroll', _handleTouchDownRefresh)
    })
    //#endregion

    //#endregion

    //component
    //#region
    const handleToWorld = useToWorldFn()
    const handleUpdateFavorite = useUpdateUserFavoriteFn(setStore)
    const WorldList = (wraper: (props: WorldCardBaseProps) => JSXElement): JSXElement => {
        return (
            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    'flex-wrap': 'wrap',
                    height: '100%',
                    'justify-content': 'space-evenly',
                    'overflow-y': 'auto'
                }}
            >
                <Show when={store.list.length} fallback={empty}>
                    <Opacity duration={[500, 250]} group={true}>
                        <For each={store.list}>
                            {/* 包装card */}
                            {(world) =>
                                wraper({
                                    world,
                                    onToWorld: handleToWorld
                                })
                            }
                        </For>
                    </Opacity>
                </Show>
            </div>
        )
    }
    //#endregion

    return {
        state: store,
        setStore,
        WorldList,
        handleUpdateFavorite,
        handleSearch,
        handleRefresh,
        handler: {
            search: handleSearch,
            updateFavorite: handleUpdateFavorite,
            refresh: handleRefresh
        }
    }
}
