import _jwt from '@elysiajs/jwt'
import { bearer as _bearer } from '@elysiajs/bearer'
import Elysia from 'elysia'
import { createErrorResponse } from '@core/shared'
import { User } from '@core/models'

//这里secret应该配置成读取环境变量
export const jwt = _jwt({ name: 'jwt', secret: 'hello-world-j' })
export const bearer = _bearer()

export const verifyCommonUser = new Elysia()
    .use(bearer)
    .use(jwt)
    .onBeforeHandle({ as: 'scoped' }, async ({ bearer, jwt, set }) => {
        //校验token
        if (!(await jwt.verify(bearer))) {
            set.status = 403
            return createErrorResponse(-1, 'token鉴权失败')
        }
    })
export const verifyAdminUser = new Elysia()
    .use(bearer)
    .use(jwt)
    .onBeforeHandle({ as: 'scoped' }, async ({ bearer, jwt, set }) => {
        //校验token
        const result = (await jwt.verify(bearer)) as { role: User['role'] }
        if (!result || result.role !== 'admin') {
            set.status = 403
            return createErrorResponse(-1, '管理员token鉴权失败')
        }
    })
