<template>
  <div class="flex flex-col w-full gap-4">
    <div class="flex items-center gap-2">
      <InputCheckBox
        :value="!!selected.length"
        :icon="selected.length && selected.length < itemInCart ? 'mdi-minus' : 'mdi-check'"
        @click="onSelectAll()" />
      <span class="text-sm">
        เลือกทั้งหมด
      </span>
    </div>
    <template v-if="cart.length">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="flex flex-col items-start justify-between gap-4 p-4 border rounded-lg lg:flex-row lg:items-center border-border h-fit">
        <InputCheckBox
          :value="isSelected(index)"
          @click="onSelectItem(index)" />
        <img
          :src="Array.isArray(item?.images) ? item?.images[0] : item?.images"
          :alt="`product-cart-image-${index + 1}`"
          class="object-cover object-center mb-auto rounded h-2/5 aspect-square">
        <div class="flex flex-col justify-between w-full gap-4 mb-auto">
          <div class="flex flex-col items-start justify-between gap-2 lg:items-center lg:flex-row">
            <span class="w-full text-base lg:w-3/5">
              {{ item?.name }}
            </span>
            <span class="text-sm font-medium text-primary">
              {{ filters.numberFormatBaht(item?.price || 0) }}
            </span>
            <button
              class="flex items-center justify-center w-8 h-8 text-black duration-200 bg-transparent rounded-full hover:bg-info hover:text-error active:scale-90 hover:scale-105"
              @click="removeFromCart(index)">
              <div class="text-2xl duration-200 mdi mdi-delete-outline text-inherit" />
            </button>
          </div>
          <div class="grid w-full grid-cols-2 text-xs font-light lg:w-1/2 gap-x-4 gap-y-1">
            <!-- <span>เลขที่อ้างอิง:</span> <span>{{ item?.refCode }}</span> -->
            <span>รหัสสินค้า:</span> <span>{{ item?.id }}</span>
            <template
              v-for="({name, value}, skuIndex) in item?.sku || []"
              :key="`${index}-${skuIndex}`">
              <span>{{ name }}</span> <span>{{ value }}</span>
            </template>
          </div>
          <div class="flex items-center w-full gap-2 lg:w-1/2">
            <button
              :disabled="item?.amount === 1"
              class="text-black duration-200 hover:text-error disabled:text-gray"
              @click="setProductAmount(index, -1)">
              <div class="text-lg font-medium duration-200 mdi mdi-minus text-inherit" />
            </button>
            <div class="flex items-center justify-center w-12 px-6 py-2 border rounded border-border">
              <span>{{ item?.amount }}</span>
            </div>
            <button
              class="text-black duration-200 hover:text-primary disabled:text-gray"
              @click="setProductAmount(index, 1)">
              <div class="text-lg font-medium duration-200 mdi mdi-plus text-inherit" />
            </button>
          </div>
        </div>
      </div>
    </template>
    <div
      v-else
      class="flex items-center gap-4 p-4 border rounded-lg border-border">
      <div class="text-xl text-black mdi mdi-cart-outline" />
      <span class="text-black">
        ยังไม่มีสินค้าในตะกร้าของคุณ
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProductInCart } from '~/models/Product.model'
import filters from '~/utils/Filter'

interface IProps {
  selected: number[]
}

const emit = defineEmits([
  'onAction'
])

const props = defineProps<IProps>()

const cartStore = useCartStore()
const { cart, itemInCart } = storeToRefs(cartStore)

function onAction (actionName: string, actionValue: any): void {
  emit('onAction', {
    actionName,
    actionValue
  })
}

function onSelectItem (selectIndex: number): void {
  const name = 'onInputChange'
  const key = 'select'
  const value = [...props.selected]
  const index: number = props.selected.findIndex((item: number): boolean => item === selectIndex)
  if (index >= 0) {
    value.splice(index, 1)
    onAction(name, { key, value })
    return
  }
  onAction(name, { key, value: [...value, selectIndex] })
}

function onSelectAll (): void {
  const name = 'onInputChange'
  const key = 'select'
  if (props.selected.length !== 0 && props.selected.length <= itemInCart.value) {
    onAction(name, {
      key,
      value: []
    })
    return
  }
  onAction(name, {
    key,
    value: cart.value.map((_item: IProductInCart, index: number): number => index)
  })
}

function isSelected (selectIndex: number): boolean {
  const index: number = props.selected.findIndex((s: number): boolean => s === selectIndex)
  return index >= 0
}

function removeFromCart (index: number): void {
  cartStore.removeFromCart(index)
}

function setProductAmount (index: number, amount: number): void {
  cartStore.setProductAmount(index, amount)
}

</script>

<style lang="scss" scoped>
</style>
