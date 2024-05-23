<template>
  <footer
    id="app-footer"
    :class="{
      'pb-20 md:pb-0': currentRoute.name === 'products-_id'
    }"
    class="bg-white border-t h-fit border-border">
    <div class="container flex flex-col items-start justify-between gap-4 my-12 lg:gap-8 lg:my-24 lg:flex-row">
      <img
        src="/svg/maxx-ecu-logo.svg"
        alt="npr logo footer"
        class="hidden md:flex" />
      <div class="grid w-full grid-cols-2 lg:w-auto gap-y-2 gap-x-6">
        <span
          v-for="({title, key}) in getMenu"
          :key="key">
          <NuxtLink
            :to="{
              path: '/about-us',
              query: { key }
            }"
            class="text-base duration-200 lg:text-xs hover:text-secondary">
            {{ title }}
          </NuxtLink>
        </span>
      </div>
      <div class="flex flex-col w-full gap-2 lg:w-auto">
        <span class="text-xs">
          Verified By
        </span>
        <div class="flex flex-wrap w-full gap-4 lg:w-60">
          <img
            v-for="(verify, index) in verified"
            :key="index"
            :src="verify"
            :alt="`verify logo footer ${index}`"
            class="object-cover object-center h-6" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Router } from 'vue-router'

const router = useRouter()
const { currentRoute }: Router = router

const aboutStore = useAboutStore()
const { getMenu } = storeToRefs(aboutStore)

const verified: Ref<string[]> = ref([
  '/svg/logos_mastercard.svg',
  '/svg/logos_visa.svg'
])
</script>

<style scoped>
</style>
