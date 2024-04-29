import { WorldCard } from '@/components/card/WorldCard'
import { WORLD_API } from '@api/world'
import { Opacity } from '@components/transition/Opacity'
import { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { useToWorldFn } from '@hooks/index'
import { Component, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import toast from 'solid-toast'

export const HotView: Component = () => {
    const [store, setStore] = createStore<{ world: World | null }>({ world: null })

    const handleToWorld = useToWorldFn()
    WORLD_API.getMostStarWorld(1).then((result) => {
        if (isSuccessResponse(result)) {
            console.log(result.data)
            setStore('world', result.data[0])
        } else {
            toast.error('获取失败')
        }
    })
    return (
        <div class="hero h-full bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <Opacity duration={[200, 200]}>
                    <Show when={store.world}>
                        <WorldCard world={store.world!} onToWorld={handleToWorld}></WorldCard>
                    </Show>
                </Opacity>

                <div>
                    <h1 class="text-5xl font-bold">冠军</h1>
                    <p class="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button class="btn btn-primary">看看下一个</button>
                </div>
            </div>
        </div>
    )
}
