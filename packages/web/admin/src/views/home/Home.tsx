import { Component, createSignal, onCleanup, onMount } from 'solid-js'
import { AdminWorldCard } from '@/components/card/AdminWorldCard'
import type { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Dialog } from '@components/dialog/Dialog'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { WORLD_API } from '@api/world'
import { useAwait } from '@hooks/index'
import { useGlobalStore } from '@stores/global'
import { Search } from '@/components/search/Search'

export const HomeView: Component = () => {
    const { WorldList, handleDelete, handleSearch, handleRefresh, state } = useWorldList({
        async getter(params) {
            const result = await WORLD_API.getWorld(params)
            //获取失败时才提示
            if (isSuccessResponse(result)) {
                return result.data
            } else {
                toast.error(result.error)
                return useEmptyWorldList()
            }
        },
        async deleter(target) {
            const result = await WORLD_API.deleteWorld(target.id)
            if (isSuccessResponse(result)) {
                toast.success(result.msg)
            } else {
                toast.error(result.error)
            }
        },
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

    //引用当前的世界用户模态框操作
    const [currentWorld, setCurrentWorld] = createSignal<World | null>(null)

    //模态框
    //#region
    const modalSignal = createSignal(false)
    const [showModal, setShowModal] = modalSignal
    const handleOpenModal = async (world: World) => {
        setCurrentWorld(world)
        setShowModal(true)
    }

    const handleConfirm = async () => {
        const world = currentWorld()
        world && (await handleDelete(world))
    }
    const handleCancel = () => {}
    const handleClose = () => {
        setShowModal(false)
    }
    //#endregion

    //事件
    //#region
    const { emitter, setStore } = useGlobalStore()
    onMount(() => {
        emitter.on('refresh-worlds', async () => {
            await handleRefresh()
            toast.success('刷新成功', { duration: 1000 })
        })
    })
    onCleanup(() => {
        emitter.off('refresh-worlds')
    })
    //#endregion

    //导航栏拓展
    //#region
    const handleSearchWorld = async (name: string) => await handleSearch({ name })
    const NavExtra = (
        <>
            <Search onInput={handleSearchWorld} debounce={{ wait: 500 }} placeholder="搜搜看?" />
            <div class="ml-5">总数: {state.totalItems}</div>
        </>
    )
    setStore('nav', 'extra', NavExtra)
    //#endregion

    return (
        <>
            {/* 世界列表 */}
            {WorldList((props) => AdminWorldCard({ ...props, onOpenModal: handleOpenModal }))}
            {/* 模态框 */}
            <Dialog
                show={showModal()}
                onClose={handleClose}
                title="确定要删除这个世界吗?"
                content="请君三思"
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    )
}
