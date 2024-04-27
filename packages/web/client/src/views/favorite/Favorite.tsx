import { Component } from 'solid-js'
import { isSuccessResponse } from '@core/shared/guard'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { USER_API } from '@api/user'
import { useAwait, useEmptyResult } from '@hooks/index'
import { WorldCard } from '@/components/card/WorldCard'

export const FavoriteView: Component = () => {
    const { WorldList, handleUpdateFavorite } = useWorldList({
        async getter(params) {
            const result = await USER_API.getUserFavoriteWorlds(params)
            if (isSuccessResponse(result)) {
                return result.data
            } else {
                toast.error(result.error)
                return useEmptyWorldList()
            }
        },
        init: true,
        empty: useEmptyResult('暂无收藏的世界'),
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

    return WorldList((props) => WorldCard({ ...props, onUpdateFavorite: handleUpdateFavorite }))
}
