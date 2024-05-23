<template>
  <div class="flex flex-col items-center gap-4">
    <img
      src="/svg/icon-cart-process.svg"
      alt="icon cart processing"
      :class="{'animate-spin': isAnimate}"
      class="object-cover object-center w-2/3 aspect-square">
    <span class="text-lg font-medium text-black">
      ระบบกำลังรอยืนยันการทำรายการ
    </span>
    <span>
      กรุณาอย่ากดปิดหน้าจอ จนกว่าจะทำรายการสำเร็จ
    </span>
  </div>
</template>

<script setup lang="ts">
const isAnimate: Ref<boolean> = ref(false)
const interval: Ref<any> = ref(null)

onMounted((): void => {
  interval.value = setInterval((): void => {
    isAnimate.value = !isAnimate.value
  }, 1000)
})

onUnmounted((): void => {
  clearInterval(interval.value)
})
</script>

<style lang="scss" scoped>
</style>
