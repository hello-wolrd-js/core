/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'
import { Route, Router } from '@solidjs/router'
import { WorldView } from '@components/world/World'
import { NotFound } from '@components/status/404'
import { HomeView } from '@/views/home/Home'
import { PublishView } from '@/views/publish/Publish'
import { FavoriteView } from '@/views/favorite/Favorite'
import { ReleasedView } from '@/views/released/Released'
import { HotView } from '@/views/hot/Hot'
import { UserView } from '@/views/user/User'
import 'animate.css'
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
                <Route path="/" component={HomeView} />
                <Route path="/world" component={WorldView} />
                <Route path="/publish" component={PublishView} />
                <Route path="/favorite" component={FavoriteView} />
                <Route path="/released" component={ReleasedView} />
                <Route path="/hot" component={HotView} />
                <Route path="/user" component={UserView} />
                <Route path="*404" component={NotFound} />
            </Router>
            <Toaster position="top-center" gutter={8} />
        </>
    ),
    root!
)
