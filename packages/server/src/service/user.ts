import Elysia from 'elysia'
import { createErrorResponse, createSuccessResponse } from '../util'
import { UserDTO } from '../model'
import { db } from '../db'
import { jwt } from '../plugin'

export const UserService = new Elysia().use(jwt).group('/user', (app) =>
    app
        .post(
            '/login',
            async ({ body, jwt }) => {
                try {
                    const user = await db.user.getUser(body)
                    return createSuccessResponse(200, '登陆成功', {
                        user: user.toJSON(),
                        token: await jwt.sign({
                            username: user.username,
                            role: user.role,
                            id: user._id.toString()
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
                    return createSuccessResponse(200, '注册成功', await db.user.createUser(body))
                } catch (error) {
                    return createErrorResponse(-1, '注册失败: ' + error)
                }
            },
            UserDTO.register
        )
)
