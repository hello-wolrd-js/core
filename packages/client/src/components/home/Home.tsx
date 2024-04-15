import { Component, createSignal, For } from 'solid-js'
import Card from '@/components/card/Card'
import axios from 'axios'
import type { WorldCard } from '@core/models'

const Home: Component = () => {
    const [cards, setCards] = createSignal<WorldCard[]>([])
    axios.get('http://127.0.0.1:4000/cards').then(({ data }: { data: WorldCard[] }) => {
        setCards(data)
    })
    return (
        <div id="home-container" class="flex justify-evenly flex-wrap">
            <For each={cards()}>{(card) => <Card {...card}></Card>}</For>
        </div>
    )
}

export default Home
