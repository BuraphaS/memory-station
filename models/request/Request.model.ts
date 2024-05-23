interface IPagination {
  page: number
  pageSize?: number
}

export interface IPaginationRequest {
  pagination: IPagination
  sort?: string | string[]
}
