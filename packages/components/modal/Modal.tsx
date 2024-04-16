import { Component, JSXElement, Signal, createMemo, onCleanup } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from './Modal.module.css'

export const Modal: Component<{ show: Signal<boolean>; title: string; children?: JSXElement }> = (
    props
) => {
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
    return (
        <Portal>
            <div
                style={{
                    display: isShow()
                }}
                class={styles['modal-overlay']}
            >
                <div ref={modalRef} class={styles['modal-content']}>
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
