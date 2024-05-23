import type { IAboutUsData, IFaqs } from './About.model'
import type { IProductInCart } from './Product.model'
import type { IAlert } from './store/AlertStore.model'
import type { IUserData, IUserDeliveryAddress, IUserRegisterData, ITokenData } from './store/UserStore.model'

export interface IAlertStoreState {
  alert: IAlert
  timer: any
  closeTimer: any
}

export interface IAboutStoreState {
  menu: IAboutUsData[]
  faqs: IFaqs[]
}

export interface ICartStoreState {
  cartItems: IProductInCart[]
}

// TODO : delete this vvv
export interface ITempUser {
  phone: string
  social: string
  password: string
}

export interface IUserStoreState {
  login: boolean
  user: IUserData
  token: ITokenData
  deliveryAddress: IUserDeliveryAddress
  registerData: IUserRegisterData
  // TODO : delete this vvv
  tempUser: ITempUser
  // TODO : delete this ^^^
}
