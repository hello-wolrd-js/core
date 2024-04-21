export interface User {
    id: string
    username: string
    role: 'admin' | 'common'
    worlds: string[] //存储所创建世界的id
}

export interface LoginParams {
    username: string
    password: string
}
