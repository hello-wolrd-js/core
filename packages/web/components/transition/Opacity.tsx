import { Component } from 'solid-js'
import { JSX } from 'solid-js/web/types/jsx'
import { Transition } from 'solid-transition-group'

export const Opacity: Component<{
    children: JSX.Element
    duration?: [number, number]
}> = (props) => {
    return (
        <Transition
            mode="outin"
            onEnter={(el, done) => {
                const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                    duration: props.duration ? props.duration[0] : 500
                })
                a.finished.then(done)
            }}
            onExit={(el, done) => {
                const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: props.duration ? props.duration[1] : 500
                })
                a.finished.then(done)
            }}
        >
            {props.children}
        </Transition>
    )
}
