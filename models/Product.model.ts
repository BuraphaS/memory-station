import type { IGetProductResponseData } from './response/ProductRes.model'

export interface IProductSku<T> {
  name: string
  value: T
}

export interface IProductList extends IGetProductResponseData {}
export interface IProductDetail extends IGetProductResponseData {}

export interface IImageItem {
  name: string
  img: string
}

export interface IProductInCart extends IProductDetail {
  amount: number
}
