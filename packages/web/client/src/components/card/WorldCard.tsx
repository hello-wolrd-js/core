import { Component } from 'solid-js'
import type { World } from '@core/models'
import { useNavigate } from '@solidjs/router'
import { USER_API } from '@api/user'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'

export const WorldCard: Component<{ world: World }> = (props) => {
    const navigate = useNavigate()
    const handleToWorld = () => {
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
    const handleStar = async () => {
        const result = await USER_API.updateUserFavoriteWorld(props.world.id)
        if (isSuccessResponse(result)) {
            toast.success(result.msg)
        } else {
            toast.error(result.error)
        }
    }
    return (
        <div class="card w-96 bg-base-100 h-3/4 shadow-lg m-4">
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
                    <button class="btn btn-outline" onClick={handleStar}>
                        Star
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
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                    </button>
                    <button class="btn btn-outline" onClick={handleToWorld}>
                        Try
                    </button>
                </div>
            </div>
        </div>
    )
}
