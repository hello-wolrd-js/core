import Elysia, { t } from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { db } from '../db'
import { WorldDTO } from '../model'
export const WorldService = new Elysia()
    .onError(({ code, error }) => {
        if (code === 'VALIDATION') return createErrorResponse(-1, error.message)
    })
    .group('/world', (app) =>
        app
            .get(
                '/',
                async ({ query }) => {
                    const res = await db.getWorld(query.name)
                    return createSuccessResponse(200, '获取世界成功', res)
                },
                {
                    query: t.Object({
                        name: t.Optional(
                            t.String({
                                error: '需要name参数'
                            })
                        )
                    })
                }
            )
            .post(
                '/',
                async ({ body }) => {
                    console.log(body)
                    const newWorld = await db.createWorld(body)
                    return createSuccessResponse(200, '创建世界成功!', newWorld)
                },
                {
                    body: WorldDTO.create
                }
            )
            .delete(
                '/',
                async ({ query }) => {
                    const res = await db.deleteWorld(query.id)
                    return createSuccessResponse(200, '删除世界成功', res)
                },
                {
                    query: t.Object({
                        id: t.String({
                            error: '需要id参数'
                        })
                    })
                }
            )
            .put(
                '/',
                async ({ query, body }) => {
                    const res = await db.updateWorld(query.id, body)
                    return createSuccessResponse(200, '更新世界成功', res)
                },
                {
                    query: t.Object({
                        id: t.String({
                            error: '需要id参数'
                        })
                    }),
                    body: WorldDTO.update
                }
            )
    )
