import Elysia, { t } from 'elysia'
import { createErrorProvider as E } from '../util'
import { paginationDTO } from './pagination.model'

export const userModel = new Elysia().model({
    'auth-info': t.Object(
        {
            username: t.String(E('需要用户名')),
            password: t.String(E('需要密码'))
        },
        E('需要请求体')
    ),
    'user-query': t.Object({
        username: t.Optional(t.String(E('需要用户名'))),
        ...paginationDTO
    }),
    'update-favorite-query': t.Object(
        {
            world_id: t.String(E('需要world_id')),
            action: t.String(E('需要action: add or delete'))
        },
        E('需要query')
    )
})
