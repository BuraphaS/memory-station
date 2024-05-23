<template>
  <section id="logout-page">
  </section>
</template>

<script setup lang="ts">
import { useRouter } from '#vue-router'

const userStore = useUserStore()
const router = useRouter()

onMounted((): void => {
  userStore.setIsLogin(false)
  router.replace('/')
})
</script>

<style lang="scss" scoped>
</style>
