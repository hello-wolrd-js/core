import { Component, createSignal, JSX } from 'solid-js'
import { Opacity } from '../transition/Opacity'

export const Swap: Component<{ interval: number; elements: JSX.Element[] }> = (props) => {
    const [index, setIndex] = createSignal(0)

    setInterval(() => {
        setIndex((index() + 1) % props.elements.length)
    }, props.interval)

    return <Opacity>{props.elements[index()]}</Opacity>
}
