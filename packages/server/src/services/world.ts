import Elysia, { t } from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { db } from '../db'
import { verifyAdminUser, verifyCommonUser } from '../plugins/jwt'
import { worldModel } from '../models/world.model'

export const WorldService = new Elysia()
    .onError(({ code, error }) => {
        if (code === 'VALIDATION') return createErrorResponse(-1, error.message)
    }) //部分接口得进行鉴权
    .use(worldModel)
    .group('/world', (app) =>
        app
            //common接口
            .guard((app) =>
                app
                    .use(verifyCommonUser)
                    //获取世界
                    .get(
                        '/',
                        async ({ query }) => {
                            try {
                                const result = await db.world.getWorld(query) //这里因为query必定是字符串所以可以忽略number
                                return createSuccessResponse(200, '获取世界成功', result)
                            } catch (error) {
                                return createErrorResponse(-1, '获取世界失败: ' + error)
                            }
                        },
                        {
                            query: 'query-world'
                        }
                    )
                    //获取最多star的世界
                    .get(
                        '/most/star',
                        async ({ query }) => {
                            try {
                                const limit = parseInt(query.limit) || 1
                                const result = await db.world.getMostStarWorld(limit)
                                return createSuccessResponse(200, '获取世界成功', result)
                            } catch (error) {
                                return createErrorResponse(-1, '获取世界失败: ' + error)
                            }
                        },
                        {
                            query: t.Object({
                                limit: t.String()
                            })
                        }
                    )
                    //创建世界
                    .post(
                        '/',
                        async ({ body, store }) => {
                            try {
                                const newWorld = await db.world.createWorld(body, store.user.id)
                                return createSuccessResponse(
                                    200,
                                    '创建世界成功,待审核完成后即可公开',
                                    newWorld
                                )
                            } catch (error) {
                                return createErrorResponse(-1, '创建世界失败: ' + error)
                            }
                        },
                        {
                            body: 'create-world'
                        }
                    )
                    //删除世界
                    .delete(
                        '/',
                        async ({ query, store }) => {
                            try {
                                await db.world.deleteWorld(query.id, store.user.id)
                                return createSuccessResponse(200, '删除世界成功', null)
                            } catch (error) {
                                return createErrorResponse(-1, '删除世界失败: ' + error)
                            }
                        },
                        {
                            query: 'mark-world'
                        }
                    )
                    //更新世界信息
                    .put(
                        '/',
                        async ({ query, body }) => {
                            try {
                                const res = await db.world.updateWorld(query.id, body)
                                return createSuccessResponse(200, '更新世界成功', res?.toJSON())
                            } catch (error) {
                                return createErrorResponse(-1, '更新世界失败: ' + error)
                            }
                        },
                        {
                            query: 'mark-world',
                            body: 'update-world'
                        }
                    )
                    //举报世界
                    .put(
                        '/report',
                        async ({ body }) => {
                            try {
                                const world = await db.world.updateWorldStatus(body.id, 'reported')
                                return createSuccessResponse(200, '举报成功', world)
                            } catch (error) {
                                return createErrorResponse(-1, '举报失败: ' + error)
                            }
                        },
                        {
                            body: 'report-world'
                        }
                    )
            )
            //admin接口
            .guard((app) =>
                app
                    .use(verifyAdminUser)
                    .put(
                        '/check',
                        async ({ body }) => {
                            try {
                                const world = await db.world.updateWorldStatus(body.id, 'checked')
                                return createSuccessResponse(200, '审核成功', world)
                            } catch (error) {
                                return createErrorResponse(-1, '审核失败: ' + error)
                            }
                        },
                        {
                            body: 'mark-world'
                        }
                    )
                    .put(
                        '/uncheck',
                        async ({ body }) => {
                            try {
                                const world = await db.world.updateWorldStatus(body.id, 'unchecked')
                                return createSuccessResponse(200, '退回审核成功', world)
                            } catch (error) {
                                return createErrorResponse(-1, '退回审核失败: ' + error)
                            }
                        },
                        {
                            body: 'mark-world'
                        }
                    )
            )
    )
