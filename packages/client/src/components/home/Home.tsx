import { Component, createSignal, For } from 'solid-js'
import Card from '@/components/card/Card'
import type { World } from '@core/models'
import { WORLD_API } from '@core/api'
import { isSuccessResponse } from '@core/shared'

const Home: Component = () => {
    const [cards, setCards] = createSignal<World[]>([])
    WORLD_API.getWorld().then((res) => {
        if (isSuccessResponse(res)) {
            setCards(res.data)
        }
    })
    return (
        <div id="home-container" class="flex justify-evenly flex-wrap">
            <For each={cards()}>{(card) => <Card {...card}></Card>}</For>
        </div>
    )
}

export default Home
