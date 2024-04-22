import { Component, JSXElement, createMemo, onCleanup } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from './Modal.module.css'

export const Modal: Component<{
    show: boolean
    onClose: Function
    to?: string | HTMLElement
    children?: JSXElement
}> = (props) => {
    let modalRef: any
    const isShow = createMemo(() => (props.show ? '' : 'none'))

    const onClick = (e: any) => {
        if (!modalRef.contains(e.target)) {
            props.onClose()
        }
    }
    document.body.addEventListener('click', onClick)
    onCleanup(() => document.body.removeEventListener('click', onClick))

    let mount: HTMLElement | undefined = void 0
    if (typeof props.to === 'string') {
        mount = document.getElementById(props.to) || void 0
    } else if (props.to instanceof HTMLElement) {
        mount = props.to
    }
    
    return (
        <Portal mount={mount}>
            <div
                style={{
                    display: isShow()
                }}
                class={styles['modal-overlay']}
            >
                <div ref={modalRef} class={styles['modal-content']}>
                    {props.children}
                </div>
            </div>
        </Portal>
    )
}
