import { WorldCard } from '@core/models'

const cards: WorldCard[] = [
    {
        title: 'Hoshino-Q',
        cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/Q-%E5%A4%A7%E5%8F%94.png',
        content: 'Abydos',
        url: './src/__tests__/cards/your-world.mjs',
        style: {
            width: 300,
            height: 500
        },
        total: {
            star: 111
        }
    },
    {
        title: 'Railway academy',
        cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/%E9%93%81%E9%81%93%E5%8F%8C%E5%AD%90.png',
        content: '最多二创的一集',
        url: './src/__tests__/cards/your-world.mjs',
        style: {
            width: 300,
            height: 600
        },
        total: {
            star: 123456
        }
    },
    {
        title: 'Usagi',
        cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/f6771a831165bbc5247d7902560c6995.png',
        content: '很酷,不说话',
        url: './src/__tests__/cards/your-world.mjs',
        style: {
            width: 300,
            height: 500
        },
        total: {
            star: 0
        }
    },
    {
        title: '大学生趋势指南',
        cover: 'https://pub-a08fa93d49d347298f3cfbf1f32118b8.r2.dev/fe6b63cc208c2ac8948d43e7c669802e.png',
        content: '如图所示',
        url: './src/__tests__/cards/your-world.mjs',
        total: {
            star: 0
        }
    }
]

export default cards
