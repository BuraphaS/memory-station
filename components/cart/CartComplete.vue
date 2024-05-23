<template>
  <div class="flex flex-col items-center gap-4">
    <img
      src="/svg/icon-check.svg"
      alt="icon cart check"
      class="object-cover object-center w-2/3 aspect-square">
    <span class="text-lg font-medium text-black">
      ชำระเงินเสร็จสิ้น!
    </span>
    <span>
      ตรวจสอบสถานะสินค้าได้ที่
      <NuxtLink
        :to="{ name: 'account-order'}"
        class="duration-200 hover:underline text-secondary hover:text-primary">
        คำสั่งซื้อของฉัน
      </NuxtLink>
    </span>
    <NuxtLink
      to="/"
      class="flex items-center gap-2 px-6 py-2 text-sm text-white bg-black rounded-xl">
      <img
        src="/svg/icon-home.svg"
        alt="icon home"
        class="h-full">
      กลับหน้าแรก
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
</style>
