import { Component, createSignal, For } from 'solid-js'
import Card from '@/components/card/Card'
import type { World } from '@core/models'
import { WORLD_API } from '@core/api'
import { isSuccessResponse } from '@core/shared'
import { Modal } from '@core/components'

const Home: Component = () => {
    const [worlds, setWorlds] = createSignal<World[]>([])
    WORLD_API.getWorld().then((res) => {
        if (isSuccessResponse(res)) {
            setWorlds(res.data)
        }
    })

    //删除
    //#region
    const showSignal = createSignal(false)
    const [showModal, setShowModal] = showSignal
    const openModal = async () => {
        setShowModal(true)
    }
    //#endregion

    //模态框
    //#region
    const confirm = (close: () => void) => {
        close()
    }
    const cancel = (close: () => void) => {
        close()
    }
    //#endregion
    return (
        <div id="home-container" class="flex justify-evenly flex-wrap">
            <For each={worlds()}>{(card) => <Card {...card} openModal={openModal}></Card>}</For>
            {/* 模态框 */}
            <Modal show={showSignal} title="确认删除吗" confirm={confirm} cancel={cancel}>
                <p>请三思!</p>
            </Modal>
        </div>
    )
}

export default Home
