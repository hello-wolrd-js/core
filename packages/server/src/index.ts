import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import cards from '../__tests__/world/card'
import { createSuccessResponse } from './utils'
new Elysia()
    .use(cors())
    .get('/world/card', () => createSuccessResponse(200, '获取世界卡片成功', cards))
    .listen(4000)

console.log('server listen on 4000')
