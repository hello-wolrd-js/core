import Elysia, { t } from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { db } from '../db'
import { WorldDTO } from '../model'
import { verifyAdminUser, verifyCommonUser } from '../plugin'

export const WorldService = new Elysia()
    .onError(({ code, error }) => {
        if (code === 'VALIDATION') return createErrorResponse(-1, error.message)
    }) //部分接口得进行鉴权
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
                                const result = await db.world.getWorld(query as any) //这里因为query必定是字符串所以可以忽略number
                                return createSuccessResponse(200, '获取世界成功', result)
                            } catch (error) {
                                return createErrorResponse(-1, '获取世界失败: ' + error)
                            }
                        },
                        WorldDTO.search
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
                        WorldDTO.create
                    )
                    //删除世界
                    .delete(
                        '/',
                        async ({ query }) => {
                            try {
                                await db.world.deleteWorld(query.id)
                                return createSuccessResponse(200, '删除世界成功', null)
                            } catch (error) {
                                return createErrorResponse(-1, '删除世界失败: ' + error)
                            }
                        },
                        WorldDTO.delete
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
                        WorldDTO.update
                    )
            )
            //admin接口
            .guard((app) =>
                app
                    .use(verifyAdminUser)
                    .post(
                        '/check',
                        async ({ body }) => {
                            try {
                                await db.world.checkedWorld(body.id)
                                return createSuccessResponse(200, '审核成功', null)
                            } catch (error) {
                                return createErrorResponse(-1, '审核失败: ' + error)
                            }
                        },
                        WorldDTO.check
                    )
                    .post(
                        '/uncheck',
                        async ({ body }) => {
                            try {
                                await db.world.uncheckedWorld(body.id)
                                return createSuccessResponse(200, '退回审核成功', null)
                            } catch (error) {
                                return createErrorResponse(-1, '退回审核失败: ' + error)
                            }
                        },
                        WorldDTO.uncheck
                    )
            )
    )
