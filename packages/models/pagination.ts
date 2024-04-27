export interface PaginationQueryParams {
    page: number //这里因为是query传参,所以只能用string
    pageSize: number
}
export interface PaginatedList {
    totalItems: number
    totalPages: number
}
