import { useHWJS } from '@core/lib'
import { useGlobalStore } from '@stores/global'
import { Component, Show, createSignal, onMount } from 'solid-js'
import { Transition } from 'solid-transition-group'

export const WorldView: Component = () => {
    const global = useGlobalStore()
    let worldContainerRef: HTMLIFrameElement | undefined

    //存储当前wolrd实例
    sessionStorage.setItem('current-world', JSON.stringify(global.state.current.world))

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
            //触发加载界面的打字机效果

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
                    value: useHWJS(),
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
                    // window.endLoading()
                    //world挂载
                    module.default(window.world);
                    window.world = void 0;
                    window.endLoading = void 0;
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
