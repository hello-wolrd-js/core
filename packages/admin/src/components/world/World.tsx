import { Component } from 'solid-js'

const World: Component = () => {
    return (
        <iframe
            id="world-container"
            style={{ width: '100%', height: `${document.body.clientHeight - 60}px` }}
            sandbox="allow-same-origin allow-scripts"
        />
    )
}

export default World
