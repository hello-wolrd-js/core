import { ErrorResponse, SuccessResponse, World } from '@core/models'

export function createErrorProvider(msg: string) {
    return {
        error: msg
    }
}

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

export function isPopulatedWorlds(worlds: string[] | World[]): worlds is World[] {
    if (typeof worlds[0] === 'string') {
        return false
    } else {
        return true
    }
}
