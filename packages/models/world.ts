export interface WorldCard {
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
