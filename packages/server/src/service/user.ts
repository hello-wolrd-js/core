import Elysia from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { UserDTO } from '../model'
import { db } from '../db'
import { bearer, jwt, verifyCommonUser } from '../plugin'

export const UserService = new Elysia()
    .use(bearer)
    .use(jwt)
    .group('/user', (app) =>
        app
            //不需要鉴权的接口
            .guard((app) =>
                app
                    .post(
                        '/login',
                        async ({ body, jwt }) => {
                            try {
                                const user = await db.user.login(body)
                                return createSuccessResponse(200, '登陆成功', {
                                    user: user,
                                    token: await jwt.sign({
                                        username: user.username,
                                        role: user.role,
                                        id: user.id
                                    })
                                })
                            } catch (error) {
                                return createErrorResponse(-1, '登陆失败: ' + error)
                            }
                        },
                        UserDTO.login
                    )
                    .post(
                        '/register',
                        async ({ body }) => {
                            try {
                                return createSuccessResponse(
                                    200,
                                    '注册成功',
                                    await db.user.createUser(body)
                                )
                            } catch (error) {
                                return createErrorResponse(-1, '注册失败: ' + error)
                            }
                        },
                        UserDTO.register
                    )
            )
            //需要鉴权的接口
            .guard((app) =>
                app.use(verifyCommonUser).get('/info', async ({ store }) => {
                    try {
                        return createSuccessResponse(
                            200,
                            '获取用户信息成功',
                            await db.user.getUser(store.user.id)
                        )
                    } catch (error) {
                        return createErrorResponse(-1, '获取用户信息失败: ' + error)
                    }
                })
            )
    )
