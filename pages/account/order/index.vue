<template>
  <section
    id="account-order-page"
    class="flex flex-col w-full gap-4">
    <OrderFilterTabs
      :menus="menus"
      @on-change-tab="onChangeTab"
    />
    <section v-if="!pending">
      <template v-if="orders?.length">
        <OrderCard
          v-for="(data, index) in orders"
          :key="`order-${index+1}`"
          :data="data"
          @show-more="showMore($event)" />
      </template>
      <section
        v-else
        class="flex flex-col items-center justify-center w-full h-full gap-2 text-gray">
        <img
          src="/svg/account-icon-cart.svg"
          alt="account cart icon">
        ยังไม่มีคำสั่งซื้อ
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { OrderStatusEnum } from '~/models/Order.model'
import type { IGetMyOrderRequest } from '~/models/request/OrderReq.model'
// import type { IOrder } from '~/models/Order.model'
import OrderProvider from '~/resource/provider/Order.provider'

const OrderService = new OrderProvider()
const router = useRouter()

definePageMeta({
  layout: 'account-layout',
  title: 'รายการคำสั่งซื้อ',
  icon: '/svg/account-icon-order.svg'
})

const menus: Ref<any[]> = ref([
  {
    title: 'คำสั่งซื้อทั้งหมด',
    value: ''
  },
  {
    title: 'ที่ต้องจัดส่ง',
    value: OrderStatusEnum.WAITING_FOR_SHIPMENT
  },
  {
    title: 'ที่ต้องได้รับ',
    value: OrderStatusEnum.PROCESS_OF_SHIPPING
  },
  {
    title: 'คำสั่งซื้อที่สำเร็จ',
    value: OrderStatusEnum.COMPLETED
  },
  {
    title: 'คำสั่งซื้อถูกยกเลิก',
    value: OrderStatusEnum.CANCELLED
  }
])
const orders: Ref<any> = ref([])
const pending: Ref<boolean> = ref(true)
const filter: Ref<{ page: number, limit: number, orderStatus?: OrderStatusEnum }> = ref({
  page: 1,
  limit: 10
})

function showMore (index: number): void {
  router.push(`/account/order/${index}`)
}

async function getMyOrder (): Promise<void> {
  try {
    pending.value = true
    let query: IGetMyOrderRequest = {
      page: 1,
      limit: 10
    }
    if (filter.value.orderStatus) {
      query = {
        ...query,
        orderStatus: filter.value.orderStatus
      }
    }
    const data = await OrderService.getMyOrder(query)
    orders.value = data.data
  } catch (error) {

  } finally {
    pending.value = false
  }
}

function onChangeTab (tab: OrderStatusEnum): void {
  filter.value.orderStatus = tab || ''
  getMyOrder()
}

onMounted((): void => {
  getMyOrder()
})
</script>

<style lang="scss" scoped>
</style>
