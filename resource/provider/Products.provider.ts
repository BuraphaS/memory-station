import type { IGetProductRequest } from '~/models/request/ProductReq.model'
import type { IGetProductDetailResponse, IGetProductResponse } from '~/models/response/ProductRes.model'
import HttpRequest from '../HttpRequest'

export interface IProductsProvider {
  getProducts(payload: IGetProductRequest): Promise<IGetProductResponse>
  getProductsById (id: string): Promise<any>
}

class ProductsProvider extends HttpRequest implements IProductsProvider {
  private urlPrefix: string = '/v1/products'

  public async getProducts (payload: IGetProductRequest): Promise<IGetProductResponse> {
    const response: IGetProductResponse = await this.get(`${this.urlPrefix}`, {
      limit: 20,
      page: 1,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      search: '',
      ...payload
    })
    return response
  }

  public async getProductsById (id: string): Promise<IGetProductDetailResponse> {
    const response: IGetProductDetailResponse = await this.get(`${this.urlPrefix}/${id}`)
    return response
  }
}

export default ProductsProvider
