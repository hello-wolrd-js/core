import { Show, type Component, type JSX } from 'solid-js'
import NavBar from './components/layout/NavBar'
import { useUserStore } from '@core/stores'
import Login from './components/login/Login'

const navHeight = 64
const App: Component<{ children?: JSX.Element }> = (props) => {
    //监听路由变化
    const userStore = useUserStore()

    return (
        <Show when={userStore.store.loggedIn} fallback={Login()}>
            <div class="flex h-full flex-col">
                <NavBar height={navHeight} />
                <main class="w-full h-full" style={{ 'margin-top': `${navHeight}px` }}>
                    {props.children}
                </main>
            </div>
        </Show>
    )
}

export default App
