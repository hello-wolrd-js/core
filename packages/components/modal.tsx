import { Component, JSXElement, createEffect, createUniqueId } from 'solid-js'

export const Modal: Component<{ ref: any; title: string; children?: JSXElement }> = (props) => {
    let modal: any
    const openModal = () => {
        modal.showModal()
    }
    return (
        <dialog ref={modal} class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">{props.title}</h3>
                {props.children}
                {/* <p class="py-4">Press ESC key or click the button below to close</p> */}
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
