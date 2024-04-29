import { useUserStore } from '@stores/user'
import { USER_API } from '@api/user'
import { isSuccessResponse } from '@core/shared'
import { useNavigate } from '@solidjs/router'
import { createSignal, onCleanup, onMount } from 'solid-js'
import toast from 'solid-toast'
import Typed from 'typed.js'

export const GuardView = () => {
    //登陆and注册
    //#region
    const userStore = useUserStore()
    const navigate = useNavigate()
    const [username, setUsername] = createSignal('')
    const [password, setPassword] = createSignal('')

    const checkFields = (): boolean => {
        //字段校验
        if (!username()) {
            toast.error('用户名不能为空!')
            return false
        } else if (!password()) {
            toast.error('密码不能为空!')
            return false
        }
        return true
    }

    const handleLogin = async () => {
        //字段校验
        if (!checkFields()) return

        const result = await USER_API.login({
            username: username(),
            password: password()
        })

        if (isSuccessResponse(result)) {
            toast.success(result.msg)
            userStore.login(result.data.user, result.data.token)
            navigate('/')
        } else {
            toast.error(result.error)
        }
    }

    const handleRegister = async () => {
        //字段校验
        if (!checkFields()) return

        const result = await USER_API.register({
            username: username(),
            password: password()
        })

        if (isSuccessResponse(result)) {
            toast.success(result.msg)
            userStore.login(result.data.user, result.data.token)
            navigate('/')
        } else {
            toast.error(result.error)
        }
    }
    //#endregion

    //打字机效果
    //#region
    let titleRef: HTMLHeadingElement | undefined
    let typed: Typed
    onMount(() => {
        if (titleRef) {
            typed = new Typed(titleRef, {
                strings: [
                    'Hello World!^2000',
                    '发现^1000  探索^1000  然后创造^1000!',
                    `你好^1000 世界^2000`
                ],
                typeSpeed: 150,
                loop: true,
                fadeOut: true //淡出效果
            })
        }
    })
    onCleanup(() => typed.destroy())
    //#endregion
    return (
        <div class="hero h-full bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">
                        <span ref={titleRef}></span>
                    </h1>
                    <p class="py-6">
                        <span>
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
                            id nisi.
                        </span>
                    </p>
                </div>
                <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body gap-4">
                        <h2 class="card-title justify-center">Hello-World</h2>
                        <label class="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="w-4 h-4 opacity-70"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                class="grow"
                                placeholder="username"
                                value={username()}
                                onInput={(e) => setUsername(e.target.value)}
                            />
                        </label>

                        <label class="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="w-4 h-4 opacity-70"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                class="grow"
                                placeholder="password"
                                value={password()}
                                onInput={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <div class="grid grid-cols-2 gap-4">
                            <button class="btn btn-primary" onClick={handleLogin}>
                                登陆
                            </button>
                            <button class="btn btn-warning" onClick={handleRegister}>
                                注册
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
