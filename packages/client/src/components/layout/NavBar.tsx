import { Component } from 'solid-js'

const NavBar: Component<{ height: number }> = (props) => {
    return (
        <header
            style={{
                width: '100%',
                height: `${props.height}px`,
                display: 'flex',
                position: 'fixed',
                padding: '10px',
                'z-index': 100
            }}
            class="shadow-xl flex items-center bg-white"
        >
            <div class="text-lg">Hello-World</div>
        </header>
    )
}

export default NavBar
