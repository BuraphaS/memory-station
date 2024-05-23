<template>
  <section
    id="product-relate"
    class="py-12 bg-info group">
    <div class="container flex flex-col items-center gap-8">
      <div class="flex flex-col items-center gap-4 w-fit">
        <div class="w-1/2 h-2 rounded-full bg-secondary group-hover:animate-pulse" />
        <span class="text-2xl font-medium text-black">
          สินค้าอื่นๆ ที่คุณอาจสนใจ
        </span>
      </div>
      <ProductList
        max="4"
        hide-more
        relate />
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
