import { User } from './user'

export interface World {
    id: string
    owner: Omit<User, 'favorite_worlds' | 'released_worlds'>
    name: string
    description: string
    cover?: string
    url: string //世界url
    star: number
    status: 'checked' | 'unchecked' | string
}

export interface WorldCreateParams {
    name: string
    description: string
    cover?: string
    url: string //世界url
}

export interface WorldUpdateParams extends WorldCreateParams {
    star: number
}

//世界查询参数
export interface WorldQueryParams {
    id?: string
    name?: string
    status?: World['status']
}
