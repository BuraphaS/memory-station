<template>
  <client-only>
    <div class="flex flex-col w-full gap-4">
      <AccordionMain>
        <template
          v-for="({title, description}, index) in value"
          :key="index">
          <AccordionItem
            v-if="props.limit
              ? index < props.limit
              : true"
            :index="index"
            :visible="activeIndex === index"
            :accordion-item-count="value.length + 1"
            @on-action="handleAction($event)">
            <template #title>
              <span class="py-2 text-base font-medium md:text-lg">
                {{ title }}
              </span>
            </template>
            <div class="py-2 text-sm">
              <p> <span v-html="description"></span></p>
            </div>
          </AccordionItem>
        </template>
      </AccordionMain>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import CMSProvider from '~/resource/provider/CMS.provider'

const CmsService = new CMSProvider()

interface IProps {
  limit?: number
}

const props = defineProps<IProps>()

const activeIndex: Ref<number> = ref(-1)

function handleAction (action: any): void {
  const { key, value }: any = action
  switch (key) {
    case 'innerValue':
      activeIndex.value = value
      break
    default:
      console.error(`[ERROR] - function handleAction case default key: ${key}`)
  }
}

const { data: value } = await useAsyncData('faqs', async (): Promise<any> => {
  const { data }: any = await CmsService.getFaqs()
  return data
})
</script>

<style scoped>
</style>
