import type { IGetMyOrderRequest } from '~/models/request/OrderReq.model'
import type { IGetOrderResponse } from '~/models/response/OrderRes.model'
import HttpRequest from '../HttpRequest'

export interface IOrderProvider {
  getMyOrder(query: IGetMyOrderRequest): Promise<any>
  getMyOrderById(orderId: string): Promise<any>
}

class OrderProvider extends HttpRequest implements IOrderProvider {
  private urlPrefix: string = '/v1/orders'

  public async getMyOrder (payload: IGetMyOrderRequest): Promise<IGetOrderResponse> {
    this.setUserAuthHeader()
    const response: IGetOrderResponse = await this.get(`${this.urlPrefix}`, {
      page: payload.page,
      limit: payload.limit,
      orderStatus: payload.orderStatus
    })
    return response
  }

  public async getMyOrderById (orderId: string): Promise<IGetOrderResponse> {
    this.setUserAuthHeader()
    const response: IGetOrderResponse = await this.get(`${this.urlPrefix}/${orderId}`)
    return response
  }
}

export default OrderProvider
