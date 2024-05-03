import {
    Component,
    JSXElement,
    onCleanup,
    createContext,
    createSignal,
    useContext,
    Show
} from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from './Modal.module.css'
import { Opacity } from '@components/transition/Opacity'

//必须同步调用
export const ModalContext = createContext<{
    open: (content: JSXElement) => void
    close: () => void
}>({
    open: () => {
        console.log('default')
    },
    close: () => {
        console.log('default')
    }
})
export const useModal = () => {
    return useContext(ModalContext)
}
export const ModalProvider: Component<{ children: JSXElement }> = (props) => {
    const [show, setShow] = createSignal(false)

    let modalRef: HTMLDivElement | undefined
    const onClick = (e: Event) => {
        if (modalRef && !modalRef.contains(e.target as Node)) {
            setShow(false)
        }
    }
    document.body.addEventListener('click', onClick)
    onCleanup(() => document.body.removeEventListener('click', onClick))

    const [modalContent, setModalContent] = createSignal<JSXElement>()
    const open = (content: JSXElement) => {
        setModalContent(content)
        setShow(true)
    }
    const close = () => {
        setShow(false)
    }

    return (
        <>
            <ModalContext.Provider
                value={{
                    open,
                    close
                }}
            >
                {props.children}
            </ModalContext.Provider>
            <Portal>
                <Opacity duration={[175, 250]}>
                    <Show when={show()}>
                        <div class={styles['modal-overlay']}>
                            <div ref={modalRef} class={styles['modal-content']}>
                                {modalContent()}
                            </div>
                        </div>
                    </Show>
                </Opacity>
            </Portal>
        </>
    )
}
