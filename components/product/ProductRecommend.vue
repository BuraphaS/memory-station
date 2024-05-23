<template>
  <section
    id="product-recommend"
    class="container">
    <div class="hidden grid-cols-1 gap-4 md:grid-cols-3 md:grid">
      <ProductRecommendCard
        v-for="(data, index) in menus"
        :key="index"
        :data="data" />
    </div>
    <div class="flex w-full h-full overflow-x-hidden md:hidden">
      <Swiper
        ref="swiperRef"
        v-bind="swiperOption">
        <SwiperSlide
          v-for="(data, index) in menus"
          :key="index">
          <ProductRecommendCard
            :data="data" />
        </SwiperSlide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
const swiperRef = ref(null)
const swiperOption = ref({
  freeMode: true,
  spaceBetween: 20,
  slidesPerView: 1.3,
  grabCursor: true,
  centeredSlides: true,
  slideToClickedSlide: true,
  modules: [
    SwiperFreeMode
  ]
})

const menus = ref([
  {
    name: 'ยอดนิยมทันเทรนด์',
    to: '/',
    img: '/png/product-recommend-1.png'
  },
  {
    name: 'คุ้มค่าคุ้มราคา',
    to: '/',
    img: '/png/product-recommend-2.png'
  },
  {
    name: 'ทนทานใช้ได้นาน',
    to: '/',
    img: '/png/product-recommend-3.png'
  }
])
</script>

<style lang="scss" scoped>
</style>
