<template>
  <div class="hidden w-full h-full overflow-x-hidden md:flex">
    <button
      v-for="(menu, index) in props.menus"
      :key="index"
      :class="{
        'border-secondary font-medium': isSelected(menu.value),
        'border-border font-base': !isSelected(menu.value)
      }"
      class="w-full h-full px-4 py-2 text-sm duration-200 border-b whitespace-nowrap"
      @click="onFilterChange(menu.value)">
      {{ menu.title }}
    </button>
  </div>
  <div class="flex w-full h-full overflow-x-hidden md:hidden">
    <Swiper
      ref="swiperRef"
      v-bind="swiperOption">
      <SwiperSlide
        v-for="(menu, index) in props.menus"
        :key="index">
        <button
          :class="{
            'border-secondary font-medium': isSelected(menu.value),
            'border-border font-base': !isSelected(menu.value)
          }"
          class="w-full h-full px-4 py-2 text-sm duration-200 border-b whitespace-nowrap"
          @click="onFilterChange(menu.value)">
          {{ menu.title }}
        </button>
      </SwiperSlide>
    </swiper>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits([
  'onChangeTab'
])

interface IProps {
  menus: any[]
}
const props = defineProps<IProps>()

const router = useRouter()
const route = useRoute()

const swiperRef = ref(null)
const swiperOption = ref({
  freeMode: true,
  spaceBetween: 0,
  slidesPerView: 2.5,
  grabCursor: true,
  // centeredSlides: true,
  slideToClickedSlide: true,
  modules: [
    SwiperFreeMode
  ]
})

function onFilterChange (filter: string): void {
  router.replace({
    name: 'account-order',
    query: {
      ...route.query,
      filter
    }
  })
  emit('onChangeTab', filter)
}

function isSelected (value: string): boolean {
  return value === route.query.filter
}
</script>

<style scoped>

</style>
