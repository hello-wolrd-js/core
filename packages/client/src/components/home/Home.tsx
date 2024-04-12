import { Component, createSignal, For } from 'solid-js'
import Card from '@/components/card/Card'
import type { WorldCard } from '@/models/card'

const Home: Component = () => {
    const [cards] = createSignal<WorldCard[]>(
        Array.from({ length: 10 }, () => {
            return {
                title: 'Kancy Joe',
                cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/Q-%E5%A4%A7%E5%8F%94.png',
                content: 'jooooooe!',
                link: '../../__tests__/cards/01.tsx'
            }
        })
    )
    return (
        <div id="home-container" class="flex flex-wrap">
            <For each={cards()}>{(card) => <Card {...card}></Card>}</For>
        </div>
    )
}

export default Home
