<template>
  <div class="accordion-item">
    <div
      class="flex items-center justify-between px-1 border-b cursor-pointer border-border"
      @click="open()">
      <slot name="title" />
      <div
        :class="{
          'rotate-0': !visible,
          'rotate-180': visible
        }"
        class="text-lg duration-200 mdi mdi-chevron-down navigate-next-icon" />
    </div>
    <div
      :style="`height: ${visible ? innerHeight : 0}px;`"
      :class="`opacity-${visible ? 1 : 0} accordion-item-content-${index}`"
      class="overflow-hidden duration-300">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  accordionItemCount: number
  visible: boolean
  index: number
}

const emits = defineEmits([
  'onAction'
])
const props = withDefaults(defineProps<IProps>(), {
  visible: false
})
const initVisible: Ref<boolean> = ref(true)
const innerHeight: Ref<number> = ref(0)
function onAction (key: string, value: any): void {
  emits('onAction', { key, value })
}

function open (): void {
  onAction('innerValue', props.visible
    ? -1
    : props.index)
}

function setHeight (): void {
  const el = document.querySelector(`.accordion-item-content-${props.index}`) as unknown
  const element: HTMLElement = el as HTMLElement
  innerHeight.value = element?.scrollHeight
  initVisible.value = false
}

onMounted((): void => {
  setHeight()
  window.addEventListener('resize', setHeight)
})

onBeforeUnmount((): void => {
  window.removeEventListener('resize', setHeight)
})
</script>

<style lang="scss" scoped>
</style>
