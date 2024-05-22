import { PaginationQueryParams } from './pagination'

export interface User {
    id: string //用户id
    avatar: string //用户头像
    username: string //用户名
    role: 'admin' | 'common' //用户身份
    released_worlds: string[] //创建世界的id
    favorite_worlds: string[] //收藏的世界id
}

export interface SimpleUserInfo extends Omit<User, 'favorite_worlds' | 'released_worlds'> {}

export interface UserAuthParams {
    username: string
    password: string
}
export interface UserLoginParams extends UserAuthParams {}

export interface UserRegisterParams extends UserAuthParams {}

export interface UserQueryParams extends Pick<User, 'username'>, PaginationQueryParams {}

export interface UserUpdateParams extends Pick<User, 'avatar' | 'username'> {}
