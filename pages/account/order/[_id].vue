<template>
  <section
    v-if="!pending"
    id="account-order-details-page"
    class="flex flex-col w-full gap-4">
    <div class="flex flex-col gap-4 p-4 bg-white border border-border rounded-xl">
      <section
        id="order-timestamp"
        class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4 py-2 border-b border-border">
          <span>
            หมายเลขคำสั่งซื้อ
          </span>
          <span>
            {{ orderData?.orderNo }}
          </span>
        </div>
        <div
          class="flex items-center justify-between gap-2 text-sm font-light text-gray">
          <span class="text-inherit">
            เวลาสั่งซื้อ
          </span>
          <span class="text-inherit">
            {{ dayjs(orderData?.createdAt).format('DD/MM/BBBB hh:mm') }}
          </span>
        </div>
        <div
          v-if="(orderData?.orderStatus !== OrderStatusEnum.PENDING && orderData?.paymentDate)"
          class="flex items-center justify-between gap-2 text-sm font-light text-gray">
          <span class="text-inherit">
            เวลาชำระเงิน
          </span>
          <span class="text-inherit">
            {{ dayjs(orderData?.paymentDate).format('DD/MM/BBBB hh:mm') }}
          </span>
        </div>
        <div
          v-if="(orderData?.orderStatus !== OrderStatusEnum.PENDING && orderData?.shippingDate)"
          class="flex items-center justify-between gap-2 text-sm font-light text-gray">
          <span class="text-inherit">
            เวลาส่งสินค้า
          </span>
          <span class="text-inherit">
            {{ dayjs(orderData?.shippingDate).format('DD/MM/BBBB hh:mm') }}
          </span>
        </div>
      </section>
      <section
        v-if="(orderData?.orderStatus !== OrderStatusEnum.PENDING && orderData.paymentMethod)"
        id="purchase-method"
        class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4 py-2 border-b border-border">
          ช่องทางการชำระเงิน
        </div>
        <span class="text-sm font-light text-gray">
          {{ orderData?.paymentMethod }}
        </span>
      </section>
    </div>
    <div v-if="(orderData?.orderStatus !== OrderStatusEnum.PENDING && orderData?.orderStatus !== OrderStatusEnum.CANCELLED)" class="flex flex-col gap-4 p-4 bg-white border border-border rounded-xl">
      <section
        id="shipping-status"
        class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4 py-2 border-b border-border">
          สถานะการจัดส่ง
        </div>
        <span class="text-sm font-light text-gray">
          Standard Delivery - ส่งธรรมดาในประเทศ
        </span>
        <div class="flex items-center gap-4 text-black">
          {{ orderData?.ref }}
          <button class="p-1 duration-200 text-secondary hover:text-primary">
            คัดลอก
          </button>
        </div>
      </section>
    </div>
    <div class="flex flex-col gap-4 p-4 bg-white border border-border rounded-xl">
      <section
        id="purchase-method"
        class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4 py-2 border-b border-border">
          ที่อยู่การจัดส่ง
        </div>
        <div class="flex flex-col gap-2 text-sm font-light text-gray">
          <span>{{ orderData?.shippingAddress?.firstName }} {{ orderData?.shippingAddress?.lastName }}</span>
          <span>{{ phoneFormat(orderData?.shippingAddress?.phoneNumber, false) }}</span>
          <span>{{ getFullAddress(orderData?.shippingAddress) }}</span>
          <span>{{ orderData?.shippingAddress?.address }}</span>
        </div>
      </section>
    </div>
    <section
      id="order-products"
      class="flex flex-col gap-4 p-4 bg-white border border-border rounded-xl">
      <div class="flex items-center justify-between gap-4 py-2 border-b border-border">
        สินค้า
      </div>
      <div
        v-for="(product, productIndex) in orderData.products"
        :key="`order-${orderData.orderId}-product-${productIndex}`"
        class="grid grid-cols-12 gap-4 py-4 border-b border-border">
        <img
          :src="Array.isArray(product.images)
            ? product?.images[0] || '/jpg/product-example-1.jpg'
            : product?.images || '/jpg/product-example-1.jpg'"
          :alt="`product-image-${orderData.orderId}-${productIndex}`"
          class="object-cover w-full col-span-2 rounded-md aspect-square">
        <div class="flex flex-col w-full col-span-10 gap-1">
          <div class="flex items-start justify-between w-full gap-4 mb-4 text-md">
            <span class="w-2/3 text-inherit">{{ product?.name }}</span>
            <span class="flex items-center text-inherit w-fit">
              ฿ {{ numberFormat(product?.price || 0) }}
            </span>
          </div>
          <div class="grid w-full grid-cols-2 text-xs font-light lg:w-1/2 gap-x-4 gap-y-1">
            <span>เลขที่อ้างอิง:</span> <span>{{ product?.refCode }}</span>
            <span>รหัสสินค้า:</span> <span>{{ product?.id }}</span>
            <template
              v-for="(attribute, attributeIndex) in product.attribute"
              :key="attributeIndex">
              <span>{{ attribute.name }}</span>
              <span>{{ attribute.value }}</span>
            </template>
          </div>
        </div>
      </div>
      <div class="grid items-end justify-between grid-cols-2 gap-2 ml-auto text-sm font-light text-black w-fit">
        <template
          v-for="({title, key}, index) in summaryTemplate"
          :key="index">
          <span
            :class="{
              'font-medium': index === summaryTemplate.length- 1
            }"
            class="text-inherit">
            {{ title }}
          </span>
          <span
            :class="{
              'font-medium': index === summaryTemplate.length- 1
            }"
            class="text-inherit">
            ฿ {{ numberFormat(key === 'priceBeforeShipping' ? (orderData['totalPrice'] - orderData['shippingCost']) || 0 : orderData[key] || 0) }}
          </span>
        </template>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { numberFormat, phoneFormat } from '~/utils/Filter'
