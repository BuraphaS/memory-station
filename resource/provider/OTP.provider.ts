import type { IOTPRequest } from '~/models/request/OTPReq.model'
import HttpRequest from '../HttpRequest'

export interface IAuthProvider {
  requestOTP(payload: IOTPRequest): Promise<any>
}

class OTPProvider extends HttpRequest implements IAuthProvider {
  private urlPrefix: string = '/v1/otp'

  public async requestOTP (payload: IOTPRequest): Promise<any> {
    const response: any = await this.post(`${this.urlPrefix}/request`, payload)
    return response
  }
}

export default OTPProvider
