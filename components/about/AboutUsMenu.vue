<template>
  <div
    :class="{
      'hidden md:flex': currentRoute?.meta?.backText
    }"
    class="sticky z-10 flex flex-col col-span-12 gap-4 py-4 bg-white top-20 md:col-span-4 h-fit md:bg-transparent md:py-0 rounded-b-md">
    <span class="px-2 text-xl font-medium text-black">
      ข้อมูลเพิ่มเติมและการช่วยเหลือ
    </span>

    <div class="flex-col hidden w-full md:flex">
      <button
        v-for="({title, icon, key}, index) in getMenu"
        :key="key"
        :class="{
          'text-secondary': activeIndex === index
        }"
        class="flex items-center w-full gap-2 py-2 text-black duration-200 border-b border-border active:text-primary"
        @click="setActiveIndex(key)">
        <img
          v-if="icon"
          :src="icon"
          alt="about us icon">
        <span class="text-sm duration-200 text-inherit text-start">
          {{ title }}
        </span>
      </button>
    </div>

    <button
      :class="{
        'shadow-none': !menuOpen,
        'shadow-md': menuOpen
      }"
      class="relative flex w-full p-2 group md:hidden"
      @click="openMenuOption()">
      <div class="flex items-center w-full gap-2 text-base font-normal text-black duration-200 hover:text-secondary">
        <img
          :src="getMenu[activeIndex]?.icon"
          alt="about us icon" />
        {{ getMenu[activeIndex]?.title }}
        <div
          :class="{
            'rotate-180': menuOpen
          }"
          class="ml-auto duration-200 mdi mdi-chevron-down text-inherit" />
      </div>

      <div
        :class="{
          'h-0 shadow-none': !menuOpen,
          'h-80 shadow-md': menuOpen
        }"
        class="absolute bottom-0 left-0 right-0 p-2 overflow-hidden overflow-y-scroll duration-200 translate-y-full bg-white rounded-b-md">
        <client-only>
          <button
            v-for="({title, icon, key}, index) in getMenu"
            :key="key"
            :class="{
              'text-secondary': props.activeIndex === index
            }"
            class="flex items-center w-full gap-2 py-2 text-black duration-200 border-b border-border active:text-primary"
            @click="setActiveIndex(key)">
            <img
              v-if="icon"
              :src="icon"
              alt="about us icon">
            <span class="text-sm duration-200 text-inherit text-start">
              {{ title }}
            </span>
          </button>
        </client-only>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Router } from 'vue-router'

interface IProps {
  activeIndex: number
}

const { currentRoute }: Router = useRouter()

const aboutStore = useAboutStore()
const { getMenu } = storeToRefs(aboutStore)

const emits = defineEmits([
  'click'
])
const props = defineProps<IProps>()

const menuOpen: Ref<boolean> = ref(false)
function openMenuOption (): void {
  menuOpen.value = !menuOpen.value
}

function setActiveIndex (key: string): void {
  emits('click', key)
}
</script>

<style scoped>

</style>
