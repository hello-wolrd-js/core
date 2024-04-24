import { USER_API } from '@api/user'
import { User } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { createStore, produce } from 'solid-js/store'
import { useWorldStore } from './world'

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

const login = (user: User, token: string) => {
    setStore({
        user,
        token,
        loggedIn: true
    })
    localStorage.setItem('token', token)
}

const logout = () => {
    setStore({
        user: null,
        token: '',
        loggedIn: false
    })
    localStorage.clear()
}

const getUserInfo = async () => {
    const result = await USER_API.getUserInfo()
    if (isSuccessResponse(result)) {
        setStore('user', result.data)
    }
    return result
}

const addUserFavoriteWorld = async (id: string) => {
    const result = await USER_API.updateUserFavoriteWorld(id, 'add')
    if (isSuccessResponse(result)) {
        setStore(
            'user',
            produce((user) => user!.favorite_worlds.push(id))
        )
    }
    return result
}
const deleteUserFavoriteWorld = async (id: string) => {
    const result = await USER_API.updateUserFavoriteWorld(id, 'delete')
    if (isSuccessResponse(result)) {
        setStore(
            'user',
            produce((user) => {
                user!.favorite_worlds = user!.favorite_worlds.filter((id) => id !== id)
            })
        )
    }
    return result
}

export const useUserStore = () => {
    return {
        state: store,
        login,
        logout,
        setStore,
        getUserInfo,
        addUserFavoriteWorld,
        deleteUserFavoriteWorld
    }
}
