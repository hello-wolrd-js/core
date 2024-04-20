import Elysia, { t } from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { db } from '../db'
import { WorldDTO } from '../model'
export const WorldService = new Elysia()
    .onError(({ code, error }) => {
        if (code === 'VALIDATION') return createErrorResponse(-1, error.message)
    }) //部分接口得进行鉴权
    .group('/world', (app) =>
        app
            .get(
                '/',
                async ({ query }) => {
                    const res = await db.world.getWorld(query.name)
                    return createSuccessResponse(200, '获取世界成功', res)
                },
                WorldDTO.search
            )
            .post(
                '/',
                async ({ body }) => {
                    console.log(body)
                    const newWorld = await db.world.createWorld(body)
                    return createSuccessResponse(200, '创建世界成功,待审核完成后即可公开', newWorld)
                },
                WorldDTO.create
            )
            .delete(
                '/',
                async ({ query }) => {
                    const res = await db.world.deleteWorld(query.id)
                    return createSuccessResponse(200, '删除世界成功', res)
                },
                WorldDTO.delete
            )
            .put(
                '/',
                async ({ query, body }) => {
                    const res = await db.world.updateWorld(query.id, body)
                    return createSuccessResponse(200, '更新世界成功', res)
                },
                WorldDTO.update
            )
            .post(
                '/check',
                async ({ body }) => {
                    try {
                        await db.world.checkedWorld(body.id)
                        return createSuccessResponse(200, '审核成功', null)
                    } catch (error) {
                        return createErrorResponse(-1, error + '')
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
                        return createErrorResponse(-1, error + '')
                    }
                },
                WorldDTO.uncheck
            )
    )
