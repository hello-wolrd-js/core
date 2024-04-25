import { Component, For, Show, onCleanup, onMount } from 'solid-js'
import { WorldCard } from '@/components/card/WorldCard'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { useWorldStore } from '@stores/world'
import { debounce } from 'lodash'
import { useEmptyResult, useToWorldFn, useUpdateFavoriteFn } from '@hooks/index'

export const HomeView: Component = () => {
    //world
    //#region
    const worldStore = useWorldStore()
    worldStore.getWorld({ status: 'checked' }).then((result) => {
        if (!isSuccessResponse(result)) toast.error('获取世界失败: ' + result.error)
    })
    //#endregion

    //handlers
    //#region
    const handleUpdateFavorite = useUpdateFavoriteFn()
    const handleToWorld = useToWorldFn()
    //#endregion

    //滚动条下滑无感加载
    //#region

    let containerRef: HTMLDivElement | undefined
    const refreshDistance = 300
    //分页参数
    let page = 1
    const pageSize = 10
    //handler
    const handleTouchDownRefresh = debounce(async () => {
        //大于总页数时要退出
        if (!containerRef || worldStore.state.list.length >= worldStore.state.totalItems) return
        //下滑距离判断
        if (
            containerRef.clientHeight + containerRef.scrollTop >=
            containerRef.scrollHeight - refreshDistance
        ) {
            //计算差值
            const diff = worldStore.state.totalItems - worldStore.state.list.length
            const result = await worldStore.getWorld({
                page: `${page++}`,
                pageSize: `${diff > pageSize ? pageSize : diff}`,
                status: 'checked'
            })
            //获取失败提示
            if (!isSuccessResponse(result)) toast.success(result.error)
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

    return (
        <div ref={containerRef} class="flex justify-evenly flex-wrap h-full overflow-y-auto">
            <Show when={worldStore.state.list.length} fallback={useEmptyResult('暂无世界')}>
                <For each={worldStore.state.list}>
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
}
