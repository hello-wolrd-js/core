import { isSuccessResponse } from '@core/shared'
import { Component } from 'solid-js'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { USER_API } from '@api/user'
import { useAwait, useEmptyResult } from '@hooks/index'
import { WorldCard } from '@/components/card/WorldCard'

export const ReleasedView: Component = () => {
    const { WorldList, handleUpdateFavorite } = useWorldList({
        async getter(params) {
            const result = await USER_API.getUserReleasedWorlds(params)
            if (isSuccessResponse(result)) {
                return result.data
            } else {
                toast.error(result.error)
                return useEmptyWorldList()
            }
        },
        empty: useEmptyResult('暂无发布的世界'),
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
