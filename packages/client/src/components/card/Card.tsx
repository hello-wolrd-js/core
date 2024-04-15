import { Component } from 'solid-js'
import type { WorldCard } from '@core/models'
import { useNavigate } from '@solidjs/router'

const Card: Component<WorldCard> = (props) => {
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
                <div class="card-actions justify-end">
                    <button class="btn btn-outline" onClick={toWorld}>
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
