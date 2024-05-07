import { PaginatedList, PaginationQueryParams } from './pagination'
import { User } from './user'

export interface World {
    id: string
    owner: Omit<User, 'favorite_worlds' | 'released_worlds'>
    name: string
    description: string
    cover?: string
    url: string
    star: number
    //已审核,未审核,被举报
    status: 'checked' | 'unchecked' | 'reported'
}

export interface WorldList extends PaginatedList {
    list: World[]
}

export interface WorldCreateParams {
    name: string
    description: string
    url: string
    cover?: string
}

export interface WorldUpdateParams extends WorldCreateParams {
    star: number
}

//世界查询参数
export interface WorldQueryParams
    extends Partial<PaginationQueryParams>,
        Partial<Pick<World, 'id' | 'name' | 'status'>> {}
