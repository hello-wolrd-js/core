import { USER_API } from '@api/user'
import { User, World, WorldList, WorldQueryParams } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { createStore, produce } from 'solid-js/store'

interface UserStoreState {
    user: User | null
    token: string
    loggedIn: boolean
    favorite_worlds: WorldList
    released_worlds: WorldList
}

const [store, setStore] = createStore<UserStoreState>({
    user: null,
    token: localStorage.getItem('token') || '',
    loggedIn: false,
    favorite_worlds: {
        list: [],
        total: 0
    },
    released_worlds: {
        list: [],
        total: 0
    }
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
        loggedIn: false,
        favorite_worlds: {
            list: [],
            total: 0
        },
        released_worlds: {
            list: [],
            total: 0
        }
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

const addUserFavoriteWorld = async (world: World) => {
    const result = await USER_API.updateUserFavoriteWorld(world.id, 'add')
    if (isSuccessResponse(result)) {
        setStore(
            produce((state) => {
                state.user!.favorite_worlds.push(world.id)
                state.favorite_worlds.list.push(world)
            })
        )
    }
    return result
}
const deleteUserFavoriteWorld = async (world: World) => {
    const result = await USER_API.updateUserFavoriteWorld(world.id, 'delete')
    if (isSuccessResponse(result)) {
        setStore(
            produce((state) => {
                state.user!.favorite_worlds = state.user!.favorite_worlds.filter(
                    (id) => id !== world.id
                )
                state.favorite_worlds.list = state.favorite_worlds.list.filter(
                    (w) => w.id !== world.id
                )
            })
        )
    }
    return result
}

const getUserFavoriteWorlds = async (params?: WorldQueryParams) => {
    const result = await USER_API.getUserFavoriteWorlds(params)
    if (isSuccessResponse(result)) {
        setStore('favorite_worlds', result.data)
    }
    return result
}

const getUserReleasedWorlds = async (params?: WorldQueryParams) => {
    const result = await USER_API.getUserReleasedWorlds(params)
    if (isSuccessResponse(result)) {
        setStore('released_worlds', result.data)
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
        deleteUserFavoriteWorld,
        getUserFavoriteWorlds,
        getUserReleasedWorlds
    }
}
