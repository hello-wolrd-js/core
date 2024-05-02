import { useHWJS } from '@core/lib'
import { useGlobalStore } from '@stores/global'
import { Component, onMount } from 'solid-js'

export const WorldView: Component = () => {
    const global = useGlobalStore()
    let worldContainerRef: HTMLIFrameElement | undefined
    //会话存储当前wolrd实例
    sessionStorage.setItem('current-world', JSON.stringify(global.state.current.world))
    onMount(() => {
        if (!worldContainerRef) return
        const iframe = worldContainerRef

        const setup = () => {
            const _dom = iframe.contentDocument!
            const _window = iframe.contentWindow!
            Object.defineProperty(_window, 'world', { value: _dom.body })
            // 注入HWJS依赖
            Object.defineProperty(_window, 'HWJS', {
                value: useHWJS(),
                configurable: false,
                writable: false
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
                    module.default(window.world);
                    window.world = void 0;
                });
            `
            _dom.body.appendChild(_mountScript)
            _dom.body.removeChild(_mountScript)
        }

        //判断是第一次加载还是人为刷新
        if (iframe.contentDocument!) {
            //已经载入过一次了，此时为刷新出发的onMount，dom会被复用，所以ifram的onload函数不会被触发,需要手动调用一次setup
            setup()
        } else {
            //第一次载入世界
            iframe.onload = setup
        }
    })
    return (
        <iframe
            ref={worldContainerRef}
            style={{ width: '100%', height: `${global.state.content.height}px` }}
            sandbox="allow-same-origin allow-scripts"
        />
    )
}
