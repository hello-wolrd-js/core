import { User } from './user'

export interface World {
    id: string
    owner: Omit<User, 'favorite_worlds' | 'released_worlds'>
    name: string
    description: string
    cover?: string
    star: number
    url: string //世界url
    status: 'checked' | 'unchecked'
}

//世界查询参数
export interface WorldQueryParams {
    id?: string
    name?: string
    status?: World['status']
}
