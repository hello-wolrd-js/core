import { Component, createSignal, For, Show } from 'solid-js'
import Card from '@/components/card/Card'
import type { World } from '@core/models'
import { WORLD_API } from '@core/api'
import { isSuccessResponse } from '@core/shared'

const Home: Component = () => {
    const [worlds, setWorlds] = createSignal<World[]>([])

    WORLD_API.getWorld('checked').then((res) => {
        if (isSuccessResponse(res)) {
            setWorlds(res.data)
        }
    })

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
        <div class="flex justify-evenly flex-wrap h-full">
            <Show when={worlds().length} fallback={empty}>
                <For each={worlds()}>{(world) => <Card world={world}></Card>}</For>
            </Show>{' '}
        </div>
    )
}

export default Home
