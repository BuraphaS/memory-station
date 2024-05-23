<template>
  <label
    :for="label"
    class="flex flex-col w-full gap-2">
    <span
      v-if="label"
      class="font-base text-md">
      {{ label }}
    </span>
    <slot>
      <input
        v-if="type !== 'textarea'"
        :value="props.value"
        :type="type"
        :placeholder="placeholder || label || ''"
        :autofocus="autofocus"
        :disabled="disabled"
        :class="{
          'border bg-white rounded disabled:hover:border-transparent': border,
          'border-b bg-light disabled:hover:border-transparent': !border
        }"
        class="p-2 text-xs duration-200 outline-none focus-within:outline-none border-border lg:placeholder:text-base md:placeholder:text-sm placeholder:text-xs lg:text-base md:text-sm focus-within:border-secondary hover:border-primary disabled:text-gray disabled:bg-border"
        @keypress.enter="onKeypress()"
        @input="onInputChange($event)">
      <textarea
        v-else
        :value="props.value"
        :placeholder="placeholder || label || ''"
        :autofocus="autofocus"
        :disabled="disabled"
        :rows="rows"
        :class="{
          'border bg-white rounded disabled:hover:border-transparent': border,
          'border-b bg-light disabled:hover:border-transparent': !border
        }"
        class="p-2 text-xs duration-200 outline-none focus-within:outline-none border-border lg:text-base md:text-sm lg:placeholder:text-base md:placeholder:text-sm placeholder:text-xs focus-within:border-secondary hover:border-primary disabled:text-gray disabled:bg-border"
        @keypress.enter="onKeypress()"
        @input="onInputChange($event)" />
    </slot>
  </label>
</template>

<script setup lang="ts">
interface IProps {
  value: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
  border?: boolean
  rows?: number
}

const emit = defineEmits([
  'input',
  'keypress.enter'
])

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  autofocus: false,
  border: false,
  rows: 3
})

function onInputChange (event: any): void {
  emit('input', event)
}

function onKeypress (): void {
  emit('keypress.enter')
}
</script>

<style lang="scss" scoped>
</style>
