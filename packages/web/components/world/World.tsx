import { useHWJS } from '@core/lib'
import { useGlobalStore } from '@stores/global'
import { Component, Show, createSignal, onMount } from 'solid-js'

export const WorldView: Component = () => {
    const global = useGlobalStore()
    let worldContainerRef: HTMLIFrameElement | undefined
    //会话存储当前wolrd实例
    sessionStorage.setItem('current-world', JSON.stringify(global.state.current.world))

    //加载动画
    //#region
    const [loading, setLoading] = createSignal(true)
    const LoadingView = <div>加载中捏...</div>
    //#endregion
    const display = () => (loading() ? 'none' : '')
    onMount(() => {
        if (!worldContainerRef) return

        const iframe = worldContainerRef
        const setup = () => {
            const _dom = iframe.contentDocument!
            const _window = iframe.contentWindow!
            Object.defineProperties(_window, {
                world: {
                    value: _dom.body
                },
                endLoading: {
                    value: () => setLoading(false)
                },
                HWJS: {
                    value: useHWJS(),
                    configurable: false,
                    writable: false
                }
            })

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

            //模拟挂载脚本
            const _mountScript = _dom.createElement('script')
            _mountScript.innerHTML = `
                import("${global.state.current.world!.url}").then((module) => {
                    //结束加载状态
                    window.endLoading();
                    //world挂载
                    module.default(window.world);
                    window.world = void 0;
                    window.endLoading = void 0;
                });
            `
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

    return (
        <div class="w-full" style={{ height: `${global.state.content.height}px` }}>
            <Show when={loading()}> {LoadingView}</Show>
            <iframe
                ref={worldContainerRef}
                style={{
                    display:display(),
                    width: '100%',
                    height: `${global.state.content.height}px`
                }}
                sandbox="allow-same-origin allow-scripts"
            />
        </div>
    )
}
