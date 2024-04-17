import { Component, JSXElement, Signal, createMemo, onCleanup } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from './Modal.module.css'

export const Modal: Component<{
    show: Signal<boolean>
    title: string | JSXElement
    confirm: (close: () => void) => void
    cancel: (close: () => void) => void
    children?: JSXElement
}> = (props) => {
    let modalRef: any

    const [show, setShow] = props.show
    const isShow = createMemo(() => (show() ? '' : 'none'))

    const onClick = (e: any) => {
        if (!modalRef.contains(e.target)) {
            setShow(false)
        }
    }
    document.body.addEventListener('click', onClick)
    onCleanup(() => document.body.removeEventListener('click', onClick))

    //事件处理
    //#region
    const handleConfirm = () => {
        props.confirm(() => setShow(false))
    }
    const handleCancel = () => {
        props.cancel(() => setShow(false))
    }

    //#endregion
    return (
        <Portal>
            <div
                style={{
                    display: isShow()
                }}
                class={styles['modal-overlay']}
            >
                <div ref={modalRef} class={styles['modal-content']}>
                    <div class="card-body p-0">
                        <h2 class="card-title">{props.title}</h2>
                        {props.children}
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary btn-outline" onClick={handleConfirm}>
                                确认
                            </button>
                            <button class="btn btn-error btn-outline" onClick={handleCancel}>
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
