import { User } from './user'

export interface World {
    id: string
    owner: Omit<User, 'favorite_worlds' | 'released_worlds'>
    name: string
    description: string
    cover?: string
    star: number
    url: string //世界url
    checked: boolean //是否通过审核
}
