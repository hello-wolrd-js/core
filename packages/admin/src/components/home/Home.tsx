import { Component, createSignal, For, Show } from 'solid-js'
import Card from '@/components/card/Card'
import type { World } from '@core/models'
import { WORLD_API } from '@core/api'
import { isSuccessResponse } from '@core/shared'
import { Modal } from '@core/components'
import toast from 'solid-toast'

const Home: Component = () => {
    const [worlds, setWorlds] = createSignal<World[]>([])
    const getWorld = async () => {
        const result = await WORLD_API.getWorld()
        if (isSuccessResponse(result)) {
            setWorlds(result.data)
        } else {
            toast.error(result.error)
            console.log(result)
        }
    }
    getWorld()

    const [currentWorld, setCurrentWorld] = createSignal<World | null>(null)

    //模态框
    //#region
    const modalSignal = createSignal(false)
    const [_, showModal] = modalSignal
    const openModal = async (world: World) => {
        setCurrentWorld(world)
        showModal(true)
    }
    const confirm = async (close: () => void) => {
        const result = await WORLD_API.deleteWorld(currentWorld()!.id)
        if (isSuccessResponse(result)) {
            //重新获取数据
            await getWorld()
            toast.success('删除成功')
            close()
        } else {
            toast.error('删除失败')
        }
    }
    const cancel = (close: () => void) => {
        close()
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
            <Show when={worlds().length} fallback={empty}>
                <For each={worlds()}>
                    {(world) => <Card world={world} openModal={openModal}></Card>}
                </For>
            </Show>

            {/* 模态框 */}
            <Modal show={modalSignal} title="确定要删除吗?" confirm={confirm} cancel={cancel}>
                <p>该操作不可逆,请三思!</p>
            </Modal>
        </div>
    )
}

export default Home
