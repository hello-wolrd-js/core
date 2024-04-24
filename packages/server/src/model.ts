import { t } from 'elysia'
import { createErrorProvider as E } from './util'

export const WorldDTO = {
    search: {
        query: t.Object({
            id: t.Optional(t.String(E('id得是字符串!'))),
            name: t.Optional(t.String(E('name得是字符串!'))),
            status: t.Optional(t.String(E('status必须为: checked,unchecked')))
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
            id: t.String(E('需要id参数'))
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
            id: t.String(E('需要id参数'))
        })
    },
    check: {
        body: t.Object(
            {
                id: t.String(E('需要id参数'))
            },
            E('需要请求体')
        )
    },
    uncheck: {
        body: t.Object(
            {
                id: t.String()
            },
            E('需要请求体')
        )
    }
}

export const UserDTO = {
    login: {
        body: t.Object(
            {
                username: t.String(),
                password: t.String()
            },
            E('需要请求体')
        )
    },
    register: {
        body: t.Object(
            {
                username: t.String(),
                password: t.String()
            },
            E('需要请求体')
        )
    },
    updateFavoriteWorld: {
        body: t.Object(
            {
                world_id: t.String()
            },
            E('需要请求体')
        )
    }
}
