<template>
  <div class="layout-auth">
    <AppBar />
    <main id="site-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useUserStore, storeToRefs, onMounted } from '#imports'
import { useRouter } from '#vue-router'

const router = useRouter()
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

onMounted((): void => {
  if (isLogin.value) {
    router.push('/')
  }
})
</script>

<style lang="scss" scoped>
.layout-auth {
  min-height: 100dvh;
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#site-content {
  margin-top: 80px;
  margin-bottom: auto;
}
</style>
