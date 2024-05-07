import { useHWJS } from '@core/lib'
import { useGlobalStore } from '@stores/global'
import { useUserStore } from '@stores/user'
import { Component, Show, createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { Star } from '@components/icon/Star'
import { isSuccessResponse } from '@root/packages/shared'
import toast from 'solid-toast'

export const WorldView: Component = () => {
    const global = useGlobalStore()
    let worldContainerRef: HTMLIFrameElement | undefined
    const currentWorld = global.state.current.world!

    //存储当前wolrd实例
    sessionStorage.setItem('current-world', JSON.stringify(currentWorld))

    //加载动画
    //#region
    const [loading, setLoading] = createSignal(true)
    const LoadingView = (
        <div class="w-full h-full fixed top-0 flex justify-center items-center  animate__animated animate__fadeInLeft">
            <div class="text-5xl">Loading..</div>
        </div>
    )
    //#endregion

    //世界加载的逻辑
    //#region
    onMount(() => {
        if (!worldContainerRef) return

        const iframe = worldContainerRef
        const setup = () => {
            //准备步骤
            const _dom = iframe.contentDocument!
            const _window = iframe.contentWindow!
            Object.defineProperties(_window, {
                world: {
                    value: _dom.body
                },
                endLoading: {
                    value: () => {
                        setLoading(false)
                    }
                },
                HWJS: {
                    value: useHWJS(currentWorld),
                    configurable: false,
                    writable: false
                }
            })

            //安全措施,禁用部分属性
            //#region
            const avoids = ['localStorage', 'sessionStorage']
            avoids.forEach((item) => {
                Object.defineProperty(_window, item, {
                    value: void 0,
                    writable: false,
                    configurable: false
                })
            })
            //#endregion

            //模拟挂载脚本
            //#region
            const _mountScript = _dom.createElement('script')
            _mountScript.innerHTML = `
                import("${global.state.current.world!.url}").then((module) => {

                    //结束加载状态
                    setTimeout(()=>window.endLoading(),1000)

                    //挂载world
                    module.default(window.world);

                    //多余属性undefined掉
                    window.world = void 0;
                    window.endLoading = void 0;

                    //测试操作
                    // console.log(HWJS)
                    // console.log(HWJS.sessionStorage.setItem("kancy-joe","joe"))
                    // console.log(HWJS.sessionStorage.getItem("kancy-joe"))
                });
            `
            //#endregion

            _dom.body.appendChild(_mountScript)
            _dom.body.removeChild(_mountScript)
        }

        //判断是第一次加载还是人为刷新
        if (iframe.contentDocument) {
            //已经载入过一次了，此时为刷新出发的onMount，dom会被复用，所以ifram的onload函数不会被触发,需要手动调用一次setup
            setup()
        } else {
            //第一次载入世界
            iframe.onload = setup
        }
    })
    //#endregion

    //装载导航栏拓展
    //#region
    const userStore = useUserStore()
    const isStared = createMemo(() => {
        return userStore.state.user!.favorite_worlds.includes(currentWorld.id)
    })
    const updateUserFavorite = async () => {
        const result = isStared()
            ? await userStore.deleteUserFavoriteWorld(currentWorld)
            : await userStore.addUserFavoriteWorld(currentWorld)
        if (isSuccessResponse(result)) {
            toast.success(result.msg)
        } else {
            toast.error(result.error)
        }
    }
    // const reportWorld = async () => {
    //     WORLD_API.reportWorld(currentWorld.id, '神经病')
    // }
    const NavExtends = (
        <div class="flex">
            {/* 举报 */}
            <div class="tooltip tooltip-bottom" data-tip="举报">
                <div class="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                </div>
            </div>
            {/* 收藏 */}
            <div class="tooltip tooltip-bottom" data-tip={isStared() ? '取消收藏' : '收藏这个世界'}>
                <div class="btn btn-square btn-ghost" onClick={updateUserFavorite}>
                    <Star isStared={isStared()} />
                </div>
            </div>
        </div>
    )
    onMount(() => {
        global.setStore('nav', 'extra', NavExtends)
    })
    onCleanup(() => {
        global.setStore('nav', 'extra', null)
    })
    //#endregion

    return (
        <div class="w-full h-full">
            {/* 模拟一个遮罩加载层 */}
            <Transition exitActiveClass="animate__animated animate__fadeOutRight">
                <Show when={loading()} children={LoadingView} />
            </Transition>
            {/* iframe容器 */}
            <iframe
                ref={worldContainerRef}
                style={{
                    display: loading() ? 'none' : '',
                    width: '100%',
                    height: `${global.state.content.height}px`
                }}
                sandbox="allow-same-origin allow-scripts"
            />
        </div>
    )
}
