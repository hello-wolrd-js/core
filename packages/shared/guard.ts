import { ErrorResponse, SuccessResponse } from '@core/models'

export function isSuccessResponse<T>(
    response: SuccessResponse<T> | ErrorResponse
): response is SuccessResponse<T> {
    return typeof (response as any).error === 'undefined'
}
