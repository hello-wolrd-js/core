import { Component, Show, createEffect, createMemo, createSignal, onCleanup } from 'solid-js'
import { JSX } from 'solid-js/web/types/jsx'
import { Transition } from 'solid-transition-group'
import './Carousel.css'

export const Carousel: Component<{ elements: JSX.Element[]; auto: boolean }> = (props) => {
    const [currentIndex, setCurrentIndex] = createSignal(0)
    //自动定时切换
    if (props.auto) {
        setInterval(() => {
            setCurrentIndex((currentIndex() + 1) % props.elements.length)
        }, 2000)
    }

    return (
        <div
            class="w-full h-full"
            style={{ transition: '1s', transform: `translateY(-${currentIndex()}00%)` }}
        >
            {props.elements}
        </div>
    )
}
