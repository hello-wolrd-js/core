import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { WorldService } from './service/world'

new Elysia().use(cors()).use(WorldService).listen(4000)

console.log('server listen on 4000')
