import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import cards from '../__tests__/card/01'
new Elysia()
    .use(cors())
    .get('/cards', () => cards)
    .listen(4000)

console.log('server listen on 4000')
