import Elysia from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { UserDTO } from '../model'
import { db } from '../db'

export const UserService = new Elysia().group('/user', (app) =>
    app
        .post(
            '/login',
            async ({ body }) => {
                try {
                    return createSuccessResponse(200, '登陆成功', await db.user.getUser(body))
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
                    return createSuccessResponse(200, '注册成功', await db.user.createUser(body))
                } catch (error) {
                    return createErrorResponse(-1, '注册失败: ' + error)
                }
            },
            UserDTO.register
        )
)
