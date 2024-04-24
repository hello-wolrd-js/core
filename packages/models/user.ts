export interface User {
    id: string
    username: string
    role: 'admin' | 'common'
    released_worlds: string[] //创建世界的id
    favorite_worlds: string[] //收藏的世界id
}

export interface UserLoginParams {
    username: string
    password: string
}

export interface UserRegisterParams extends UserLoginParams {}
