import { t } from 'elysia'
import { createErrorProvider as E } from './util'

export const WorldDTO = {
    search: {
        //查询参数
        query: t.Object({
            id: t.Optional(t.String()),
            name: t.Optional(t.String()),
            status: t.Optional(t.String()),
            page: t.Optional(t.String()),
            pageSize: t.Optional(t.String())
        })
    },
    create: {
        body: t.Object({
            name: t.String(E('需要name参数')),
            description: t.String(E('需要description参数')),
            cover: t.Optional(t.String()),
            url: t.String(E('需要url参数'))
        })
    },
    update: {
        query: t.Object({
            id: t.String(E('需要世界id'))
        }),
        body: t.Object({
            name: t.String(E('需要name参数')),
            description: t.String(E('需要description参数')),
            cover: t.Optional(t.String()),
            url: t.String(E('需要url参数')),
            star: t.Number(E('需要star参数'))
        })
    },
    delete: {
        query: t.Object({
            id: t.String(E('需要世界id'))
        })
    },
    check: {
        body: t.Object(
            {
                id: t.String(E('需要世界id'))
            },
            E('需要请求体')
        )
    },
    uncheck: {
        body: t.Object(
            {
                id: t.String(E('需要世界id'))
            },
            E('需要请求体')
        )
    },
    report: {
        body: t.Object({
            id: t.String(E('需要世界id')),
            reason: t.String(E('需要举报理由reason'))
        })
    }
}

export const UserDTO = {
    login: {
        body: t.Object(
            {
                username: t.String(E('需要用户名')),
                password: t.String(E('需要密码'))
            },
            E('需要请求体')
        )
    },
    register: {
        body: t.Object(
            {
                username: t.String(E('需要用户名')),
                password: t.String(E('需要密码'))
            },
            E('需要请求体')
        )
    },
    search: {
        query: t.Object({
            username: t.Optional(t.String(E('需要用户名')))
        })
    },
    updateFavoriteWorld: {
        query: t.Object(
            {
                world_id: t.String(E('需要world_id')),
                action: t.String(E('需要action: add or delete'))
            },
            E('需要query')
        )
    }
}
