import { Component, For, Show, onMount } from 'solid-js'
import { WorldCard } from '@/components/card/WorldCard'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { produce } from 'solid-js/store'
import { World } from '@core/models'
import { useUserStore } from '@stores/user'
import { useNavigate } from '@solidjs/router'
import { useWorldStore } from '@stores/world'

export const HomeView: Component = () => {
    //world
    //#region
    const userStore = useUserStore()
    const worldStore = useWorldStore()
    worldStore.getWorld({ status: 'checked' }).then((result) => {
        if (!isSuccessResponse(result)) toast.error('获取世界失败: ' + result.error)
    })
    //#endregion

    //handle
    //#region
    const handleUpdateFavorite = async (world: World, action: 'add' | 'delete') => {
        const result =
            action === 'add'
                ? await userStore.addUserFavoriteWorld(world)
                : await userStore.deleteUserFavoriteWorld(world)
        if (isSuccessResponse(result)) {
            worldStore.setStore(
                'list',
                (w) => w.id === world.id,
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

    //下滑加载
    //#region
    let containerRef: HTMLDivElement | undefined
    onMount(() => {
        if (containerRef) {
            containerRef.addEventListener('scrollend', () => console.log(1))
        }
    })

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
        <div ref={containerRef} class="flex justify-evenly flex-wrap h-full">
            <Show when={worldStore.state.list.length} fallback={empty}>
                <For each={worldStore.state.list}>
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
