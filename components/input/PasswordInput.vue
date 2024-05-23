<template>
  <label
    id="password-input"
    for="password"
    class="flex flex-col w-full gap-2">
    <span
      v-if="label"
      class="text-md font-base">
      {{ label }}
    </span>
    <slot>
      <input
        id="password"
        :value="props.value"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        name="password"
        :class="{
          'border bg-white rounded disabled:hover:border-transparent p-2': props.border,
          'border-b bg-light disabled:hover:border-transparent p-2': !props.border
        }"
        @input="onInputChange($event)">
    </slot>
  </label>
</template>

<script setup lang="ts">
interface IProps {
  value: string
  label?: string
  placeholder?: string
}

const emit = defineEmits([
  'input'
])
const props = withDefaults(defineProps<IProps>(), {
  value: '',
  label: '',
  placeholder: 'รหัสผ่าน',
  border: false
})

const showPassword: Ref<boolean> = ref(false)

function onInputChange (event: any): void {
  emit('input', event)
}
</script>

<style lang="scss" scoped>
</style>
