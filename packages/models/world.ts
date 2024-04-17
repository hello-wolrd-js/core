export interface World {
    id: string
    name: string
    card: {
        id: string
        title: string
        cover: string
        description: string
        style?: {
            width: number
            height: number
        }
    }
    total: {
        star: number
    }
    url: string
}
