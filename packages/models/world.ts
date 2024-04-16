export interface WorldCard {
    id: string
    title: string
    cover: string
    style?: {
        width: number
        height: number
    }
    total: {
        star: number
    }
    content: string
    url: string
}
