import { defineStore } from 'pinia'
import type { IAboutUsData, IFaqs } from '~/models/About.model'
import type { IAboutStoreState } from '~/models/Store.model'

export const useAboutStore = defineStore('about', {
  state: (): IAboutStoreState => ({
    menu: [
      {
        title: 'เกี่ยวกับเรา',
        icon: '/svg/about-icon-1.svg',
        desc: 'Pariatur fugiat velit ipsum culpa officia aliquip.',
        key: 'about-us'
      },
      {
        title: 'วิธีการสั่งซื้อ',
        icon: '/svg/about-icon-2.svg',
        desc: 'Pariatur fugiat velit ipsum culpa officia aliquip.',
        key: 'how-to-order'
      },
      {
        title: 'คำถามที่พบบ่อย',
        icon: '/svg/about-icon-3.svg',
        desc: 'Pariatur fugiat velit ipsum culpa officia aliquip.',
        key: 'faqs'
      },
      {
        title: 'นโยบายความเป็นส่วนตัว',
        icon: '/svg/about-icon-4.svg',
        desc: 'Pariatur fugiat velit ipsum culpa officia aliquip.',
        key: 'privacy-policy'
      },
      {
        title: 'นโยบายคุกกี้',
        icon: '/svg/about-icon-5.svg',
        desc: 'Pariatur fugiat velit ipsum culpa officia aliquip.',
        key: 'cookie-policy'
      },
      {
        title: 'การรับประกันสินค้า',
        icon: '/svg/about-icon-6.svg',
        desc: 'Pariatur fugiat velit ipsum culpa officia aliquip.',
        key: 'warranty'
      }
    ],
    faqs: [
      {
        title: 'ทำไมต้องซื้อสินค้า IT มือสองกับเรา?',
        desc: 'Veniam fugiat do Lorem magna qui in ea cupidatat fugiat cupidatat non.'
      },
      {
        title: 'ขั้นตอนการสั่งซื้อสินค้า',
        desc: 'Est laborum mollit qui ea eu anim id consequat cillum aliqua magna.'
      },
      {
        title: 'ขนส่งสินค้าด้วยวิธีการใด?',
        desc: 'Duis incididunt fugiat dolore incididunt consectetur et consequat et qui ni si minim culpa. Duis incididunt fugiat dolore incididunt consectetur et consequat et qui nisi minim culpa.Duis incididunt fugiat dolore incididunt consectetur et consequat et qui nisi minim culpa.Duis incididunt fugiat dolore incididunt consectetur et consequat et qui nisi minim culpa.'
      }
    ]
  }),
  actions: {},
  getters: {
    getMenu: ({ menu }: IAboutStoreState): IAboutUsData[] => menu,
    getMenuAppBar: ({ menu }: IAboutStoreState): IAboutUsData[] => [menu[4], menu[3]],
    getFaqs: ({ faqs }: IAboutStoreState): IFaqs[] => faqs
  }
})
