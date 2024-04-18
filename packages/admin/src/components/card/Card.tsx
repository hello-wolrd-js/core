import { type Component } from 'solid-js'

import type { World } from '@core/models'
import { useNavigate } from '@solidjs/router'

const Card: Component<{ openModal: (world: World) => void; world: World }> = (props) => {
    //导航
    //#region
    const navigate = useNavigate()
    const handleTry = () => {
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
                import("${props.world.url}").then((module) => {
                    module.default(window.world);
                    window.world = void 0;
                });
            `
            _dom.body.appendChild(_mount)
            _dom.body.removeChild(_mount)
        })
    }
    //#endregion
    const handleDelete = () => {
        props.openModal(props.world)
    }

    return (
        <div class="card w-96 bg-base-100 shadow-lg m-4">
            <figure>
                {props.world.cover && <img src={props.world.cover} alt={props.world.name} />}
            </figure>

            <div class="card-body">
                <h2 class="card-title">{props.world.name}</h2>
                <p>{props.world.description}</p>
                <div class="divider mt-0 mb-0 text-gray-600/50">statistic</div>
                {/* 统计 */}
                <div class=" stat p-0">
                    <div class="stat-figure text-secondary"></div>
                    <div class="stat-title">Total star</div>
                    <div class="stat-value">{props.world.star}</div>
                </div>
                <div class="divider mt-0 mb-0 text-gray-600/50">actions</div>
                {/* 交互栏 */}
                <div class="card-actions justify-end mt-4">
                    <button class="btn btn-outline" onClick={handleTry}>
                        Try
                    </button>
                    <button class="btn btn-outline btn-error" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
