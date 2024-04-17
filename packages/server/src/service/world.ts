import Elysia, { t } from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { createWorld, deleteWorld, getWorld, updateWorld } from '../db'
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
                    const res = await getWorld(query.name)
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
                    const newWorld = await createWorld(body)
                    return createSuccessResponse(200, '创建世界成功!', newWorld)
                },
                {
                    body: WorldDTO.create
                }
            )
            .delete(
                '/',
                async ({ query }) => {
                    const res = await deleteWorld(query.name)
                    return createSuccessResponse(200, '删除世界成功', res)
                },
                {
                    query: t.Object({
                        name: t.String({
                            error: '需要name参数'
                        })
                    })
                }
            )
            .put(
                '/',
                async ({ query, body }) => {
                    const res = await updateWorld(query.id, body)
                    return createSuccessResponse(200, '删除世界成功', res)
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
