<template>
  <section
    id="home-review"
    class="bg-[url('/svg/review-background.svg')] bg-cover bg-center my-4">
    <div class="container flex flex-col items-center justify-center gap-4 py-16">
      <span class="text-2xl font-medium text-white">
        รีวิวจากลูกค้าของเรา
      </span>
      <div class="relative w-full">
        <div class="absolute top-0 bottom-0 z-10 flex items-center swiper-naviagation-prev -left-4">
          <button class="items-center justify-center hidden w-12 h-12 text-2xl duration-200 bg-white border rounded-full border-primary hover:border-secondary group active:scale-95 active:-translate-x-2 md:flex mdi mdi-chevron-left hover:text-secondary text-primary">
          </button>
        </div>
        <div class="absolute top-0 bottom-0 z-10 flex items-center swiper-naviagation-next -right-4">
          <button class="items-center justify-center hidden w-12 h-12 text-2xl duration-200 bg-white border rounded-full border-primary hover:border-secondary group active:scale-95 active:translate-x-2 md:flex mdi mdi-chevron-right hover:text-secondary text-primary">
          </button>
        </div>
        <div class="w-full overflow-x-hidden">
          <Swiper
            ref="swiperRef"
            v-bind="swiperOption"
            @active-index-change="activeIndexChange($event)">
            <SwiperSlide
              v-for="(item) in [...reviews, ...reviews]"
              :key="item?.title">
              <div class="flex flex-col justify-between gap-6 p-4 text-black bg-white h-fit rounded-xl">
                <div class="flex flex-col w-full gap-4">
                  <span class="w-full text-lg font-medium truncate">
                    {{ item?.title }}
                  </span>
                  <span class="text-sm font-light text-gray">
                    {{ item?.description }}
                  </span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2">
                  <div class="flex flex-col gap-2">
                    <span class="text-sm">
                      {{ item?.customerName }}
                    </span>
                    <span class="text-sm font-light text-gray">
                      {{ item?.productName }}
                    </span>
                  </div>
                  <div class="flex flex-col items-end gap-2">
                    <div class="flex gap-1">
                      <div
                        v-for="star in 5"
                        :key="star"
                        :class="{
                          'mdi-star-outline': star > item?.star,
                          'mdi-star': star <= item?.star
                        }"
                        class="mdi text-yellow" />
                    </div>
                    <span>{{ dayjs(item?.date).format('DD MMM BBBB') }}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </swiper>
        </div>
      </div>
      <div class="flex items-center justify-center w-full gap-2">
        <button
          v-for="(_pagination, index) in reviews.length"
          :key="index"
          :class="{
            'bg-white w-3': index !== activeIndex,
            'bg-secondary w-6': index === activeIndex
          }"
          class="h-3 duration-200 rounded-full active:scale-95 hover:scale-105"
          @click="slideTo(index)" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import CMSProvider from '~/resource/provider/CMS.provider'

const CmsService = new CMSProvider()

const reviews: Ref<any[]> = ref([])
const activeIndex = ref(0)

const swiperRef = ref(null)
const swiperOption = ref({
  loop: true,
  loopAddBlankSlides: true,
  effect: 'coverflow',
  spaceBetween: 32,
  slidesPerView: 1.5,
  keyboard: true,
  grabCursor: true,
  centeredSlides: true,
  slideToClickedSlide: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: true
  },
  coverflowEffect: {
    depth: 100,
    rotate: 0,
    stretch: 0,
    modifier: 1,
    scale: 0.95,
    slideShadows: false
  },
  navigation: {
    enabled: true,
    prevEl: '.swiper-naviagation-prev',
    nextEl: '.swiper-naviagation-next'
  },
  modules: [
    SwiperEffectCoverflow,
    SwiperAutoplay,
    SwiperKeyboard,
    SwiperNavigation
  ]
})

function activeIndexChange (swiperEvent: any | number): void {
  activeIndex.value = typeof swiperEvent === 'number'
    ? swiperEvent
    : swiperEvent.realIndex % reviews.value.length
}

function slideTo (index: number): void {
  const elementRef = swiperRef.value as unknown
  const element: any = elementRef as HTMLElement
  const { swiper } = element.$el
  swiper.slideTo(index)
  activeIndexChange(index)
}

async function fetch (): Promise<void> {
  try {
    const response: any = await CmsService.getReview()
    reviews.value = response?.data || []
  } catch (err) {
    console.error(err)
  }
}

onMounted((): void => {
  fetch()
})

</script>

<style lang="scss" scoped>
</style>

<!--
  'mdi-star-outline': item?.star < star * 2 && item?.star !== (star * 2) - 1,
  'mdi-star': item?.star > star * 2,
  'mdi-star-half-full': item?.star === (star * 2) - 1
-->
