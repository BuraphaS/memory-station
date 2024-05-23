import HttpRequest from '../HttpRequest'

export interface IAttributeProvider {
  getBrands(payload: any): Promise<any>
  getCategories(payload: any): Promise<any>
}

class AttributeProvider extends HttpRequest implements IAttributeProvider {
  private urlPrefix: string = '/v1/management'
  // TODO : Change end point    ^^^^^^^^^^^^^

  public async getBrands (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/brand-attributes`)
    return response
  }

  public async getCategories (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/category-attributes`)
    return response
  }
}

export default AttributeProvider
