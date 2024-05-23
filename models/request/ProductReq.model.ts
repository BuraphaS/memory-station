export interface IGetProductRequest {
  limit?: number
  page?: number
  sortBy?: string
  sortOrder?: string
  search?: string
  brandIds?: number[] | null
  categoryIds?: number[] | null
}
