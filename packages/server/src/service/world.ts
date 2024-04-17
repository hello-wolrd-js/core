import Elysia, { t } from 'elysia'
import cards from '../../__tests__/world/card'
import { createErrorResponse, createSuccessResponse } from '../utils'
import { createWorld } from '../db'
export const WorldService = new Elysia()
    .onError(({ code, error }) => {
        if (code === 'VALIDATION')
            return createErrorResponse(-1, error.validator.Errors(error.value).First().message)
    })
    .group('/world', (app) =>
        app
            .get('/card', () => createSuccessResponse(200, '获取世界卡片成功', cards))
            .post(
                '/',
                ({ body }) => {
                    createWorld(body.name)
                    return createSuccessResponse(200, '创建世界成功!', body)
                },
                {
                    body: t.Object(
                        {
                            name: t.String()
                        },
                        {
                            error: 'x must be a number'
                        }
                    )
                }
            )
    )
