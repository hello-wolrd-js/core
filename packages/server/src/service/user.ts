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
                    //登陆
                    .post(
                        '/login',
                        async ({ body, jwt }) => {
                            try {
                                const user = await db.user.login(body)
                                const token = await jwt.sign({
                                    username: user.username,
                                    role: user.role,
                                    id: user.id
                                })
                                return createSuccessResponse(200, '登陆成功', {
                                    user,
                                    token
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
                        async ({ body, jwt }) => {
                            try {
                                //注册完也要返回token
                                const user = await db.user.createUser(body)
                                const token = await jwt.sign({
                                    username: user.username,
                                    role: user.role,
                                    id: user.id
                                })
                                return createSuccessResponse(200, '注册成功', {
                                    user,
                                    token
                                })
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
                    //获取收藏的世界
                    .get('/favorite/world', async ({ store, set, query }) => {
                        try {
                            return createSuccessResponse(
                                200,
                                '获取收藏世界成功',
                                await db.user.getUserFavoriteWorlds(store.user.id, query)
                            )
                        } catch (error) {
                            set.status = 400
                            return createErrorResponse(-1, '获取收藏世界失败: ' + error)
                        }
                    })
                    //获取已发布的世界
                    .get('/released/world', async ({ store, set, query }) => {
                        try {
                            return createSuccessResponse(
                                200,
                                '获取已发布世界成功',
                                await db.user.getUserReleasedWorlds(store.user.id, query)
                            )
                        } catch (error) {
                            set.status = 400
                            return createErrorResponse(-1, '获取已发布世界失败: ' + error)
                        }
                    })
                    //更新收藏的世界
                    .put(
                        '/favorite/world',
                        async ({ store, query, set }) => {
                            try {
                                return createSuccessResponse(
                                    200,
                                    '更新收藏成功',
                                    await db.user.updateUserFavoriteWorld(
                                        store.user.id,
                                        query.world_id,
                                        query.action
                                    )
                                )
                            } catch (error) {
                                set.status = 400
                                return createErrorResponse(-1, '更新收藏失败: ' + error)
                            }
                        },
                        UserDTO.updateFavoriteWorld
                    )
            )
    )
