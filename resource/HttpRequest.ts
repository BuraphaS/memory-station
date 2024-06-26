import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { getUserAuthToken } from '@/utils/Authentication'
import { onRequest, onRequestError, onResponse, onResponseError } from './Interceptors'

interface IHttpRequest {
  get(endPoint: string, data: object, config: object): Promise<any>
  download(endPoint: string, data: object): Promise<any>
  post(endPoint: string, data: object, config: object): Promise<any>
  put(endPoint: string, data: object, config: object): Promise<any>
  patch(endPoint: string, data: object, config: object): Promise<any>
  delete(endPoint: string, params?: object, data?: object): Promise<any>
}

interface ISetHeader {
  key: string
  value: any
}

class HttpRequest implements IHttpRequest {
  public axiosInstance: AxiosInstance

  private url: string

  constructor (url?: string) {
    if (url) {
      this.url = url
    } else {
      this.url = import.meta.env.VITE_ENV_BASE_API?.toString() || 'http://localhost:3001'
    }
    this.axiosInstance = axios.create({
      baseURL: this.url,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.axiosInstance.interceptors.request.use((config: any): any => onRequest(config), onRequestError)

    this.axiosInstance.interceptors.response.use(onResponse, onResponseError)
  }

  public setHeader (data: ISetHeader): void {
    if (data.key && data.value) {
      this.axiosInstance.defaults.headers.common[data.key] = data.value
    }
  }

  public setUserAuthHeader (): void {
    const authHeader: ISetHeader | null = getUserAuthToken()
    if (authHeader) {
      this.setHeader(authHeader)
    }
  }

  // public setMerchantAuthHeader (): void {
  //   const authHeader: ISetHeader | null = getMerchantAuthToken()
  //   if (authHeader) {
  //     this.setHeader(authHeader)
  //   }
  // }

  public get (endPoint: string, data?: object, config?: object): Promise<any> {
    return this.axiosInstance.get(endPoint, { params: data, ...config })
  }

  public download (endPoint: string, data?: object): Promise<any> {
    return this.axiosInstance.get(endPoint, {
      params: data,
      responseType: 'blob'
    })
  }

  public post (endPoint: string, data: object, config?: object): Promise<any> {
    return this.axiosInstance.post(endPoint, data, config)
  }

  public put (endPoint: string, data: object, config?: object): Promise<any> {
    return this.axiosInstance.put(endPoint, data, config)
  }

  public patch (endPoint: string, data: object, config?: object): Promise<any> {
    return this.axiosInstance.patch(endPoint, data, config)
  }

  public delete (endPoint: string, params?: object, data?: object): Promise<any> {
    return this.axiosInstance.delete(endPoint, { params, data })
  }
}

export default HttpRequest
