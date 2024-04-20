import { Show, createEffect, type Component, type JSX } from 'solid-js'
import NavBar from './components/layout/NavBar'
import { useLocation, useNavigate } from '@solidjs/router'
import { useUserStore } from './stores/user'

const navHeight = 64
const App: Component<{ children?: JSX.Element }> = (props) => {
    //监听路由变化
    const location = useLocation()
    const navigate = useNavigate()
    const userStore = useUserStore()
    createEffect(() => {
        //登陆判断
        if (location.pathname && !userStore.store.loggedIn) {
            navigate('/login')
        }
    })

    return (
        <Show when={userStore.store.loggedIn} fallback={props.children}>
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
