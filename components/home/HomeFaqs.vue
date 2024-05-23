<template>
  <section
    id="home-faqs"
    class="container flex flex-col items-center justify-center gap-4 py-16">
    <span class="text-2xl font-medium text-black">
      คำถามที่พบบ่อย
    </span>
    <AboutUsFaqs :limit="3" />
    <div class="flex items-center justify-center w-full">
      <NuxtLink
        :to="{
          name: 'about-us',
          query: { key: 'faqs' }
        }"
        class="px-12 py-3 text-sm font-light text-white bg-black rounded-xl">
        ดูเพิ่มเติม
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
