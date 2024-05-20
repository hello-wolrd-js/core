export interface SuccessResponse<T> {
    code: number
    msg: string
    data: T
}
export interface ErrorResponse<U = string> {
    code: number
    error: U
}

export type Response<T, U = string> = SuccessResponse<T> | ErrorResponse<U>
