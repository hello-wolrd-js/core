import { Component, createSignal, For, onCleanup, onMount, Show } from 'solid-js'
import { AdminWorldCard } from '@/components/card/AdminWorldCard'
import type { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Dialog } from '@components/dialog/Dialog'
import toast from 'solid-toast'
import { useWorldStore } from '@stores/world'
import { debounce } from 'lodash'

export const HomeView: Component = () => {
    //世界
    //#region
    const worldStore = useWorldStore()
    worldStore.getWorld()
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

    //滚动条下滑无感加载
    //#region

    let containerRef: HTMLDivElement | undefined
    const refreshDistance = 300
    //分页参数
    let page = 1
    const pageSize = 10
    //handler
    const handleTouchDownRefresh = debounce(async () => {
        //大于总页数时要退出
        if (!containerRef || worldStore.state.list.length >= worldStore.state.totalItems) return
        //下滑距离判断
        if (
            containerRef.clientHeight + containerRef.scrollTop >=
            containerRef.scrollHeight - refreshDistance
        ) {
            //计算差值
            const diff = worldStore.state.totalItems - worldStore.state.list.length
            const result = await worldStore.getWorld({
                page: `${page++}`,
                pageSize: `${diff > pageSize ? pageSize : diff}`
            })
            //获取失败提示
            if (!isSuccessResponse(result)) toast.success(result.error)
        }
    }, 500)
    //监听与解除监听
    onMount(() => {
        containerRef && containerRef.addEventListener('scroll', handleTouchDownRefresh)
    })
    onCleanup(() => {
        containerRef && containerRef.removeEventListener('scroll', handleTouchDownRefresh)
    })

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
        <div ref={containerRef} class="flex h-full justify-evenly flex-wrap overflow-y-auto">
            <Show when={worldStore.state.list.length} fallback={empty}>
                <For each={worldStore.state.list}>
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
