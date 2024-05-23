import type { IPaginateRequest } from './PaginateReq.model'

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  WAITING_FOR_SHIPMENT = 'WAITING_FOR_SHIPMENT',
  PROCESS_OF_SHIPPING = 'PROCESS_OF_SHIPPING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
export interface IGetMyOrderRequest extends IPaginateRequest {
  orderStatus?: OrderStatusEnum
}
