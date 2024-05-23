<template>
  <section
    id="about-ud-page"
    style="min-height: calc(100vh - 80px - 290px);"
    class="pt-0 pb-12 md:pt-12 bg-info">
    <AboutUsMenu
      :active-index="activeIndex"
      class="flex mb-6 md:hidden"
      @click="setActiveIndex($event)" />
    <div class="container">
      <div class="relative grid grid-cols-12 gap-8">
        <AboutUsMenu
          :active-index="activeIndex"
          class="hidden md:flex"
          @click="setActiveIndex($event)" />
        <Transition
          name="page"
          mode="out-in">
          <div
            :key="getMenu[activeIndex]?.title"
            class="flex flex-col h-full col-span-12 gap-4 md:col-span-8">
            <div class="flex items-center gap-4 text-xl font-medium text-black">
              <img
                :src="getMenu[activeIndex]?.icon"
                alt="about us icon" />
              {{ getMenu[activeIndex]?.title }}
            </div>
            <div class="h-full p-4 bg-white rounded-xl">
              <client-only>
                <AboutUs v-if="getMenu[activeIndex]?.key === 'about-us'" />
                <AboutUsOrder v-if="getMenu[activeIndex]?.key === 'how-to-order'" />
                <AboutUsFaqs v-if="getMenu[activeIndex]?.key === 'faqs'" />
                <AboutUsWarranty v-if="getMenu[activeIndex]?.key === 'warranty'" />
              </client-only>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { IAboutUsData } from '~/models/About.model'

const route = useRoute()
const router = useRouter()

const aboutStore = useAboutStore()
const { getMenu } = storeToRefs(aboutStore)

const activeIndex: Ref<number> = ref(0)

function findActive (): void {
  const { query }: RouteLocationNormalizedLoaded = route
  const index: number = getMenu.value.findIndex((topic: IAboutUsData): boolean => topic.key === query.key)
  activeIndex.value = index > 0 ? index : 0
}

async function setActiveIndex (key: string): Promise<void> {
  await router.replace({
    query: {
      key
    }
  })
  findActive()
}

onMounted((): void => {
  findActive()
})
</script>

<style lang="scss" scoped>
</style>
