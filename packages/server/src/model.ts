import { t } from 'elysia'
import { createErrorProvider } from './util'

export const WorldDTO = {
    create: t.Object({
        name: t.String(createErrorProvider('需要name参数')),
        description: t.String(createErrorProvider('需要description参数')),
        cover: t.Optional(t.String()),
        url: t.String(createErrorProvider('需要url参数'))
    }),
    update: t.Object({
        name: t.String(createErrorProvider('需要name参数')),
        description: t.String(createErrorProvider('需要description参数')),
        cover: t.Optional(t.String()),
        url: t.String(createErrorProvider('需要url参数')),
        star: t.Number(createErrorProvider('需要star参数'))
    })
}
