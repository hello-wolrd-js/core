import { Component } from 'solid-js'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { WORLD_API } from '@api/world'
import { WorldCard } from '@/components/card/WorldCard'

export const HomeView: Component = () => {
    const { WorldList, handleUpdateFavorite } = useWorldList({
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
            refreshDistance: 300
        }
    })

    return WorldList((props) => WorldCard({ ...props, onUpdateFavorite: handleUpdateFavorite }))
}
