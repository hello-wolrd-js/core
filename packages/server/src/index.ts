import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { WorldService } from './services/world'
import { UserService } from './services/user'
import config from '@root/hwjs.config'

new Elysia().use(cors()).use(WorldService).use(UserService).listen(config.server.port)

console.log(`server listen on ${config.server.port}`)
