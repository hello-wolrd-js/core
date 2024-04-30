import { Component } from 'solid-js'
import { JSX } from 'solid-js/web/types/jsx'
import { TransitionGroup, Transition, TransitionProps } from 'solid-transition-group'

export const Opacity: Component<
    {
        children: JSX.Element
        duration?: [number, number]
        group?: boolean
    } & TransitionProps
> = (props) => {
    const onEnter: TransitionProps['onEnter'] = (el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: props.duration ? props.duration[0] : 500
        })
        a.finished.then(done)
        props.onEnter?.(el, done)
    }
    const onExit: TransitionProps['onExit'] = (el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: props.duration ? props.duration[1] : 500
        })
        a.finished.then(done)
        props.onExit?.(el, done)
    }

    return props.group ? (
        <TransitionGroup onEnter={onEnter} onExit={onExit} children={props.children} />
    ) : (
        <Transition
            mode={props.mode || 'outin'}
            appear={props.appear}
            onEnter={onEnter}
            onExit={onExit}
            children={props.children}
        />
    )
}
