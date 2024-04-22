import { Component, JSXElement } from 'solid-js'
import { Modal } from '../modal/Modal'

export const Dialog: Component<{
    onConfirm: Function
    onCancel: Function
    title?: string | JSXElement
    content?: string | JSXElement
    show: boolean
    onClose: Function
}> = (props) => {

    const handleConfirm = () => {
        props.onConfirm()
        props.onClose()
    }
    const handleCancel = () => {
        props.onCancel()
        props.onClose()
    }

    return (
        <Modal show={props.show} onClose={props.onClose}>
            <div class="card-body p-0">
                <h2 class="card-title">{props.title}</h2>
                {props.content}
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" onClick={handleConfirm}>
                        确认
                    </button>
                    <button class="btn btn-error" onClick={handleCancel}>
                        取消
                    </button>
                </div>
            </div>
        </Modal>
    )
}
