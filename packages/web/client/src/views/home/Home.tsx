import { Component, onCleanup, onMount } from 'solid-js'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { WORLD_API } from '@api/world'
import { WorldCard } from '@/components/card/WorldCard'
import { useAwait } from '@hooks/index'
import { useGlobalStore } from '@stores/global'
import { debounce } from 'lodash'

export const HomeView: Component = () => {
    const { WorldList, handleUpdateFavorite, handleSearch, handleRefresh } = useWorldList({
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
    const global = useGlobalStore()
    onMount(() => {
        global.emitter.on('search-world', async (params) => {
            toast.loading('搜索中', { duration: 1000 })
            await handleSearch(params)
        })
        global.emitter.on('refresh-worlds', async () => {
            await handleRefresh()
            toast.success('刷新成功', { duration: 1000 })
        })
    })
    onCleanup(() => {
        global.emitter.off('search-world')
        global.emitter.off('refresh-worlds')
    })
    //#endregion

    return WorldList((props) => WorldCard({ ...props, onUpdateFavorite: handleUpdateFavorite }))
}
