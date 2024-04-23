import Elysia, { t } from 'elysia'
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
                    //登陆
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
                    //注册
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
                app
                    .use(verifyCommonUser)
                    //获取个人信息
                    .get('/info', async ({ store, set }) => {
                        try {
                            return createSuccessResponse(
                                200,
                                '获取用户信息成功',
                                await db.user.getUser(store.user.id)
                            )
                        } catch (error) {
                            set.status = 400
                            return createErrorResponse(-1, '获取用户信息失败: ' + error)
                        }
                    })
                    //收藏世界
                    .put(
                        '/favorite/world',
                        async ({ store, body, set }) => {
                            try {
                                return createSuccessResponse(
                                    200,
                                    '收藏世界成功',
                                    await db.user.updateUserFavoriteWorld(
                                        store.user.id,
                                        body.world_id
                                    )
                                )
                            } catch (error) {
                                set.status = 400
                                return createErrorResponse(-1, '收藏世界失败: ' + error)
                            }
                        },
                        UserDTO.updateFavoriteWorld
                    )
            )
    )
