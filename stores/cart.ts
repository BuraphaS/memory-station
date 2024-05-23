import { defineStore } from 'pinia'
import type { IProductDetail, IProductInCart } from '~/models/Product.model'
import type { ICartStoreState } from '~/models/Store.model'

export const useCartStore = defineStore('cart', {
  state: (): ICartStoreState => ({
    cartItems: []
  }),
  actions: {
    addToCart (payload: IProductDetail): void {
      const index: number = this.cartItems.findIndex((item: IProductInCart): boolean => item.id === payload.id)
      if (index >= 0) {
        this.cartItems[index].amount++
        return
      }
      this.cartItems.push({
        ...payload,
        amount: 1
      })
    },
    removeFromCart (index: number): void {
      this.cartItems.splice(index, 1)
    },
    setProductAmount (index: number, movement: number = 1): void {
      this.cartItems[index].amount += movement
    }
  },
  getters: {
    cart: (state: ICartStoreState): IProductInCart[] => state.cartItems,
    itemInCart: (state: ICartStoreState): number => state.cartItems.length,
    totalItemInCart: (state: ICartStoreState): number => {
      const total: number = state.cartItems.reduce((sumAmount: number, product: IProductInCart): number => sumAmount + product.amount, 0)
      return total
    },
    isItemInCart: (state: ICartStoreState): ((id?: string) => boolean) => (id?: string): boolean => {
      const isFound = !!state.cartItems.find((item: IProductInCart): boolean => `${item.id}` === id)
      return isFound
    },
    productAmountById: (state: ICartStoreState): ((id?: string) => number) => (id?: string): number => {
      const index = state.cartItems.findIndex((item: IProductInCart): boolean => `${item.id}` === id)
      const amount = index >= 0 ? state.cartItems[index].amount : 0
      return amount
    }
  }
})
