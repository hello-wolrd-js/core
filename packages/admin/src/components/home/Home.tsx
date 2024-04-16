import { Component, createSignal, For } from 'solid-js'
import Card from '@/components/card/Card'
import type { WorldCard } from '@core/models'
import { WORLD_API } from '@core/api'
import { isSuccessResponse } from '@core/shared'

const Home: Component = () => {
    const [cards, setCards] = createSignal<WorldCard[]>([])
    WORLD_API.getWorldCard().then((res) => {
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
