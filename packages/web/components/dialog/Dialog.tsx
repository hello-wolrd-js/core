import { Component, JSXElement } from 'solid-js'

export const Dialog: Component<{ confirm: () => void; cancel: () => void; title: JSXElement }> = (
    props
) => {
    return (
        <div class="card-body p-0">
            <h2 class="card-title">{props.title}</h2>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" onClick={props.confirm}>
                    确认
                </button>
                <button class="btn btn-error" onClick={props.cancel}>
                    取消
                </button>
            </div>
        </div>
    )
}
