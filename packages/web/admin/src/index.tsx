/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'
import { Route, Router } from '@solidjs/router'
import { Home } from '@/components/home/Home'
import { World } from '@components/world/World'
import { Toaster } from 'solid-toast'
import { NotFound } from '@components/status/404'

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
                <Route path="/" component={Home} />
                <Route path="/world" component={World} />
                <Route path="*404" component={NotFound} />
            </Router>
            <Toaster position="top-center" gutter={6} />
        </>
    ),
    root!
)
