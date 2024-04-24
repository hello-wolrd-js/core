import { USER_API } from '@api/user'
import { User } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { createStore } from 'solid-js/store'

interface UserStoreState {
    user: User | null
    token: string
    loggedIn: boolean
}

const [store, setStore] = createStore<UserStoreState>({
    user: null,
    token: localStorage.getItem('token') || '',
    loggedIn: false
})

function login(user: User, token: string): void {
    setStore({
        user,
        token,
        loggedIn: true
    })
    localStorage.setItem('token', token)
}

function logout(): void {
    setStore({
        user: null,
        token: '',
        loggedIn: false
    })
    localStorage.clear()
}

export const useUserStore = () => ({ state: store, login, logout, setStore })
