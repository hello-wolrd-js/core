import { Show, createMemo, type Component, type JSX } from 'solid-js'
import NavBar from './components/layout/NavBar'
import { useUserStore } from '@stores/user'
import Login from './components/login/Login'
import { USER_API } from '@api/user'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { Opacity } from '@components/transition/Opacity'

const navHeight = 64
const App: Component<{ children?: JSX.Element }> = (props) => {
    const userStore = useUserStore()
    const isEffective = createMemo(() => {
        return userStore.state.loggedIn || userStore.state.token
    })

    //获取个人信息
    if (isEffective()) {
        USER_API.getUserInfo().then((result) => {
            if (isSuccessResponse(result)) {
                userStore.setStore('user', result.data)
            } else {
                toast.error('获取个人信息失败: ' + result.error)
            }
        })
    }

    return (
        <Opacity duration={[250, 250]}>
            <Show when={isEffective()} fallback={Login()}>
                <div class="flex flex-col h-full">
                    <NavBar height={navHeight}></NavBar>
                    <main class="w-full h-full" style={{ 'margin-top': `${navHeight}px` }}>
                        <Opacity duration={[250, 250]}>{props.children}</Opacity>
                    </main>
                </div>
            </Show>
        </Opacity>
    )
}

export default App
