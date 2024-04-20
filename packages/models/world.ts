export interface World {
    id: string
    name: string
    description: string
    cover?: string
    star: number
    url: string //世界url
    checked: boolean //是否通过审核
}
