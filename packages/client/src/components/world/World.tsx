import { Component } from 'solid-js'

const World: Component = () => {
    return (
        <iframe
            id="world-container"
            style={{ width: '100%', height: '750px' }}
            sandbox="allow-same-origin allow-scripts"
        />
    )
}

export default World