import type { IDisplayTemplate } from '~/models/Global.model'
import OrderProvider from '~/resource/provider/Order.provider'
import { OrderStatusEnum } from '~/models/Order.model'

const OrderService = new OrderProvider()

const route = useRoute()

definePageMeta({
  layout: 'account-layout',
  title: 'รายละเอียดคำสั่งซื้อ',
  icon: '/svg/account-icon-order-history.svg',
  backName: 'account-order',
  backText: 'กลับไปที่รายการคำสั่งซื้อ'
})

const orderData: Ref<any> = ref({
  orderId: 'EP-1383874631',
  orderedAt: '07/02/66 12:30',
  purchasedAt: '07/02/66 12:40',
  deliveryAt: '12/02/66  14:31',
  paymentMethod: 'บัตรเครดิต/เดบิต',
  shippingMethod: 'Standard Delivery - ส่งธรรมดาในประเทศ',
  shippingCode: 'SHP3463678769',
  deliveryAddress: {
    firstName: 'สุนิสา',
    lastName: 'มากทรัพย์',
    phone: '081-111-0119',
    address: '1 ถนนพญาไท ซอย 5',
    subDistrict: 'แขวงพญาไท',
    district: 'เขตพญาไท',
    province: 'กรุงเทพมหานคร',
    postCode: '21067'
  },
  totalPrice: 35990,
  deliveryFee: 50,
  netPrice: 72030,
  products: [
    {
      id: 'PD-0000001',
      refCode: 'EP-1383874631',
      images: [
        '/jpg/product-example-1.jpg'
      ],
      name: 'iPhone 14 Pro Max สี Gold 512 GB สภาพ 90% อุปกรณ์ครบ',
      amount: 1,
      price: 36040,
      option1: {
        id: 'OP-0001',
        name: 'สี',
        variant: 'Gold'
      },
      option2: {
        id: 'OP-0002',
        name: 'ความจุ',
        variant: '512 GB'
      },
      option3: {
        id: 'OP-0003',
        name: 'สภาพสินค้า',
        variant: '90%'
      }
    },
    {
      id: 'PD-0000002',
      refCode: 'EP-1383874631',
      images: [
        '/jpg/product-example-1.jpg'
      ],
      name: 'iPhone 14 Pro Max สี Gold 512 GB สภาพ 90% อุปกรณ์ครบ',
      amount: 1,
      price: 36040,
      option1: {
        id: 'OP-0001',
        name: 'สี',
        variant: 'Gold'
      },
      option2: {
        id: 'OP-0002',
        name: 'ความจุ',
        variant: '512 GB'
      },
      option3: {
        id: 'OP-0003',
        name: 'สภาพสินค้า',
        variant: '90%'
      }
    }
  ]
})
const summaryTemplate: Ref<IDisplayTemplate<any>[]> = ref([
  {
    title: 'ยอดรวม:',
    key: 'priceBeforeShipping'
  },
  {
    title: 'ค่าจัดส่ง:',
    key: 'shippingCost'
  },
  {
    title: 'ยอดรวมสุทธิ:',
    key: 'totalPrice'
  }
])
const pending: Ref<boolean> = ref(true)

// function getFullName (data: any): string {
//   return `${data.firstName} ${data.lastName}`
// }

function getFullAddress (data: any): string {
  return `
    ${data.address}
    ${data.province}
    ${data.subDistrict}
    ${data.district}
    ${data.postCode}`
}

async function getMyOrderById (id: string): Promise<void> {
  try {
    pending.value = true
    const { data } = await OrderService.getMyOrderById(id)
    orderData.value = data
  } catch (error) {

  } finally {
    pending.value = false
  }
}

onMounted((): void => {
  getMyOrderById(route.params._id as string)
})
</script>

<style lang="scss" scoped>
</style>
