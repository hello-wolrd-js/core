import { useStatusStore } from '@stores/status'
import { Component, onMount } from 'solid-js'

export const WorldView: Component = () => {
    const statusStore = useStatusStore()
    let worldContainerRef: HTMLIFrameElement | undefined
    onMount(() => {
        if (!worldContainerRef) return
        const iframe = worldContainerRef
        iframe.onload = () => {
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
                import("${statusStore.state.currentWorld!.url}").then((module) => {
                    module.default(window.world);
                    window.world = void 0;
                });
            `
            _dom.body.appendChild(_mount)
            _dom.body.removeChild(_mount)
        }
    })
    return (
        <iframe
            ref={worldContainerRef}
            style={{ width: '100%', height: `${statusStore.state.contentHeight}px` }}
            sandbox="allow-same-origin allow-scripts"
        />
    )
}
