import Elysia from 'elysia'
import cards from '../../__tests__/world/card'
import { createSuccessResponse } from '../utils'
export const WorldService = new Elysia().group('/world', (app) =>
    app.get('/card', () => createSuccessResponse(200, '获取世界卡片成功', cards))
)
