import { Component, JSXElement, Show, createContext, createSignal, useContext } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from '../modal/Modal.module.css'

const WorldLoadingContext = createContext<{
    begin: () => void
    end: () => void
}>()

export const useWorldLoading = () => {
    return useContext(WorldLoadingContext)
}

export const WorldLoadingProvider: Component<{ children: JSXElement }> = (
    props
) => {
    const [show, setShow] = createSignal(false)
    const begin = () => {
        setShow(true)
    }
    const end = () => {
        setShow(false)
    }

    return (
        <>
            <WorldLoadingContext.Provider value={{ begin, end }}>
                {props.children}
            </WorldLoadingContext.Provider>
            <Portal>
                <Show when={show()}>
                    <div class={styles['modal-overlay']}>
                        <div class={styles['modal-content']}>123</div>
                    </div>
                </Show>
            </Portal>
        </>
    )
}
