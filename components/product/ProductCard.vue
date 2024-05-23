<template>
  <NuxtLink
    id="product-card"
    :to="{
      path: data?.id
        ? `/products/${data?.id}`
        : '/'
    }"
    class="flex flex-col h-full overflow-hidden duration-200 rounded-lg outline outline-border group hover:outline-primary">
    <div class="flex items-center justify-center w-full overflow-hidden text-white h-3/5">
      <img
        :src="Array.isArray(props.data?.images)
          ? props.data?.images[0] || '/jpg/product-example-1.jpg'
          : props.data?.images || '/jpg/product-example-1.jpg'"
        :alt="`product-image-${data?.name}`"
        class="object-cover object-center w-full h-full">
    </div>
    <div class="flex flex-col items-start justify-between w-full gap-2 p-2 h-fit md:p-4">
      <span class="w-full max-h-full text-base text-black truncate md:text-sm">
        {{ data?.name }}
      </span>
      <span
        :class="{
          'text-sm md:text-base': data?.skuProducts.length > 1,
          'text-lg md:text-xl': !data?.skuProducts.length,
        }"
        class="font-semibold duration-500 text-primary group-hover:text-secondary">
        {{ getProductPrice(data) }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IProductList } from '~/models/Product.model'
import type { ISkuProduct } from '~/models/response/ProductRes.model'
import { numberFormatBaht } from '~/utils/Filter'

interface IProps {
  data: IProductList
}

const props = defineProps<IProps>()

function getProductPrice (product: IProductList): string {
  if (!product?.skuProducts) {
    return `${numberFormatBaht(product?.price || 0)}`
  }

  if (product?.skuProducts.length > 1) {
    const price = product?.skuProducts.map((item: ISkuProduct): number => item?.price || 0)
    const min = numberFormatBaht(Math.min(...price))
    const max = numberFormatBaht(Math.max(...price))
    return min === max
      ? `${min}`
      : `${min} - ${max}`
  }

  return product?.skuProducts[0]?.price
    ? `${numberFormatBaht(product?.skuProducts[0].price)}`
    : '-'
}
</script>

<style scoped>
</style>
