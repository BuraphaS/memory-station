import type { ICreate, IUpdate } from '../Global.model'
import type { IPaginationResponse, ISuccessResponse } from './Response.model'

export interface ISettingAttribute {
  id: string | number
  name: string
}

export interface ISkuAttribute {
  name: string
  value: string
}

export interface ISkuAttributeMany {
  name: string
  value: string[]
}

export interface ISkuProduct {
  [k: string]: string | boolean | File | number | null | undefined | ISkuAttribute[]
  isSell: boolean
  image: string | File | null
  description: string
  discount: number
  price: number
  attribute: ISkuAttribute[]
}

export interface IGetProductResponseData extends IUpdate, ICreate {
  brand: ISettingAttribute
  category: ISettingAttribute
  description: string
  discount: number
  images: string[]
  isSell: boolean
  isSku: boolean
  model: string
  name: string
  price: number
  productNo: string
  sku: ISkuAttributeMany[]
  skuProducts: ISkuProduct[]
  status: string
  subCategory: string
  tags: ISettingAttribute[]
  id: number
}

export interface IGetProductResponse extends IPaginationResponse<IGetProductResponseData[]> {}
export interface IGetProductDetailResponse extends ISuccessResponse<IGetProductResponseData> {}
