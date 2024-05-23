import type { IAddress } from '../Global.model'

export enum EUserSocial {
  NONE = '',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  OTP = 'otp'
}

interface IUserBase {
  id: number
  customerNo: string
  firstName: string
  lastName: string
  phone?: string
  phoneNumber: string
}

export interface IUserData extends IUserBase {
  email: string
  loginType: EUserSocial
  isRegisted: boolean
}
export interface IUserDataFull extends IUserData {
  fullName: string
}

export interface IUserDeliveryAddress extends IUserBase, IAddress {}
export interface IUserDeliveryAddressFull extends IUserDeliveryAddress {
  fullName: string
  fullAddress: string
}

export interface IUserRegisterData {
  phone: string
}

export interface ITokenData {
  accessToken: string
  expireIn: number
}

interface IRegisterBase {
  firstName: string;
  lastName: string;
}

export interface ISocialRegister extends IRegisterBase {

}
