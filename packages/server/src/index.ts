import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { WorldService } from './service/world'
import { UserService } from './service/user'

const port = process.env['HWJS_PORT']
if (!port) {
    console.error('未配置 HWJS_PORT 环境变量')
    process.exit(1)
}
new Elysia().use(cors()).use(WorldService).use(UserService).listen(port)

// new Elysia().get('/hello', () => 'hello!').listen(port)

console.log(`server listen on ${port}`)
