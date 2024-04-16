import type { Component } from 'solid-js'

const Aside: Component<{ height: number }> = (props) => {
    return (
        <>
            <aside style={{ width: '100px', height: `${props.height}px` }} class="shadow-xl">
                123
            </aside>
        </>
    )
}

export default Aside
