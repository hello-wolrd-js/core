import { UserCard } from '@/components/card/UserCard'
import { USER_API } from '@api/user'
import { SimpleUserInfo } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Component, For, createSignal } from 'solid-js'
import toast from 'solid-toast'

export const UserView: Component = () => {
    const [list, setList] = createSignal<SimpleUserInfo[]>([])
    USER_API.getUser().then((result) => {
        if (isSuccessResponse(result)) {
            setList(result.data)
        } else {
            toast.error(result.error)
        }
    })
    return (
        <div class="h-full flex flex-wrap overflow-auto">
            <For each={list()} children={(user) => UserCard(user)} />
        </div>
    )
}
