import { Component } from 'solid-js'

export const WorldView: Component = () => {
    return (
        <iframe
            id="world-container"
            style={{ width: '100%', height: `${document.body.clientHeight - 60}px` }}
            sandbox="allow-same-origin allow-scripts"
        />
    )
}
