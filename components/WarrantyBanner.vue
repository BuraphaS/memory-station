<template>
  <section id="warranty-banner" class="container my-8">
    <div class="grid w-full grid-cols-3 px-0 py-2 bg-white rounded-full shadow-md md:py-4 h-max md:w-auto md:px-8">
      <template
        v-for="({name, img}, index) in data"
        :key="index">
        <div
          :class="{
            'border-r border-border': index < data.length - 1
          }"
          class="flex flex-col items-center justify-start gap-1 px-2 lg:gap-4">
          <img
            v-if="img"
            :src="img"
            :alt="`warrantybanner image ${index}`"
            class="w-8 h-8 md:w-12 md:h-12">
          <span class="text-xs text-center md:text-sm lg:text-base">
            {{ name }}
          </span>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
const data = ref([
  {
    name: 'ตรวจสอบการใช้งานได้ปกติ',
    img: '/png/Quality-1.png'
  },
  {
    name: 'ของแท้ 100%',
    img: '/png/Quality-2.png'
  },
  {
    name: 'รับเงินคืนภายใน 24 ชั่วโมง',
    img: '/png/Quality-3.png'
  }
])
</script>

<style scoped>
</style>
