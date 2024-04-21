import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { WorldService } from './service/world'
import { UserService } from './service/user'

new Elysia().use(cors()).use(WorldService).use(UserService).listen(4000)

console.log('server listen on 4000')
