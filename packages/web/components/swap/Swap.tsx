import { Component, createSignal, JSX, JSXElement, Show } from 'solid-js'
import { Transition, TransitionGroup } from 'solid-transition-group'

export const Swap: Component<{ interval: number; elements: JSX.Element[] }> = (props) => {
    const [index, setIndex] = createSignal(0)

    setInterval(() => {
        setIndex((index() + 1) % props.elements.length)
    }, props.interval)

    return (
        <div>
            <Transition
                mode="outin"
                onEnter={(el, done) => {
                    const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                        duration: 600
                    })
                    a.finished.then(done)
                }}
                onExit={(el, done) => {
                    const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
                        duration: 600
                    })
                    a.finished.then(done)
                }}
            >
                {props.elements[index()]}
            </Transition>
        </div>
    )
}
