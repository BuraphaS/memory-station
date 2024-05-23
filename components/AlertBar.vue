<template>
  <section
    id="alert-bar"
    class="fixed right-0 z-50 top-20 md:top-28">
    <button
      :class="{
        'pl-8 translate-x-full shadow-none': !isAlert,
        'pl-4 translate-x-0 shadow-md': isAlert,
        'border-success': getAlert.type === EAlertType.SUCCESS,
        'border-error': getAlert.type === EAlertType.ERROR,
        'border-info': getAlert.type === EAlertType.INFO,
        'border-border': getAlert.type === EAlertType.NONE,
      }"
      class="flex flex-col gap-1 py-2 pr-12 duration-1000 bg-white border-l-4 rounded-sm md:pr-20 min-w-fit h-fit hover:shadow-sm"
      @click="closeAlert()">
      <span class="text-base font-light text-black">
        {{ getAlert.title }}
      </span>
      <span class="text-xs font-light text-gray">
        {{ getAlert.desc }}
      </span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { useAlertStore, storeToRefs } from '#imports'
import { EAlertType } from '~/models/store/AlertStore.model'

const alertStore = useAlertStore()
const { setCloseAlert } = alertStore
const { getAlert, isAlert } = storeToRefs(alertStore)

function closeAlert (): void {
  setCloseAlert(0)
}
</script>

<style scoped>
</style>
