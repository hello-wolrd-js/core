import { Show, createMemo, type Component, type JSX } from 'solid-js'
import NavBar from './components/layout/NavBar'
import { useUserStore } from '@stores/user'
import Login from './views/login/Login'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { Opacity } from '@components/transition/Opacity'
import { useGlobalStore } from '@stores/global'

const App: Component<{ children?: JSX.Element }> = (props) => {
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const isEffective = createMemo(() => {
        return userStore.state.loggedIn || userStore.state.token
    })

    //获取个人信息
    if (isEffective()) {
        userStore.getUserInfo().then((result) => {
            if (!isSuccessResponse(result)) toast.error('获取个人信息失败: ' + result.error)
        })
    }

    return (
        <Opacity duration={[250, 250]}>
            <Show when={isEffective()} fallback={Login()}>
                <div class="flex flex-col h-full">
                    <NavBar height={globalStore.state.navHeight}></NavBar>
                    <main
                        style={{
                            'margin-top': `${globalStore.state.navHeight}px`,
                            height: `${globalStore.state.contentHeight}px`
                        }}
                    >
                        <Opacity duration={[250, 250]}>{props.children}</Opacity>
                    </main>
                </div>
            </Show>
        </Opacity>
    )
}

export default App
