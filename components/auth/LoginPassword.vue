<template>
  <div
    id="login-password"
    class="flex flex-col w-full gap-6 p-6 border border-border rounded-xl">
    <div class="flex flex-col items-center w-full gap-4">
      <label for="password" class="flex flex-col w-full gap-2">
        <span class="text-xs font-light">
          รหัสผ่าน
        </span>
        <InputPasswordInput
          :value="props.password"
          autofocus
          @input="onInputChange($event)" />
      </label>
      <button
        :disabled="!password.length"
        class="w-full px-4 py-2 text-sm font-light text-white duration-200 bg-black rounded-lg md:w-auto disabled:bg-border disabled:text-gray"
        @click="onAction('onLoginPassword')">
        เข้าสู่ระบบ
      </button>
      <button
        class="text-sm font-light duration-200 text-secondary md:w-1/2 hover:text-primary"
        @click="onAction('onNextClick')">
        เข้าสู่ระบบด้วย OTP
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IActionValue } from '~/models/Global.model'

interface IProps {
  password: string
}

const emit = defineEmits([
  'onAction'
])
const props = defineProps<IProps>()

function onAction (actionName: string, actionValue?: IActionValue<any> | string): void {
  emit('onAction', {
    actionName,
    actionValue
  })
}

function onInputChange (event: any): void {
  onAction('onInputChange', {
    key: 'password',
    value: event.target.value
  })
}
</script>

<style lang="scss" scoped>
</style>
