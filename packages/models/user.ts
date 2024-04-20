export interface User {
    id: string
    username: string
    password: string
    worlds: string[] //存储所创建世界的id
}
export interface LoginParams {
    username: string
    password: string
}
