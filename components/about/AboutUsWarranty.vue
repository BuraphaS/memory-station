<template>
  <div class="flex flex-col w-full gap-4 text-sm">
    <p> <span v-html="value?.description"></span></p>
  </div>
</template>

<script setup lang="ts">
import CMSProvider from '~/resource/provider/CMS.provider'

const CmsService = new CMSProvider()

const { data: value } = await useAsyncData('product-warranty', async (): Promise<any> => {
  const { data }: any = await CmsService.getWarranty()
  return data
})
</script>

<style scoped>
</style>
