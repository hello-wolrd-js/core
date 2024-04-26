import { isSuccessResponse } from '@core/shared'
import { Component } from 'solid-js'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { USER_API } from '@api/user'
import { useEmptyResult } from '@hooks/index'

export const ReleasedView: Component = () => {
    const { WorldList } = useWorldList({
        async getter() {
            const result = await USER_API.getUserReleasedWorlds()
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
            async getter(page, pageSize) {
                const result = await USER_API.getUserReleasedWorlds({
                    page: `${page}`,
                    pageSize: `${pageSize}`
                })
                //获取失败时才提示
                if (isSuccessResponse(result)) {
                    return result.data
                } else {
                    toast.error(result.error)
                    return useEmptyWorldList()
                }
            },
            refreshDistance: 300
        }
    })
    return WorldList
}
