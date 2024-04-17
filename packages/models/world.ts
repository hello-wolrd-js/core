export interface World {
    id: string
    name: string
    card: {
        title: string
        description: string
        cover?: string
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
