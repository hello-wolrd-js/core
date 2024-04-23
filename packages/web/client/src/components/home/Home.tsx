import { Component, For, Show } from 'solid-js'
import { WorldCard } from '@/components/card/WorldCard'

import { useWorldStore } from '@stores/world'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'

export const Home: Component = () => {
    const worldStore = useWorldStore()
    worldStore.getWorld('archived').then((result) => {
        !isSuccessResponse(result) && toast.error('获取世界失败: ' + result.error)
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
            <Show when={worldStore.state.worlds.length} fallback={empty}>
                <For each={worldStore.state.worlds}>
                    {(world) => <WorldCard world={world}></WorldCard>}
                </For>
            </Show>{' '}
        </div>
    )
}
