import { t } from 'elysia'
import { createErrorProvider } from './util'

export const WorldDTO = {
    create: t.Object({
        name: t.String(createErrorProvider('需要name参数')),
        card: t.Object({
            title: t.String(createErrorProvider('card需要title参数')),
            description: t.String(createErrorProvider('card需要description参数')),
            cover: t.Optional(t.String()),
            style: t.Optional(
                t.Object({
                    width: t.Number(createErrorProvider('style需要width')),
                    height: t.Number(createErrorProvider('style需要height'))
                })
            )
        }),
        url: t.String(createErrorProvider('需要url参数'))
    }),
    update: t.Object({
        name: t.String(createErrorProvider('需要name参数')),
        card: t.Object({
            title: t.String(createErrorProvider('card需要title参数')),
            description: t.String(createErrorProvider('card需要description参数')),
            cover: t.Optional(t.String()),
            style: t.Optional(
                t.Object({
                    width: t.Number(createErrorProvider('style需要width')),
                    height: t.Number(createErrorProvider('style需要height'))
                })
            )
        }),
        url: t.String(createErrorProvider('需要url参数')),
        total: t.Object({
            star: t.Number(createErrorProvider('需要star参数'))
        })
    })
}
