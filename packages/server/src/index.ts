import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import type { WorldCard } from '@core/models'

new Elysia()
    .use(cors())
    .get('/cards', () => {
        const cards: WorldCard[] = Array.from({ length: 10 }, () => {
            return {
                title: 'Kancy Joe',
                cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/Q-%E5%A4%A7%E5%8F%94.png',
                content: 'jooooooe!',
                link: '../../__tests__/cards/01.tsx'
            }
        })
        return cards
    })
    .listen(4000)

console.log('server listen on 4000')
