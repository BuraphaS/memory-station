<template>
  <section id="home-banner">
      <div class="w-full static overflow-visible md:mb-14 h-fit">
        <img src="/public/png/banner.png" alt="banner">
      </div>
  </section>
</template>

<script setup lang="ts">
import CMSProvider from '~/resource/provider/CMS.provider'

const CmsService = new CMSProvider()

const banners = ref([])

const swiperRef = ref(null)
const swiperOption = ref({
  loop: true,
  loopAddBlankSlides: true,
  keyboard: true,
  spaceBetween: 0,
  slidesPerView: 1,
  grabCursor: true,
  centeredSlides: true,
  slideToClickedSlide: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: true
  },
  navigation: {
    enabled: true,
    prevEl: '.swiper-navigation-prev',
    nextEl: '.swiper-navigation-next'
  },
  modules: [
    SwiperAutoplay,
    SwiperKeyboard,
    SwiperNavigation
  ]
})

async function fetch (): Promise<void> {
  try {
    const response: any = await CmsService.getBanner()
    banners.value = response?.data?.map((item: any): any => item.image) || []
  } catch (err) {
    console.error(err)
  }
}

onMounted((): void => {
  fetch()
})
</script>

<style scoped>
</style>
