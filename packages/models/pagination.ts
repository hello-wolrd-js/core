export interface PaginationQueryParams {
    page?: string //这里因为是query传参,所以只能用string
    pageSize?: string
}
export interface PaginatedList {
    total: number
}
