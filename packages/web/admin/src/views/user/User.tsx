import { USER_API } from '@api/user'
import { Component } from 'solid-js'

export const UserView: Component = () => {
    USER_API.getUser().then((us) => console.log(us))
    return <div>User</div>
}
