import { Show, createMemo, createSignal, type Component, type JSX } from 'solid-js'
import { NavBar } from './components/layout/Nav'
import { useUserStore } from '@stores/user'
import { GuardView } from './views/guard/Guard'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { Opacity } from '@components/transition/Opacity'
import { useGlobalStore } from '@stores/global'
import { ModalProvider } from '@components/modal/Modal'
import { Loading } from '@/components/loading/Loading'

const App: Component<{ children?: JSX.Element }> = (props) => {
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
        })
    }

    return (
        <Opacity duration={[250, 250]}>
            <ModalProvider>
                <Show when={isEffective()} fallback={GuardView()}>
                    <div class="flex flex-col h-full">
                        <NavBar height={global.state.nav.height}></NavBar>
                        <main
                            style={{
                                'margin-top': `${global.state.nav.height}px`,
                                height: `${global.state.content.height}px`
                            }}
                        >
                            <Show when={ready()} fallback={<Loading></Loading>}>
                                <Opacity duration={[250, 250]}>{props.children}</Opacity>
                            </Show>
                        </main>
                    </div>
                </Show>
            </ModalProvider>
        </Opacity>
    )
}

export default App
