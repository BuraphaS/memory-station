<template>
  <div
    id="login-phone"
    class="flex flex-col w-full gap-6 p-6 border border-border rounded-xl">
    <div class="flex flex-col items-center w-full gap-4">
      <InputTextField
        :value="props.phone"
        placeholder="เบอร์โทรศัพท์"
        label="เบอร์โทรศัพท์"
        type="tel"
        autofocus
        @keypress.enter="phone.length === 10
          ? onAction('onNextClick')
          : (): void => {}"
        @input="onInputChange($event)" />
      <button
        :disabled="phone.length !== 10"
        class="w-full px-4 py-2 text-sm font-light text-white duration-200 bg-black rounded-lg md:w-auto disabled:bg-border disabled:text-gray"
        @click="onAction('onCheckCustomer', {
          key: 'phoneNumber',
          value: props?.phone
        })">
        ถัดไป
      </button>
    </div>
    <div class="flex items-center justify-between gap-4">
      <div class="w-full border-b border-border" />
      <span class="text-xs font-light text-gray">
        หรือ
      </span>
      <div class="w-full border-b border-border" />
    </div>
    <div class="flex flex-col w-full gap-2">
      <button
        class="flex items-center justify-between gap-4 p-2 duration-200 border border-black rounded-lg hover:border-primary group"
        @click="onAction('onLoginSocial', {
          key: 'social',
          value: 'google'
        })">
        <img
          src="/svg/google-logo.svg"
          alt="google logo"
          class="h-full aspect-square">
        <span class="w-full text-sm duration-200 group-hover:text-primary">
          เข้าสู่ระบบด้วย Google
        </span>
      </button>
      <button
        class="flex items-center justify-between gap-4 p-2 duration-200 border border-black rounded-lg hover:border-primary group"
        @click="onAction('onLoginSocial', {
          key: 'social',
          value: 'facebook'
        })">
        <img
          src="/svg/facebook-logo.svg"
          alt="facebook logo"
          class="h-full aspect-square">
        <span class="w-full text-sm duration-200 group-hover:text-primary">
          เข้าสู่ระบบด้วย Facebook
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IActionValue } from '~/models/Global.model'

interface IProps {
  phone: string
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
    key: 'phone',
    value: event.target.value
  })
}
</script>

<style lang="scss" scoped>
</style>
