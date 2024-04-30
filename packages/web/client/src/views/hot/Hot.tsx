import { WorldCard } from '@/components/card/WorldCard'
import { WORLD_API } from '@api/world'
import { Opacity } from '@components/transition/Opacity'
import { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { useToWorldFn } from '@hooks/index'
import { Component, Show, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import toast from 'solid-toast'
import { Transition } from 'solid-transition-group'

export const HotView: Component = () => {
    const [store, setStore] = createStore<{ world: World | null }>({ world: null })

    const handleToWorld = useToWorldFn()
    WORLD_API.getMostStarWorld(1).then((result) => {
        if (isSuccessResponse(result)) {
            // console.log(result.data)
            setStore('world', result.data[0])
        } else {
            toast.error('获取失败')
        }
    })

    onCleanup(() => {
        setStore('world', null)
    })

    return (
        <div class="hero h-full bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <Transition
                    mode="outin"
                    onEnter={(el, done) => {
                        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                            duration: 500
                        })
                        a.finished.then(done)
                        // console.log('enter')
                    }}
                    onExit={(el, done) => {
                        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
                            duration: 500
                        })
                        a.finished.then(done)
                        // console.log('exit')
                    }}
                >
                    <Show when={store.world}>
                        <WorldCard
                            world={store.world!}
                            onToWorld={handleToWorld}
                            width={500}
                            height={520}
                        />
                    </Show>
                </Transition>
                {/* <Opacity duration={[200, 200]}>
                    <Show when={store.world}>
                        <WorldCard
                            world={store.world!}
                            onToWorld={handleToWorld}
                            width={500}
                            height={520}
                        />
                    </Show>
                </Opacity> */}

                <div>
                    <h1 class="text-5xl font-bold">冠军🏆</h1>
                    <p class="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button class="btn btn-warning">看看下一个</button>
                </div>
            </div>
        </div>
    )
}
