<template>
  <section id="product-brands">
    <ProductMainFilter
      title="แบรนด์สินค้า"
      :items="items"
      @click="onBrandChange($event)" />
  </section>
</template>

<script setup lang="ts">
import type { IImageItem } from '~/models/Product.model'

const route = useRoute()
const router = useRouter()

const items: Ref<IImageItem[]> = ref([
  {
    name: 'Apple',
    img: '/svg/logo-apple.svg'
  },
  {
    name: 'Samsung',
    img: '/svg/logo-samsung.svg'
  },
  {
    name: 'Oppo',
    img: '/svg/logo-oppo.svg'
  },
  {
    name: 'Vivo',
    img: '/svg/logo-vivo.svg'
  },
  {
    name: 'Dell',
    img: '/svg/logo-dell.svg'
  },
  {
    name: 'Lenovo',
    img: '/svg/logo-lenovo.svg'
  }
])

function onBrandChange (brand: string): void {
  router.replace({
    name: 'products',
    query: {
      ...route.query,
      brand
    }
  })
}
</script>

<style scoped>
</style>
