import { isSuccessResponse } from '@core/shared'
import { Component } from 'solid-js'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { USER_API } from '@api/user'
import { useEmptyResult } from '@hooks/index'
import { WorldCard } from '@/components/card/WorldCard'

export const ReleasedView: Component = () => {
    const { WorldList, handleUpdateFavorite } = useWorldList({
        async getter(params) {
            const result = await USER_API.getUserReleasedWorlds(params)
            console.log(result)
            if (isSuccessResponse(result)) {
                return result.data
            } else {
                toast.error(result.error)
                return useEmptyWorldList()
            }
        },
        init: true,
        empty: useEmptyResult('暂无发布的世界'),
        refresh: {
            refreshDistance: 300
        }
    })

    return WorldList((props) => WorldCard({ ...props, onUpdateFavorite: handleUpdateFavorite }))
}
