import { Component, createSignal, For } from 'solid-js'
import Card from '@/components/card/Card'
import type { WorldCard } from '@/models/card'

const Home: Component = () => {
    const [cards] = createSignal<WorldCard[]>(
        Array.from({ length: 10 }, () => {
            return {
                title: 'Kancy Joe',
                cover: 'https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg',
                content: 'jooooooe!'
            }
        })
    )
    return (
        <div class="flex flex-wrap">
            <For each={cards()}>{(card) => <Card {...card}></Card>}</For>
        </div>
    )
}

export default Home
