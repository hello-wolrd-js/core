import { Show, createMemo, type Component, type JSX } from 'solid-js'
import NavBar from './components/layout/NavBar'
import { useUserStore } from '@core/stores'
import Login from './components/login/Login'

const navHeight = 64
const App: Component<{ children?: JSX.Element }> = (props) => {
    const userStore = useUserStore()
    const isEffective = createMemo(() => {
        return userStore.store.loggedIn || userStore.store.token
    })
    return (
        <Show when={isEffective()} fallback={Login()}>
            <div class="flex flex-col h-full">
                <NavBar height={navHeight}></NavBar>
                <main class="w-full h-full" style={{ 'margin-top': `${navHeight}px` }}>
                    {props.children}
                </main>
            </div>
        </Show>
    )
}

export default App
