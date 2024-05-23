<template>
  <NuxtLink
    id="recommend-card"
    :to="data.to"
    class="flex w-full h-auto gap-0 rounded-lg md:gap-2 md:h-40 bg-gradient-to-br from-secondary to-primary group">
    <div class="flex flex-col justify-between w-full p-4 pr-0">
      <span class="text-xl text-white">
        {{ props.data.name }}
      </span>
      <div class="flex gap-2 text-xs text-white duration-200 group-active:translate-x-2 whitespace-nowrap">
        ดูสินค้าเพิ่มเติม
        <div class="duration-200 text-inherit mdi mdi-chevron-right group-active:translate-x-1" />
      </div>
    </div>
    <div class="w-full pr-1 md:pr-4">
      <img
        v-if="data.img"
        :src="data.img"
        alt="recommend product image"
        class="object-contain object-bottom h-full">
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface IRecommendData {
  name: string
  to: string
  img: string
}

interface IProps {
  data: IRecommendData
}

const props = defineProps<IProps>()
</script>

<style scoped>
</style>
