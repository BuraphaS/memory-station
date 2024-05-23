export enum EOrderStatus {
  TO_DELIVERY = 'toDelivery',
  TO_RECEIVE = 'toReceive',
  COMPLETE = 'complete',
  CANCEL = 'canel'
}

export interface IOrderProductOption {
  id: string
  name: string
  variant: string
}

export interface IOrderProduct {
  id: string
  images: string | string[]
  name: string
  amount: number
  price: number
  option1?: IOrderProductOption
  option2?: IOrderProductOption
  option3?: IOrderProductOption
}

export interface IOrderList {
  isShowAll: boolean
  orderId: string
  status: EOrderStatus
  products: IOrderProduct[]
}

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  WAITING_FOR_SHIPMENT = 'WAITING_FOR_SHIPMENT',
  PROCESS_OF_SHIPPING = 'PROCESS_OF_SHIPPING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
}

interface Attribute {
  name: string;
  value: string
}

interface Product {
  productId: number;
  productNo: string;
  name: string;
  attribute: Attribute[];
  serialNumber: string;
  price: string;
  qty: number;
  images: string[];
}

export interface IOrder {
  id: number;
  status: string;
  shippingAddress: ShippingAddress;
  ref: string;
  products: Product[];
  promotionCode: string;
  shippingCost: number;
  shippingDate: string;
  paymentDate: string;
  paymentMethod: string ;
  discount: number;
  totalPrice: number;
  orderStatus: OrderStatusEnum;
  orderNo: string;
}
