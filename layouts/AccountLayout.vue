<template>
  <div class="layout-account bg-info">
    <AppBar />
    <main
      id="site-content"
      class="pt-0 pb-12 md:pt-12">
      <AccountMenu class="flex mb-6 md:hidden" />
      <section class="container">
        <div class="relative grid grid-cols-12 gap-8">
          <AccountMenu class="hidden md:flex" />
          <div class="flex flex-col col-span-12 gap-4 md:col-span-8">
            <NuxtLink
              v-if="currentRoute?.meta?.backName"
              :to="{ name: currentRoute?.meta?.backName as string }"
              class="flex gap-2 text-sm duration-200 group text-gray hover:text-secondary">
              <div class="duration-200 mdi mdi-chevron-left group-active:-translate-x-2 text-inherit" />
              <span class="duration-200 text-inherit">
                {{ currentRoute?.meta?.backText }}
              </span>
            </NuxtLink>
            <div class="flex items-center gap-2 text-xl font-medium text-black">
              <img
                v-if="currentRoute?.meta?.icon"
                :src="(currentRoute?.meta?.icon as string)"
                alt="account icon" />
              {{ currentRoute?.meta?.title }}
            </div>
            <slot />
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
    <AlertBar />
  </div>
</template>

<script setup lang="ts">
import { useRouter, type Router } from '#vue-router'

const { currentRoute }: Router = useRouter()
</script>

<style lang="scss" scoped>
.layout-account {
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
