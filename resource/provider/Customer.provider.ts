import type { IChangePassword, IOtpRegister, ISocialRegister, IUpdateAccount } from '~/models/request/CustomerReq.model'
import HttpRequest from '../HttpRequest'

export interface ICustomerProvider {
  getBrands(payload: any): Promise<any>
  getCategories(payload: any): Promise<any>
  checkCustomer(phoneNumber: string) : Promise<any>
  socialRegister(payload: ISocialRegister): Promise<any>
  otpRegister(payload: IOtpRegister): Promise<any>
  getMyAccount(): Promise<any>
  updateMyAccount(payload: IUpdateAccount): Promise<any>
  changePassword(payload: IChangePassword): Promise<any>
}

class CustomerProvider extends HttpRequest implements ICustomerProvider {
  private urlPrefix: string = '/v1/customers'
  // TODO : Change end point    ^^^^^^^^^^^^^

  public async getBrands (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/brand-attributes`)
    return response
  }

  public async getCategories (): Promise<any> {
    const response: any = await this.get(`${this.urlPrefix}/category-attributes`)
    return response
  }

  public async checkCustomer (phoneNumber: string): Promise<any> {
    const response : any = await this.post(`${this.urlPrefix}/phone/`, {
      phoneNumber
    })
    return response
  }

  public async socialRegister (payload: ISocialRegister): Promise<any> {
    this.setUserAuthHeader()
    const response : any = await this.post(`${this.urlPrefix}/social/register`, {
      firstName: payload?.firstName,
      lastName: payload?.lastName
    })
    return response
  }

  public async otpRegister (payload: IOtpRegister): Promise<any> {
    this.setUserAuthHeader()
    const response : any = await this.post(`${this.urlPrefix}/otp/register`, {
      firstName: payload?.firstName,
      lastName: payload?.lastName,
      password: payload?.password
    })
    return response
  }

  public async getMyAccount (): Promise<any> {
    this.setUserAuthHeader()
    const response : any = await this.get(`${this.urlPrefix}/me`)
    return response
  }

  public async updateMyAccount (payload: IUpdateAccount): Promise<any> {
    this.setUserAuthHeader()
    const response : any = await this.put(`${this.urlPrefix}/me`, payload)
    return response
  }

  public async changePassword (payload: IChangePassword): Promise<any> {
    this.setUserAuthHeader()
    const response : any = await this.post(`${this.urlPrefix}/password`, payload)
    return response
  }
}

export default CustomerProvider
