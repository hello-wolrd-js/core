import { Component, createSignal } from 'solid-js'
import { AdminWorldCard } from '@/components/card/AdminWorldCard'
import type { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Dialog } from '@components/dialog/Dialog'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { WORLD_API } from '@api/world'

export const HomeView: Component = () => {
    const { WorldList, handleDelete } = useWorldList({
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
        init: true,
        refresh: {
            refreshDistance: 300
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
