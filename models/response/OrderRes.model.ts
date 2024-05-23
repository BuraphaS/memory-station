import type { IOrder } from '../Order.model'
import type { PaginateModel } from '../Paginate.model'

export interface IGetOrderResponse extends PaginateModel {
  data: IOrder[]
}
