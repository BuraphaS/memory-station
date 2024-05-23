<template>
  <div
    :class="{
      'hidden md:flex': currentRoute?.meta?.backText
    }"
    class="sticky z-10 flex flex-col col-span-12 gap-4 py-4 bg-white top-20 md:col-span-4 h-fit md:bg-transparent md:py-0 rounded-b-md">
    <span class="px-2 text-xl font-medium text-black">
      จัดการบัญชีผู้ใช้
    </span>

    <div class="flex-col hidden w-full md:flex">
      <template
        v-for="({title, icon, name, action}) in data"
        :key="title">
        <NuxtLink
          v-if="name"
          :to="{ name: name }"
          :class="{
            'text-secondary': currentRoute?.name === name
          }"
          class="flex items-center w-full gap-2 py-2 text-black duration-200 border-b border-border active:text-primary">
          <img
            :src="icon"
            alt="account icon">
          <span class="text-sm duration-200 text-inherit text-start">
            {{ title }}
          </span>
        </NuxtLink>
        <button
          v-else
          :class="{
            'text-secondary': currentRoute?.name === name
          }"
          class="flex items-center w-full gap-2 py-2 text-black duration-200 border-b border-border active:text-primary"
          @click="handleAction(action)">
          <img
            :src="icon"
            alt="account icon">
          <span class="text-sm duration-200 text-inherit text-start">
            {{ title }}
          </span>
        </button>
      </template>
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
          v-if="currentRoute?.meta?.icon"
          :src="(currentRoute?.meta?.icon as string)"
          alt="account icon" />
        {{ currentRoute?.meta?.title }}
        <div
          :class="{
            'rotate-180': menuOpen
          }"
          class="ml-auto duration-200 mdi mdi-chevron-down text-inherit" />
      </div>

      <div
        :class="{
          'h-0 shadow-none': !menuOpen,
          'h-48 shadow-md': menuOpen
        }"
        class="absolute bottom-0 left-0 right-0 p-2 overflow-hidden overflow-y-scroll duration-200 translate-y-full bg-white rounded-b-md">
        <client-only>
          <div
            v-for="({title, icon, name, action}) in data"
            :key="title">
            <NuxtLink
              v-if="name"
              :to="{ name: name }"
              :class="{
                'text-secondary': currentRoute?.name === name
              }"
              class="flex items-center w-full gap-2 py-2 text-black duration-200 border-b border-border active:text-primary">
              <img
                :src="icon"
                alt="account icon">
              <span class="text-sm duration-200 text-inherit text-start">
                {{ title }}
              </span>
            </NuxtLink>
            <button
              v-else
              class="flex items-center w-full gap-2 py-2 text-black duration-200 border-b border-border active:text-primary"
              @click="handleAction(action)">
              <img
                :src="icon"
                alt="account icon">
              <span class="text-sm duration-200 text-inherit text-start">
                {{ title }}
              </span>
            </button>
          </div>
        </client-only>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Router } from 'vue-router'
import type { IMenu } from '~/models/Global.model'

const router = useRouter()
const { currentRoute }: Router = useRouter()

const userStore = useUserStore()
const menuOpen: Ref<boolean> = ref(false)
const data: Ref<IMenu[]> = ref([
  {
    title: 'ข้อมูลส่วนตัว',
    icon: '/svg/account-icon-account.svg',
    name: 'account'
  },
  {
    title: 'รายการคำสั่งซื้อ',
    icon: '/svg/account-icon-order.svg',
    name: 'account-order'
  },
  {
    title: 'เปลี่ยนรหัสผ่าน',
    icon: '/svg/account-icon-password.svg',
    name: 'account-password-page'
  },
  {
    title: 'ออกจากระบบ',
    icon: '/svg/account-icon-logout.svg',
    action: 'logout'
  }
])

function logout (): void {
  userStore.clearAuth()
  router.push('/auth/logout-page')
}

function handleAction (action?: string): void {
  switch (action) {
    case 'logout':
      logout()
      break
    default:
      console.error(`[ERROR] - function handleAction case default action: ${action}`)
  }
}

function openMenuOption (): void {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>

</style>
