import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { WorldService } from './service/world'
import staticPlugin from '@elysiajs/static'

new Elysia().use(staticPlugin()).use(cors()).use(WorldService).listen(4000)

console.log('server listen on 4000')
