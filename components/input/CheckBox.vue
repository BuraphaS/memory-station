<template>
  <button
    :class="{
      'bg-primary border-primary hover:text-white': props.value
    }"
    class="flex items-center justify-center w-6 h-6 text-white duration-200 border border-black rounded-md hover:border-primary active:scale-95 hover:text-primary"
    @click="onClick()">
    <div
      :class="icon"
      class="text-lg font-light text-inherit mdi" />
  </button>
</template>

<script setup lang="ts">
interface IProps {
  value: boolean
  icon?: string
}

const emit = defineEmits([
  'click'
])

const props = withDefaults(defineProps<IProps>(), {
  value: false,
  icon: 'mdi-check'
})

function onClick (): void {
  emit('click')
}
</script>

<style lang="scss" scoped>
</style>
