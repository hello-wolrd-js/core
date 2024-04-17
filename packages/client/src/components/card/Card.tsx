import { Component } from 'solid-js'
import type { World } from '@core/models'
import { useNavigate } from '@solidjs/router'

const Card: Component<World> = (props) => {
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
    return (
        <div
            class="card w-96 bg-base-100 shadow-lg m-4"
            style={{
                width: props.card.style?.width + 'px',
                height: props.card.style?.height + 'px'
            }}
        >
            <figure>
                {props.card.cover && <img src={props.card.cover} alt={props.card.title} />}
            </figure>
            <div class="card-body">
                <h2 class="card-title">{props.card.title}</h2>
                <p>{props.card.description}</p>
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
                    <button class="btn btn-outline">
                        Star
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                    <button class="btn btn-outline" onClick={toWorld}>
                        Go
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
