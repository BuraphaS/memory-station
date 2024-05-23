<template>
  <section
    class="flex flex-col w-full gap-4 p-4 duration-200 bg-white border border-border rounded-xl hover:border-secondary">
    <div class="grid items-center grid-cols-12 gap-x-4 gap-y-1">
      <span class="col-span-6 text-base font-medium lg:col-span-3">
        เลขที่คำสั่งซื้อ:
      </span>
      <span class="col-span-6 text-sm font-light lg:col-span-3 text-end lg:text-start">
        {{ props?.data?.orderNo }}
      </span>
      <div class="flex items-center justify-between col-span-12 gap-4 text-xs lg:justify-end lg:col-span-6 whitespace-nowrap text-gray">
        สินค้าทั้งหมด {{ data?.products?.length }} รายการ
        <div
          v-if="data?.orderStatus !== OrderStatusEnum.PENDING"
          :style="`
            background-color: ${getStatus(data?.orderStatus)?.color}1A;
            color: ${getStatus(data?.orderStatus)?.color}
            `"
          class="px-3 py-1 text-xs rounded-md whitespace-nowrap w-fit">
          {{ getStatus(data?.orderStatus)?.title }}
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <div
        class="grid grid-cols-12 gap-4 py-4 border-b border-border">
        <img
          :src="data?.products[0]?.images[0] || '/jpg/product-example-1.jpg'"
          alt="product-image"
          class="object-cover w-full col-span-3 rounded-md aspect-square">
        <div class="flex flex-col w-full col-span-9 gap-1">
          <div class="flex items-center justify-between gap-4 mb-4 text-sm font-light">
            <span>{{ data?.products[0]?.name }}</span>
            <span>x{{ data?.products[0]?.qty }}</span>
          </div>
          <div
            v-for="(attribute, attributeIndex) in data?.products[0]?.attribute"
            :key="attributeIndex"
            class="grid w-full grid-cols-2 text-sm font-light duration-200 lg:w-1/2 hover:bg-info">
            <span>{{ attribute?.name }}</span>
            <span>{{ attribute?.value }}</span>
          </div>
        </div>
      </div>
      <button
        v-if="data?.products?.length > 1"
        class="w-full p-2 text-sm duration-200 border-b border-border hover:bg-info hover:border-primary"
        @click="showMore(data?.id)">
        ดูสินค้าทั้งหมดในคำสั่งซื้อ
      </button>
    </div>

    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center justify-start w-2/3 gap-1 lg:justify-center">
        <span class="text-sm font-light">รวมการสั่งซื้อ:</span>
        <span class="text-lg font-medium duration-200 text-primary hover:text-secondary">
          ฿ {{ numberFormat(data?.totalPrice) }}
        </span>
      </div>
      <NuxtLink
        :to="`/account/order/${data?.id}`"
        class="flex items-center gap-1 text-sm font-light text-black duration-200 w-fit hover:text-primary">
        <img
          src="/svg/icon-magnify.svg"
          alt="icon magnify"
          class="duration-200 text-inherit">
        ดูรายละเอียด
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IGetStatus } from '~/models/Global.model'
import type { IOrder } from '~/models/Order.model'
import { OrderStatusEnum } from '~/models/Order.model'
import { numberFormat } from '~/utils/Filter'

interface IProps {
  data: IOrder
}

const emits = defineEmits([
  'showMore'
])
const props = defineProps<IProps>()

function getStatus (status: OrderStatusEnum): IGetStatus {
  switch (status) {
    case OrderStatusEnum.WAITING_FOR_SHIPMENT:
      return {
        color: '#F2994A',
        title: 'รอจัดส่ง'
      }
    case OrderStatusEnum.PROCESS_OF_SHIPPING:
      return {
        color: '#00C3F4',
        title: 'อยู่ระหว่างการจัดส่ง'
      }
    case OrderStatusEnum.COMPLETED:
      return {
        color: '#27AE60',
        title: 'จัดส่งสำเร็จ'
      }
    case OrderStatusEnum.CANCELLED:
      return {
        color: '#E30000',
        title: 'คำสั่งซื้อถูกยกเลิก'
      }
    default:
      return {
        color: '#E30000',
        title: 'error'
      }
  }
}
function showMore (orderId: number): void {
  emits('showMore', orderId)
}
</script>

<style scoped>
</style>
