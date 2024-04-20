import { User } from '@core/models'
import { createStore } from 'solid-js/store'

interface UserStoreState {
    user: User | null
    token: string
    loggedIn: boolean
}

const [store, setStore] = createStore<UserStoreState>({
    user: null,
    token: '',
    loggedIn: false
})

function login(user: User, token: string): void {
    setStore({
        user,
        token,
        loggedIn: true
    })
}

function logout(): void {
    setStore({
        user: null,
        token: '',
        loggedIn: false
    })
}

export const useUserStore = () => ({ store, login, logout })
