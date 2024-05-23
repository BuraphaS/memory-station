<template>
  <section
    id="product-detail-info"
    class="flex flex-col w-full gap-6">
    <span class="text-2xl font-medium">
      {{ props.data?.name }}
    </span>
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(tag, index) in props.data?.tags"
        :key="index"
        class="relative px-4 py-1.5 overflow-hidden rounded-full group">
        <div class="absolute top-0 bottom-0 left-0 right-0 duration-200 bg-secondary opacity-10 group-hover:opacity-25" />
        <span class="z-10 text-sm text-primary">
          {{ tag?.name || '-' }}
        </span>
      </div>
    </div>
    <span class="text-2xl font-semibold text-primary">
      {{ filters.numberFormatBaht(data?.price || 0) }}
    </span>
    <div
      v-if="props.data?.sku.length"
      class="flex flex-col w-full gap-2">
      <button
        v-for="(sku, index) in props.select?.sku"
        :key="sku?.value"
        :disabled="props.data?.sku[index]?.value?.length <= 1"
        :class="{
          'rounded-xl': activeSkuIndex !== index,
          'rounded-t-xl': activeSkuIndex === index
        }"
        class="relative flex items-center justify-between gap-4 p-4 duration-200 border border-border hover:border-secondary group"
        @click="openSkuOption(index)">
        <div class="flex flex-col items-start gap-1">
          <span class="text-sm font-light text-black duration-100 delay-100 group-hover:text-primary">
            {{ sku?.name }}
          </span>
          <span>{{ sku?.value }}</span>
        </div>
        <div
          v-if="props.data?.sku[index]?.value?.length > 1"
          :class="{
            'rotate-180': activeSkuIndex === index
          }"
          class="text-2xl text-black duration-200 mdi mdi-chevron-down group-hover:text-secondary" />
        <div
          :class="{
            'h-0 opacity-0': activeSkuIndex !== index,
            'max-h-40 opacity-100': activeSkuIndex === index
          }"
          class="absolute left-0 right-0 z-30 flex flex-col overflow-scroll duration-200 bg-white border top-full border-border rounded-b-xl hover:border-secondary group-hover:border-secondary">
          <button
            v-for="(item, subIndex) in props.data?.sku[index].value"
            :key="subIndex"
            class="px-4 py-4 border-b md:py-2 border-border hover:bg-border"
            @click.stop="selectSku(item, index)">
            {{ item }}
          </button>
        </div>
      </button>
    </div>
    <div class="fixed bottom-0 left-0 right-0 z-10 grid grid-cols-2 px-2 py-4 bg-white border-t md:relative gap-y-2 gap-x-2 md:gap-x-4 md:p-0 md:bg-transparent border-border md:border-transparent">
      <button
        class="flex items-center justify-center gap-2 px-6 py-4 text-sm text-black duration-200 bg-white border border-black rounded-xl group hover:border-primary disabled:text-gray hover:text-primary disabled:hover:border-gray"
        @click="onAction('addToCart')">
        <div class="duration-200 text-inherit mdi mdi-cart" />
        <span class="duration-200 text-inherit whitespace-nowrap">
          {{ cartStore.isItemInCart(select?.id)
            ? `สินค้าอยู่ในตะกร้า (${cartStore.productAmountById(select?.id)})`
            : 'หยิบใส่ตะกร้า' }}
        </span>
      </button>
      <button
        :disabled="cartStore.isItemInCart(`${data?.id}`)"
        class="flex items-center justify-center gap-2 px-6 py-4 text-sm text-white duration-200 bg-black rounded-xl hover:bg-primary disabled:bg-border disabled:text-gray"
        @click="onAction('processOrder')">
        ซื้อสินค้า
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IActionValue } from '~/models/Global.model'
import type { IProductDetail } from '~/models/Product.model'
import filters from '~/utils/Filter'

interface IProps {
  data: IProductDetail | null
  select: any
}

const emit = defineEmits([
  'onAction'
])
const props = defineProps<IProps>()
const cartStore = useCartStore()

const activeSkuIndex: Ref<number> = ref(-1)

function onAction (actionName: string, actionValue?: IActionValue<any>): void {
  emit('onAction', { actionName, actionValue })
}

function openSkuOption (index: number): void {
  if (activeSkuIndex.value === index) {
    activeSkuIndex.value = -1
    return
  }
  activeSkuIndex.value = index
}

function selectSku (value: string, index: number): void {
  onAction('onSelectSku', {
    key: 'sku',
    value,
    index
  })
}
</script>

<style scoped>
</style>
