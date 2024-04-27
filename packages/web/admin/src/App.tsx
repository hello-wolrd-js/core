import { Show, createMemo, type Component, type JSX } from 'solid-js'
import { NavBar } from '@/components/layout/NavBar'
import { useUserStore } from '@stores/user'
import { Opacity } from '@components/transition/Opacity'
import { Login } from '@/views/login/Login'
import { useGlobalStore } from '@stores/global'

const App: Component<{ children?: JSX.Element }> = (props) => {
    //监听路由变化
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const isEffective = createMemo(() => {
        return userStore.state.loggedIn || userStore.state.token
    })

    return (
        <Show when={isEffective()} fallback={Login()}>
            <div class="flex h-full flex-col">
                <NavBar height={globalStore.state.navHeight} />
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
    )
}

export default App
