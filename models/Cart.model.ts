import type { IUserDeliveryAddress } from './store/UserStore.model'

export interface ICartDeliveryAddressForm extends IUserDeliveryAddress {
  email: string
  isSameAddress: boolean
  deliveryMethod: string
}
