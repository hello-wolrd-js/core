import { Component, For, Show } from 'solid-js'
import { WorldCard } from '@/components/card/WorldCard'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { createStore, produce } from 'solid-js/store'
import { WORLD_API } from '@api/world'
import { World } from '@core/models'
import { useUserStore } from '@stores/user'
import { USER_API } from '@api/user'
import { useNavigate } from '@solidjs/router'

export const Home: Component = () => {
    //world
    //#region
    const userStore = useUserStore()
    const [worldStore, setWorldStore] = createStore<{ worlds: World[] | null }>({
        worlds: null
    })
    WORLD_API.getWorld({ status: 'checked' }).then((result) => {
        if (isSuccessResponse(result)) {
            setWorldStore('worlds', result.data)
        } else {
            toast.error('获取世界失败: ' + result.error)
        }
    })
    //#endregion

    //handle
    //#region
    const handleUpdateFavorite = async (id: string, action: 'add' | 'delete') => {
        const result =
            action === 'add'
                ? await userStore.addUserFavoriteWorld(id)
                : await userStore.deleteUserFavoriteWorld(id)
        if (isSuccessResponse(result)) {
            setWorldStore(
                'worlds',
                (world) => world.id === id,
                produce((world) => (action === 'add' ? world.star++ : world.star--))
            )
            toast.success(result.msg)
        } else {
            toast.error(result.error)
        }
    }
    const navigate = useNavigate()
    const handleToWorld = (world: World) => {
        navigate('/world')
        setTimeout(() => {
            const iframe = document.getElementById('world-container')! as HTMLIFrameElement

            const _dom = iframe.contentDocument!
            const _window = iframe.contentWindow!
            Object.defineProperty(_window, 'world', { value: _dom.body })

            //安全措施
            //禁用部分属性
            const avoids = ['localStorage', 'sessionStorage']
            avoids.forEach((item) => {
                Object.defineProperty(_window, item, {
                    value: void 0,
                    writable: false,
                    configurable: false
                })
            })

            const _mount = _dom.createElement('script')
            _mount.innerHTML = `
                import("${world.url}").then((module) => {
                    module.default(window.world);
                    window.world = void 0;
                });
            `
            _dom.body.appendChild(_mount)
            _dom.body.removeChild(_mount)
        })
    }
    //#endregion

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
            <Show when={worldStore.worlds?.length} fallback={empty}>
                <For each={worldStore.worlds}>
                    {(world) => (
                        <WorldCard
                            world={world}
                            onUpdateFavorite={handleUpdateFavorite}
                            onToWorld={handleToWorld}
                        ></WorldCard>
                    )}
                </For>
            </Show>
        </div>
    )
}
