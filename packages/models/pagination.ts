export interface PaginationQueryParams {
    page?: number
    pageSize?: number
}
export interface PaginatedList extends Required<PaginationQueryParams> {
    total: number
}
