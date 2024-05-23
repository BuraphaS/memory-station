<template>
  <header
    id="app-bar"
    class="fixed top-0 left-0 right-0 z-50 h-20 bg-[#232526] pb-4">
    <section class="relative w-full h-full">
      <div class="container flex items-center justify-between h-full pt-8 pb-4">
        <div class="flex items-center gap-4">
          <button
            :class="{
              'rotate-0 mdi-menu': !isOpen,
              'rotate-90 mdi-close': isOpen
            }"
            class="flex text-2xl md:hidden mdi"
            @click="toggleAppbar()"/>
          <NuxtLink
            to="/"
            class="h-full">
            <img
              src="/svg/maxx-ecu-logo.svg"
              alt="maxx ecu logo appbar"
              class="object-cover object-center h-full" />
          </NuxtLink>
        </div>
        <div
          class="justify-between hidden gap-4 p-1 text-xs font-normal text-white rounded-full bg-primary md:flex lg:text-base lg:gap-8"
          @click="scrollToTop()">
          <NuxtLink
            v-for="({name, to, icon}, index) in menus"
            :key="index"
            :to="to"
            :class="{'duration-200 bg-error rounded-full px-4 py-1 hover:text-white active:text-primary active:translate-y-1' : $route.path == to}"
            class="px-4 py-1 duration-200 rounded-full hover:bg-gradient-to-r from-primary to-error hover:text-white active:text-primary active:translate-y-1">
            <div :class="`${icon} text-white text-2xl has-tooltip`">
              <span class='p-1 mt-6 text-sm bg-white rounded shadow-lg tooltip text-primary'>{{ name }}</span>
            </div>
            <!-- {{ name }} -->
          </NuxtLink>
        </div>
        <div>
          <div v-if="user"
            class="flex items-center gap-4">
            <NuxtLink
            to="/profile">
              <img
                :src="!profile?.image ? '/svg/account-icon-account.svg': profile?.image"
                alt="profile"
                :class="!props.data?.image ? 'bg-white' : 'img-profile'"
                class="img-profile">
            </NuxtLink>
            <div class="flex flex-col">
              <span class="text-white">{{ data?.username }}</span>
              <div>
                <div
                  class="block text-white underline cursor-pointer button hover:text-error" 
                  @click="signOut"
                  :disabled="loading">
                  Sign Out
                </div>
              </div>
            </div>
          </div>
          <div v-else
              class="flex gap-2"
              @click="signIn">
              <div class="text-white cursor-pointer hover:text-error">
                Sign In
              </div>
              <span class="text-white">|</span>
              <div class="text-white cursor-pointer hover:text-error">
                Sign Up
              </div>
            </div>
          </div>
        </div>
      <Register :modal="signInModal"/>
    </section>
  </header>
</template>

<script setup lang="ts">
import type { Router } from 'vue-router'

interface IProps {
  data: IProfile
}
interface IProfile {
  username: string
  image: string
  phone: number
  firstName: string
  lastName: string
  email: string
}
const props = defineProps<IProps>()
const { currentRoute }: Router = useRouter()
const supabase = useSupabaseClient()
const user: any = useSupabaseUser()
const loading = ref(true)

const isOpen: Ref<boolean> = ref(false)
const signInModal: Ref<boolean> = ref(false)
  
const menus = ref([
  {
    name: 'Home',
    to: '/',
    icon: 'mdi mdi-home'
  },
  {
    name: 'Recommend',
    to: '/recommend',
    icon: 'mdi mdi-star'
  },
  {
    name: 'Travel',
    to: '/travel',
    icon: 'mdi mdi-airplane'
  },
  {
    name: 'Food',
    to: '/food',
    icon: 'mdi mdi-food'
  },  
  {
    name: 'Friend',
    to: '/friend',
    icon: 'mdi mdi-account-multiple-outline'
  }
])
const profile: Ref<any> = ref()
async function fetchPost (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`image, username`)
      .eq('uid', user.value.id)
    if (error) {
      console.log(error); 
    } else {
      profile.value = data[0]
    }
  } catch (error) {
    console.log(error); 
  }
}
function signIn (): void {
  signInModal.value = true
}
function toggleAppbar (): void {
  isOpen.value = !isOpen.value
}

function scrollToTop (): void {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

watch(currentRoute, (): void => {
  isOpen.value = false
})
async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchPost()
})
</script>

<style scoped lang="scss">
.img-profile {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
}
</style>
