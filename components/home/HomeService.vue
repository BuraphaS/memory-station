<template>
  <section
    id="home-service">
    <div class="w-full overflow-visible md:mb-24">
      <span class="text-xl flex justify-center">บริการของเรา</span>
      <div class="flex gap-4 m-6">
        <div 
          v-for="items, index in card"
          :key="index"
          class="flex gap-4 border-2 py-6 px-8 rounded-xl">
          <div>
            <img :src="items.img" alt="card">
            <div class="w-80 mt-2">{{ items.text }}</div>
          </div>
          <img :src="items.icon" alt="icon">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const card = ref([
  {
    text: 'เพิ่มสมรรถนะโดยการติดตั้งกล่องซิ่ง และปรับจูนทั้งรถยนต์และรถจักยานยนต์',
    img: '/svg/logo-maxx.svg',
    icon: '/svg/icon-arrow.svg'
  },
  {
    text: 'เครื่องทดสอบสมรรถนะของทั้งรถยนต์ และรถจักรยานยนต์',
    img: '/svg/dinodynamics.svg',
    icon: '/svg/icon-arrow.svg'
  },
  {
    text: 'ปั๊มติ๊ก Elixir อัพเกรดความแรงเพื่อ ความสนุกในการขับขี่',
    img: '/svg/elixir.svg',
    icon: '/svg/icon-arrow.svg'
  }
])
onMounted((): void => {
})
</script>

<style scoped>
</style>
