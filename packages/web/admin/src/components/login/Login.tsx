import { useUserStore } from '@stores/user'
import { USER_API } from '@api/user'
import { isSuccessResponse } from '@core/shared'
import { useNavigate } from '@solidjs/router'
import { createSignal } from 'solid-js'
import toast from 'solid-toast'

export const Login = () => {
    const userStore = useUserStore()
    const navigate = useNavigate()
    const [username, setUsername] = createSignal('')
    const [password, setPassword] = createSignal('')

    const handleLogin = async () => {
        //字段校验
        if (!username()) {
            return toast.error('用户名不能为空!')
        } else if (!password()) {
            return toast.error('密码不能为空!')
        }

        const result = await USER_API.login({
            username: username(),
            password: password()
        })
        if (isSuccessResponse(result)) {
            if (result.data.user.role === 'admin') {
                toast.success(result.msg)
                userStore.login(result.data.user, result.data.token)
                navigate('/')
            } else {
                toast.error('用户权限不足!')
            }
        } else {
            toast.error(result.error)
        }
    }
    return (
        <div class="hero h-full bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Hello-World</h1>
                    <p class="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">用户名</span>
                            </label>
                            <input
                                type="text"
                                placeholder="username"
                                class="input input-bordered"
                                value={username()}
                                onInput={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">密码</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                class="input input-bordered"
                                value={password()}
                                onInput={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary" onClick={handleLogin}>
                                登陆
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
