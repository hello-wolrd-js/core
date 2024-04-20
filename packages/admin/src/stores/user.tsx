import { User } from '@core/models'
import { createStore } from 'solid-js/store'

interface StoreState {
    user: User | null
    loggedIn: boolean
}

const [store, setStore] = createStore<StoreState>({
    user: null,
    loggedIn: false
})

function login(user: User): void {
    setStore({
        user: user,
        loggedIn: true
    })
}

function logout(): void {
    setStore({
        user: null,
        loggedIn: false
    })
}

export const useUserStore = () => ({ store, login, logout })
