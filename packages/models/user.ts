import { World } from './world'

export interface User {
    id: string
    username: string
    role: 'admin' | 'common'
    released_worlds: World[] //存储所创建世界的id
    favorite_worlds: World[] //收藏的世界
}

export interface LoginParams {
    username: string
    password: string
}
