import { defineStore } from 'pinia'
import type { IAlertStoreState } from '~/models/Store.model'
import { EAlertType, type IAlert } from '~/models/store/AlertStore.model'

export const useAlertStore = defineStore('alert', {
  state: (): IAlertStoreState => ({
    alert: {
      isActive: false,
      type: EAlertType.NONE,
      title: 'Alert title',
      desc: 'Alert desc',
      timeout: 0
    },
    timer: null,
    closeTimer: null
  }),
  actions: {
    setAlert (payload?: IAlert): void {
      clearTimeout(this.timer)
      clearTimeout(this.closeTimer)
      this.alert = {
        ...this.alert,
        isActive: true,
        type: EAlertType.NONE,
        title: 'Alert title',
        desc: 'Alert desc',
        timeout: 5000,
        ...payload
      }
      this.setCloseAlert()
    },
    setCloseAlert (timeout: number = 5000): void {
      const time = timeout
      if (this.alert.isActive) {
        this.timer = setTimeout((): void => {
          this.alert.isActive = false
        }, time)

        this.closeTimer = setTimeout((): void => {
          this.alert = {
            isActive: false,
            type: EAlertType.NONE,
            title: 'Alert title',
            desc: 'Alert desc',
            timeout: 0
          }
        }, time + 1000)
      }
    }
  },
  getters: {
    isAlert: ({ alert }: IAlertStoreState): boolean | undefined => alert.isActive,
    getAlert: ({ alert }: IAlertStoreState): IAlert => alert
  }
})
