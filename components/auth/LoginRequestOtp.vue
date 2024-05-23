<template>
  <div
    id="login-request-otp"
    class="flex flex-col items-center w-full gap-4 p-6 border border-border rounded-xl">
    <span class="w-full text-base font-light text-black">
      ขอรหัส OTP
    </span>
    <div class="flex flex-col w-full gap-2">
      <span class="text-lg font-medium text-secondary">
        {{ phoneFormat(props.phone, true) }}
      </span>
      <span class="text-sm font-light text-gray">
        ขอรหัส OTP สำหรับเข้าใช้งานของหมายเลขนี้
      </span>
    </div>
    <button
      :disabled="!phone"
      class="w-full px-4 py-2 text-sm font-light text-white duration-200 bg-black rounded-lg md:w-auto disabled:bg-border disabled:text-gray"
      @click="onAction('onRequestOTPAndGoToLogin', {
        key: 'otp',
        value: props.phone
      })">
      ขอรหัส OTP
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IActionValue } from '~/models/Global.model'
import { phoneFormat } from '~/utils/Filter'

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
</script>

<style lang="scss" scoped>
</style>
