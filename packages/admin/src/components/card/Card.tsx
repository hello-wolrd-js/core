import { createSignal, type Component } from 'solid-js'

import type { WorldCard } from '@core/models'
import { useNavigate } from '@solidjs/router'

const Card: Component<WorldCard & { openModal: () => void }> = (props) => {
    //导航
    //#region
    const navigate = useNavigate()
    const toWorld = () => {
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
                import("${props.url}").then((module) => {
                    module.default(window.world);
                    window.world = void 0;
                });
            `
            _dom.body.appendChild(_mount)
            _dom.body.removeChild(_mount)
        })
    }
    //#endregion

    return (
        <div
            class="card w-96 bg-base-100 shadow-lg m-4"
            style={{
                width: props.style?.width + 'px',
                height: props.style?.height + 'px'
            }}
        >
            <figure>
                <img src={props.cover} alt={props.title} />
            </figure>

            <div class="card-body">
                <h2 class="card-title">{props.title}</h2>
                <p>{props.content}</p>
                <div class="divider mt-0 mb-0 text-gray-600/50">statistic</div>
                {/* 统计 */}
                <div class=" stat p-0">
                    <div class="stat-figure text-secondary"></div>
                    <div class="stat-title">Total star</div>
                    <div class="stat-value">{props.total.star}</div>
                </div>
                <div class="divider mt-0 mb-0 text-gray-600/50">actions</div>
                {/* 交互栏 */}
                <div class="card-actions justify-end mt-4">
                    <button class="btn btn-outline" onClick={toWorld}>
                        Try
                    </button>
                    <button class="btn btn-outline btn-error" onClick={props.openModal}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
