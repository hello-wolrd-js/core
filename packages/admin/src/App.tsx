import type { Component, JSX } from 'solid-js'
import { Toaster } from 'solid-toast'
import NavBar from './components/layout/NavBar'

const navHeight = 64

const App: Component<{ children?: JSX.Element }> = (props) => {
    return (
        <div class="flex h-full flex-col">
            <NavBar height={navHeight} />
            <Toaster position="top-center" gutter={8} />
            <main class="w-full h-full" style={{ 'margin-top': `${navHeight}px` }}>
                {props.children}
            </main>
        </div>
    )
}

export default App
