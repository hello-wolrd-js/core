import _jwt from '@elysiajs/jwt'
import { bearer as _bearer } from '@elysiajs/bearer'
import Elysia from 'elysia'
import { createErrorResponse } from './util'
import { User } from '@core/models'

export interface JwtPayload {
    username: string
    id: string
    role: string
}
//这里secret应该配置成读取环境变量
export const jwt = _jwt({ name: 'jwt', secret: 'hello-world-j' })
export const bearer = _bearer()

const verifyBase = new Elysia()
    .use(bearer)
    .use(jwt)
    .state('user', { username: '', id: '', role: '' } as JwtPayload)

export const verifyCommonUser = verifyBase.onBeforeHandle(
    { as: 'scoped' },
    async ({ bearer, jwt, set, store }) => {
        //校验token
        const payload = await jwt.verify(bearer)
        if (!payload) {
            set.status = 403
            return createErrorResponse(-1, 'token鉴权失败')
        } else {
            store.user = payload as unknown as JwtPayload
        }
    }
)
export const verifyAdminUser = verifyBase.onBeforeHandle(
    { as: 'scoped' },
    async ({ bearer, jwt, set, store }) => {
        //校验token
        const payload = (await jwt.verify(bearer)) as { role: User['role'] }
        if (!payload || payload.role !== 'admin') {
            set.status = 403
            return createErrorResponse(-1, '管理员token鉴权失败')
        } else {
            store.user = payload as unknown as JwtPayload
        }
    }
)
