import { Component, For, Show, onCleanup, onMount } from 'solid-js'
import { WorldCard } from '@/components/card/WorldCard'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { produce } from 'solid-js/store'
import { World } from '@core/models'
import { useUserStore } from '@stores/user'
import { useNavigate } from '@solidjs/router'
import { useWorldStore } from '@stores/world'
import { debounce } from 'lodash'
import { useStatusStore } from '@stores/status'

export const HomeView: Component = () => {
    //world
    //#region
    const userStore = useUserStore()
    const worldStore = useWorldStore()
    worldStore.getWorld({ status: 'checked' }).then((result) => {
        if (!isSuccessResponse(result)) toast.error('获取世界失败: ' + result.error)
    })
    //#endregion

    //handlers
    //#region
    const handleUpdateFavorite = async (world: World, action: 'add' | 'delete') => {
        const result =
            action === 'add'
                ? await userStore.addUserFavoriteWorld(world)
                : await userStore.deleteUserFavoriteWorld(world)
        if (isSuccessResponse(result)) {
            worldStore.setStore(
                'list',
                (w) => w.id === world.id,
                produce((world) => (action === 'add' ? world.star++ : world.star--))
            )
            toast.success(result.msg)
        } else {
            toast.error(result.error)
        }
    }
    const navigate = useNavigate()
    const statusStore = useStatusStore()
    const handleToWorld = (world: World) => {
        navigate('/world')
        statusStore.setStore('currentWorld', world)
    }
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

    const empty = (
        <div class="hero bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">暂无世界</h1>
                    <p class="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
            </div>
        </div>
    )

    return (
        <div ref={containerRef} class="flex justify-evenly flex-wrap h-full overflow-y-auto">
            <Show when={worldStore.state.list.length} fallback={empty}>
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
