import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import cards from '../__tests__/card/01'
new Elysia()
    .use(cors())
    .use(staticPlugin())
    .get('/cards', () => cards)
    .listen(4000)

console.log('server listen on 4000')
