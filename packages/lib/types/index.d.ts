/**
 * 使用 hwjs API,写成函数调用的形式是因为某些API需要正确的执行上下文
 * @returns hwjs API
 */
export declare const useHWJS: () => {
    /**
     * 获取用户信息
     * @returns 用户信息的只读代理对象
     */
    getUser: () => User
    /**
     * solidjs-toast消息条实例
     */
    toast: object
    /**
     * modal实例
     */
    modal: {
        open: (content: string) => void
        close: () => void
    }
}

/**
 * HWJS
 */
export declare type HWJS = ReturnType<typeof useHWJS>

/**
 * 用户信息
 */
declare interface User {
    id: string
    username: string
    role: 'admin' | 'common'
    released_worlds: string[]
    favorite_worlds: string[]
}
