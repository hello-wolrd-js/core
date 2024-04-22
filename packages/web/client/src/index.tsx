/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'
import { Route, Router } from '@solidjs/router'
import { Home } from '@/components/home/Home'
import { World } from '@components/world/World'
import { Publish } from './components/publish/Publish'
import { NotFound } from '@components/status/404'
import { Toaster } from 'solid-toast'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
    )
}

render(
    () => (
        <>
            <Router root={App}>
                <Route path="/" component={Home}></Route>
                <Route path="/world" component={World}></Route>
                <Route path="/publish" component={Publish}></Route>
                <Route path="*404" component={NotFound} />
            </Router>
            <Toaster position="top-center" gutter={8} />
        </>
    ),
    root!
)
