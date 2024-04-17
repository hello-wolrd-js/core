import { ErrorResponse, SuccessResponse } from '@core/models'

export function createSuccessResponse<T>(code: number, msg: string, data: T): SuccessResponse<T> {
    return {
        code,
        msg,
        data
    }
}
export function createErrorResponse(code: number, error: string): ErrorResponse {
    return {
        code,
        error
    }
}

export function createErrorProvider(msg: string) {
    return {
        error: msg
    }
}
