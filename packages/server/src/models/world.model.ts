import Elysia, { t } from 'elysia'
import { paginationDTO } from './pagination.model'
import { createErrorProvider as E } from '../util'

export const worldModel = new Elysia().model({
    'mark-world': t.Object({
        id: t.String(E('需要世界id'))
    }),
    'report-world': t.Object({
        id: t.String(E('需要世界id')),
        reason: t.String(E('需要举报理由reason'))
    }),
    'query-world': t.Object({
        id: t.Optional(t.String()),
        name: t.Optional(t.String()),
        status: t.Optional(t.String()),
        ...paginationDTO
    }),
    'create-world': t.Object({
        name: t.String(E('需要name参数')),
        description: t.String(E('需要description参数')),
        cover: t.Optional(t.String()),
        url: t.String(E('需要url参数'))
    }),
    'update-world': t.Object({
        name: t.String(E('需要name参数')),
        description: t.String(E('需要description参数')),
        cover: t.Optional(t.String()),
        url: t.String(E('需要url参数')),
        star: t.Number(E('需要star参数'))
    })
})
