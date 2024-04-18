import type { Component, JSX } from 'solid-js'
import NavBar from './components/layout/NavBar'
import { Toaster } from 'solid-toast'

const navHeight = 64
const App: Component<{ children?: JSX.Element }> = (props) => {
    return (
        <div class="flex flex-col h-full">
            <NavBar height={navHeight}></NavBar>
            <Toaster position="top-center" gutter={8} />
            <main class="w-full h-full" style={{ 'margin-top': `${navHeight}px` }}>
                {props.children}
            </main>
        </div>
    )
}

export default App
