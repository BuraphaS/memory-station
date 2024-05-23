import HttpRequest from '../HttpRequest'

export interface ICMSProvider {
  getBanner (): Promise<any>
  getAboutUs (): Promise<any>
  getFaqs (): Promise<any>
  getHowToOrder (): Promise<any>
  getWarranty(): Promise<any>
  getReview (): Promise<any>
}

class CMSProvider extends HttpRequest implements ICMSProvider {
  private urlPrefix: string = '/v1'

  public async getBanner (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/banners`)
    return response
  }

  public async getAboutUs (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/about-us`)
    return response
  }

  public async getFaqs (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/faqs`)
    return response
  }

  public async getHowToOrder (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/how-to-order`)
    return response
  }

  public async getWarranty (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/product-warranty`)
    return response
  }

  public async getReview (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/customer-review`)
    return response
  }
}

export default CMSProvider
