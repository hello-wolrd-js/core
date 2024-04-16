import { ErrorResponse, SuccessResponse } from '@core/models'
import type { AxiosError, AxiosResponse } from 'axios'
export async function handleRequest<T>(
    request:
        | Promise<AxiosResponse<SuccessResponse<T>>>
        | (() => Promise<AxiosResponse<SuccessResponse<T>>>),
    options: {
        onSuccess?: (data: SuccessResponse<T>) => void
        onError?: (error: AxiosError<ErrorResponse>) => void
        onFinal?: () => void
        useRefresh?: boolean
        useCatch?: boolean
    } = {}
): Promise<SuccessResponse<T> | ErrorResponse> {
    try {
        const response = await (typeof request === 'function' ? request() : request)
        options.onSuccess?.(response.data)
        return response.data
    } catch (_error) {
        const error = _error as AxiosError<ErrorResponse>
        options.onError?.(error)
        return (
            error.response?.data || {
                code: -1,
                error: '网络错误!'
            }
        )
    }
}
