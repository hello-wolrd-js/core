import { Component, createSignal, For } from 'solid-js'
import Card from '@/components/card/Card'
import type { WorldCard } from '@core/models'
import { WORLD_API } from '@core/api'
import { isSuccessResponse } from '@core/shared'
import { Modal } from '@core/components'

const Home: Component = () => {
    const [cards, setCards] = createSignal<WorldCard[]>([])
    WORLD_API.getWorldCard().then((res) => {
        if (isSuccessResponse(res)) {
            setCards(res.data)
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
            <For each={cards()}>{(card) => <Card {...card} openModal={openModal}></Card>}</For>
            {/* 模态框 */}
            <Modal show={showSignal} title="确认删除吗" confirm={confirm} cancel={cancel}>
                <p>请三思!</p>
            </Modal>
        </div>
    )
}

export default Home
