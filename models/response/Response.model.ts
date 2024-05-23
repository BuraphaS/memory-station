export interface IPaginationResponseBase {
  count: number
  limit: number
  page: number
  totalPage: number
}

export interface IBaseSuccessResponse {
  data: any | any[]
}

export interface ISuccessResponse<T> {
  data: T
}
export interface IPaginationResponse<T> extends IPaginationResponseBase {
  data: T
}
