<template>
  <section id="swiper-image">
    <div class="flex flex-col items-center w-full gap-4 p-1 h-fit">
      <div class="flex items-center justify-between bg-[#EAEAEA] w-full gap-2 overflow-x-hidden h-fit">
        <!-- <div
          v-if="isImageArray"
          class="z-10 flex items-center justify-center">
          <button class="w-12 h-12 duration-200 swiper-naviagation-prev group active:scale-95 active:-translate-x-4">
            <div class="text-5xl text-black duration-200 mdi mdi-chevron-left group-hover:text-secondary" />
          </button>
        </div> -->
        <Swiper
          ref="swiperRef"
          v-bind="swiperOption"
          class="overflow-hidden rounded"
          @active-index-change="activeIndexChange($event)">
          <SwiperSlide
            v-for="(img, index) in isImageArray
              ? props.images as string
              : [...props.images]"
            :key="index">
            <div class="flex items-center justify-center w-full overflow-hidden rounded-xl">
              <img
                :src="img"
                :alt="`product-info-image-${index + 1}`"
                class="object-contain object-center h-[400px] w-screen bg-[#EAEAEA]">
            </div>
          </SwiperSlide>
        </swiper>
        <!-- <div
          v-if="isImageArray"
          class="z-10 flex items-center justify-center">
          <button class="w-12 h-12 duration-200 group active:scale-95 active:translate-x-4 swiper-naviagation-next">
            <div class="text-5xl text-black duration-200 mdi mdi-chevron-right group-hover:text-secondary" />
          </button>
        </div> -->
      </div>
      <div class="flex items-center justify-center gap-2 py-3 border-b swiper-pagination-custom">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface IProps {
  images: string | string[]
}

const props = withDefaults(defineProps<IProps>(), {
  images: (): string[] => ['']
})

const isImageArray: Ref<boolean> = computed((): boolean => Array.isArray(props.images))

const activeIndex = ref(0)
const swiperRef = ref(null)
const swiperOption = ref({
  loop: true,
  loopAddBlankSlides: true,
  spaceBetween: 0,
  keyboard: true,
  slidesPerView: 1,
  grabCursor: true,
  centeredSlides: true,
  slideToClickedSlide: true,
  pagination: {
    el: '.swiper-pagination-custom',
    clickable: true,
    renderBullet (index: number, className: any): any {
      const image = isImageArray
        ? props.images as string
        : [...props.images]
        const bulletClass = 'hover:outline-primary outline-transparent h-[25px] overflow-hidden duration-200 rounded-lg outline'
      const imageClass = 'object-cover object-center w-full h-full'
      return `<span class="${className} ${bulletClass}">
        <img
            src="${image[index]}"
            alt="product-info-image-controller-${index + 1}"
            class="${imageClass}">
        </span>`
    }
  },
  autoplay: {
    delay: 10000,
    disableOnInteraction: true
  },
  navigation: {
    enabled: true,
    prevEl: '.swiper-naviagation-prev',
    nextEl: '.swiper-naviagation-next'
  },
  modules: [
    // SwiperAutoplay,
    SwiperController,
    SwiperKeyboard,
    SwiperNavigation,
    SwiperPagination
  ]
})

function activeIndexChange (swiperEvent: any | number): void {
  activeIndex.value = typeof swiperEvent === 'number'
    ? swiperEvent
    : swiperEvent.realIndex
}
</script>

<style lang="scss" scoped>
:deep(.swiper-pagination-bullet) {
  height: 100px !important;
  background-color: #ffff;
  border: 1px solid black !important;
  border-radius: 12px;
  object-fit: contain !important;
  width: 100px !important;
  opacity: 1;
}
:deep(.swiper-pagination-bullet-active) {
  height: 110px !important;
  background-color: #000000;
  object-fit: cover !important;
  border: none !important;
  width: 110px !important;
  opacity: 1;
}

@media only screen and (max-width: 600px) {
  :deep(.swiper-pagination-bullet) {
    width: 60px;
  }
}

:deep(.swiper-wrapper) {
  align-items: center;
}
</style>
