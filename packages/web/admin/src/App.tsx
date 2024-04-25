import { Show, createMemo, type Component, type JSX } from 'solid-js'
import { NavBar } from '@/components/layout/NavBar'
import { useUserStore } from '@stores/user'
import { Opacity } from '@components/transition/Opacity'
import { Login } from '@/views/login/Login'

const navHeight = 64
const mainHeight = document.body.clientHeight - navHeight
const App: Component<{ children?: JSX.Element }> = (props) => {
    //监听路由变化
    const userStore = useUserStore()
    const isEffective = createMemo(() => {
        return userStore.state.loggedIn || userStore.state.token
    })

    return (
        <Show when={isEffective()} fallback={Login()}>
            <div class="flex h-full flex-col">
                <NavBar height={navHeight} />
                <main style={{ 'margin-top': `${navHeight}px`, height: `${mainHeight}px` }}>
                    <Opacity duration={[250, 250]}>{props.children}</Opacity>
                </main>
            </div>
        </Show>
    )
}

export default App
