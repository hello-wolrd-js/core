import { Component, onCleanup, onMount } from 'solid-js'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { WORLD_API } from '@api/world'
import { WorldCard } from '@/components/card/WorldCard'
import { useAwait } from '@hooks/index'
import { useGlobalStore } from '@stores/global'
import { Search } from '@/components/search/Search'
import { useWorldLoading } from '@components/world/Load'

export const HomeView: Component = () => {
    const { WorldList, handleUpdateFavorite, handleSearch, handleRefresh, state } = useWorldList({
        async getter(params) {
            const result = await WORLD_API.getWorld({ ...params, status: 'checked' })
            //获取失败时才提示
            if (isSuccessResponse(result)) {
                return result.data
            } else {
                toast.error(result.error)
                return useEmptyWorldList()
            }
        },
        init: true,
        refresh: {
            onBeforeRefresh: async () => {
                toast.loading('正在加载更多', { duration: 1000 })
                await useAwait(1000)
            },
            onAllRefreshed: () => {
                toast.success('已经到底啦!')
            }
        }
    })



    //事件
    //#region
    const { emitter, setStore } = useGlobalStore()
    emitter.on('refresh-worlds', async () => {
        await handleRefresh()
        toast.success('刷新成功', { duration: 1000 })
    })
    onCleanup(() => emitter.off('refresh-worlds'))
    //#endregion

    //导航栏拓展
    //#region
    const handleSearchWorld = async (name: string) => await handleSearch({ name })

    const NavExtra = (
        <div class="flex justify-center items-center">
            <Search onInput={handleSearchWorld} debounce={{ wait: 500 }} placeholder="搜搜看?" />
            <div class="ml-5">总数: {state.totalItems}</div>
        </div>
    )
    onMount(() => {
        setStore('nav', 'extra', NavExtra)
        useWorldLoading()?.begin()
    })
    onCleanup(() => setStore('nav', 'extra', void 0))
    //#endregion

    return WorldList((props) => WorldCard({ ...props, onUpdateFavorite: handleUpdateFavorite }))
}
