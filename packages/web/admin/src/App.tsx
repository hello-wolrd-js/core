import { Show, createMemo, createSignal, type Component, type JSX } from 'solid-js'
import { NavBar } from '@/components/layout/Nav'
import { useUserStore } from '@stores/user'
import { Opacity } from '@components/transition/Opacity'
import { Login } from '@/views/guard/Guard'
import { useGlobalStore } from '@stores/global'
import { ModalProvider } from '@components/modal/Modal'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'

const App: Component<{ children?: JSX.Element }> = (props) => {
    //监听路由变化
    const userStore = useUserStore()
    const global = useGlobalStore()
    const isEffective = createMemo(() => {
        return userStore.state.loggedIn || userStore.state.token
    })

    //获取个人信息
    const [ready, setReady] = createSignal(false)
    if (isEffective()) {
        userStore.getUserInfo().then((result) => {
            if (!isSuccessResponse(result)) toast.error(result.error)
            setReady(true)
            console.log(ready())
        })
    }
    return (
        <ModalProvider>
            <Opacity duration={[250, 250]}>
                <Show when={isEffective()} fallback={Login()}>
                    <div class="flex h-full flex-col">
                        <NavBar height={global.state.nav.height} />
                        <main
                            style={{
                                'margin-top': `${global.state.nav.height}px`,
                                height: `${global.state.content.height}px`
                            }}
                        >
                            {props.children}
                        </main>
                    </div>
                </Show>
            </Opacity>
        </ModalProvider>
    )
}

export default App
