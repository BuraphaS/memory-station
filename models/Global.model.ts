export interface IPagination {
  perPage: number
  page: number
  totalPage: number
  total: number
}
export interface IActionValue<T> {
  key: keyof T
  value?: any
  index?: number
}

export interface IAction<T> {
  actionName: string
  actionValue: T
}

export interface IMenu {
  title: string
  icon: string
  desc?: string
  path?: string
  name?: string
  action?: string
  children?: IMenu[]
}

export interface IAddress {
  address: string
  subDistrict: string
  district: string
  province: string
  postCode: string
}

export interface IDisplayTemplate<T> {
  title: string
  key: keyof T
}

export interface IGetStatus {
  color: string
  title: string
}

export interface IUpdate {
  updatedAt?: string | Date | null
  updatedBy?: string | null
}

export interface ICreate {
  createdAt?: string | Date | null
  createdBy?: string | null
}
