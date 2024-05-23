import type { IAuthOtpLogin, IAuthPasswordLogin } from '~/models/request/AuthReq.model'
import HttpRequest from '../HttpRequest'

export interface IAuthProvider {
  loginWithOtp(payload: IAuthOtpLogin): Promise<any>
  loginWithPassword(payload: IAuthPasswordLogin): Promise<any>
}

class AuthProvider extends HttpRequest implements IAuthProvider {
  private urlPrefix: string = '/v1/auth'

  public async loginWithOtp (payload: IAuthOtpLogin): Promise<any> {
    const response: any = await this.post(`${this.urlPrefix}/otp`, payload)
    return response
  }

  public async loginWithPassword (payload: IAuthPasswordLogin): Promise<any> {
    const response: any = await this.post(`${this.urlPrefix}/password`, payload)
    return response
  }
}

export default AuthProvider
