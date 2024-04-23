import { Component, createSignal, For, Show } from 'solid-js'
import { AdminWorldCard } from '@/components/card/AdminWorldCard'
import type { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Dialog } from '@components/dialog/Dialog'
import toast from 'solid-toast'
import { useWorldStore } from '@stores/world'

export const Home: Component = () => {
    //世界
    //#region
    const worldStore = useWorldStore()
    worldStore.getWorld('archived')
    const [currentWorld, setCurrentWorld] = createSignal<World | null>(null)
    //#endregion

    //模态框
    //#region
    const modalSignal = createSignal(false)
    const [showModal, setShowModal] = modalSignal
    const handleOpenModal = async (world: World) => {
        setCurrentWorld(world)
        setShowModal(true)
    }

    const handleConfirm = async () => {
        const result = await worldStore.deleteWorld(currentWorld()!.id)
        if (isSuccessResponse(result)) {
            toast.success('删除成功')
        } else {
            toast.error('删除失败')
        }
    }
    const handleCancel = () => {}
    const handleClose = () => {
        setShowModal(false)
    }
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
        <div class="flex h-full justify-evenly flex-wrap">
            <Show when={worldStore.state.worlds.length} fallback={empty}>
                <For each={worldStore.state.worlds}>
                    {(world) => (
                        <AdminWorldCard world={world} openModal={handleOpenModal}></AdminWorldCard>
                    )}
                </For>
            </Show>

            {/* 模态框 */}
            <Dialog
                show={showModal()}
                onClose={handleClose}
                title="确定要删除这个世界吗?"
                content="请君三思"
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    )
}
