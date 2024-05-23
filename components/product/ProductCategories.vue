<template>
  <section id="product-categories">
    <ProductMainFilter
      title="หมวดหมู่สินค้า"
      :items="items"
      @click="onCategoryChange($event)" />
  </section>
</template>

<script setup lang="ts">
import type { IImageItem } from '~/models/Product.model'

const route = useRoute()
const router = useRouter()

const items: Ref<IImageItem[]> = ref([
  {
    name: 'โทรศัพท์มือถือ',
    img: '/png/category-phone.png'
  },
  {
    name: 'แท็บเล็ต',
    img: '/png/category-tablet.png'
  },
  {
    name: 'โน้ตบุ๊ก',
    img: '/png/category-laptop.png'
  }
])

function onCategoryChange (category: string): void {
  router.replace({
    name: 'products',
    query: {
      ...route.query,
      category
    }
  })
}
</script>

<style scoped>
</style>
