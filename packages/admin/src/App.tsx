import type { Component, JSX } from 'solid-js'
import styles from './App.module.css'
import NavBar from './components/layout/NavBar'

const navHeight = 60

const App: Component<{ children?: JSX.Element }> = (props) => {
    return (
        <div class={styles.AppLayout}>
            <NavBar height={navHeight}></NavBar>
            <div style={{ display: 'flex' }}>
                <main style={{ width: '100%', 'margin-top': `${navHeight}px` }}>
                    {props.children}
                </main>
            </div>
        </div>
    )
}

export default App