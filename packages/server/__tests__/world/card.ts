import { World } from '@core/models'

const cards: World[] = [
    {
        id: '1',
        name: '01',
        card: {
            id: '1',
            title: 'Hoshino-Q',
            cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/Q-%E5%A4%A7%E5%8F%94.png',
            description: 'Abydos',
            style: {
                width: 300,
                height: 500
            }
        },
        url: './src/__tests__/cards/your-world.mjs',
        total: {
            star: 111
        }
    },
    {
        id: '2',
        name: '02',
        card: {
            id: '2',
            title: 'Highland Railroad Academy',
            cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/%E9%93%81%E9%81%93%E5%8F%8C%E5%AD%90.png',
            description: '最多二创的一集',
            style: {
                width: 300,
                height: 600
            }
        },
        url: './src/__tests__/cards/your-world.mjs',
        total: {
            star: 123456
        }
    }
]

export default cards
