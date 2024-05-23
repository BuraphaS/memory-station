import { defineStore } from 'pinia'
import type { ITempUser, IUserStoreState } from '~/models/Store.model'
import type {
  ITokenData,
  IUserData,
  IUserDataFull,
  IUserDeliveryAddress,
  IUserDeliveryAddressFull,
  IUserRegisterData,
  ISocialRegister
}
  from '~/models/store/UserStore.model'
import { EUserSocial } from '~/models/store/UserStore.model'

export const useUserStore = defineStore('user', {
  state: (): IUserStoreState => ({
    login: false,
    token: {
      accessToken: '',
      expireIn: 0
    },
    user: {
      id: 0,
      customerNo: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      loginType: EUserSocial.NONE,
      isRegisted: false,
      phoneNumber: ''

    },
    deliveryAddress: {
      id: 0,
      customerNo: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      subDistrict: '',
      district: '',
      province: '',
      postCode: '',
      phoneNumber: ''
    },
    registerData: {
      phone: ''
    },
    // TODO : delete this vvv
    tempUser: {
      phone: '1234567890',
      social: 'google',
      password: '12345678'
    }
    // TODO : delete this ^^^
  }),
  persist: true,
  actions: {
    setIsLogin (payload: boolean = true): void {
      this.login = payload
    },
    setUser (payload: IUserData): void {
      this.user = {
        ...this.user,
        ...payload
      }
    },
    setToken (payload: ITokenData): void {
      this.token = {
        ...this.token,
        ...payload
      }
    },
    setDeliveryAddress (payload: IUserDeliveryAddress): void {
      this.deliveryAddress = {
        ...this.deliveryAddress,
        ...payload
      }
    },
    setRegisterData (payload: string): void {
      this.registerData.phone = payload
    },
    setUserAfterRegister (payload: ISocialRegister): void {
      this.user.firstName = payload?.firstName
      this.user.lastName = payload?.lastName
      this.user.isRegisted = true
    },
    clearAuth (): void {
      this.user = {
        customerNo: '',
        firstName: '',
        id: 0,
        isRegisted: false,
        lastName: '',
        loginType: EUserSocial.NONE,
        phoneNumber: '',
        email: ''
      }
      this.token = {
        accessToken: '',
        expireIn: 0
      }
      this.login = false
    }
  },
  getters: {
    isLogin: ({ login }: IUserStoreState): boolean => login,
    isSocialLogin: ({ user: { loginType } }: IUserStoreState): boolean => loginType !== EUserSocial.OTP,
    getFullName: (): ((prop: IUserData | IUserDeliveryAddress) => string) => (prop: IUserData | IUserDeliveryAddress): string => `
      ${prop.firstName} ${prop.lastName}`,
    getFullAddress: (): ((prop: IUserDeliveryAddress) => string) => (prop: IUserDeliveryAddress): string => `
      ${prop.address}
      ${prop.province}
      ${prop.subDistrict}
      ${prop.district}
      ${prop.postCode}`,
    getUser: ({ user }: IUserStoreState): IUserData => user,
    getFullUser (): IUserDataFull {
      return {
        ...this.user,
        fullName: this.getFullName(this.user)
      }
    },
    getDeliveryAddress: ({ deliveryAddress }: IUserStoreState): IUserDeliveryAddress => deliveryAddress,
    getFullDeliveryAddress (): IUserDeliveryAddressFull {
      return {
        ...this.deliveryAddress,
        fullName: this.getFullName(this.deliveryAddress),
        fullAddress: this.getFullAddress(this.deliveryAddress)
      }
    },
    getRegisterData: ({ registerData }: IUserStoreState): IUserRegisterData => registerData,

    // TODO : delete this vvv
    getTempUser: ({ tempUser }: IUserStoreState): ITempUser => tempUser,

    getLoginType ({ user }: IUserStoreState): string {
      return user.loginType
    },

    getAccessToken ({ token } : IUserStoreState): string {
      return token.accessToken
    },

    getTokenExpire ({ token } : IUserStoreState): number {
      return token.expireIn
    }
  }
})
