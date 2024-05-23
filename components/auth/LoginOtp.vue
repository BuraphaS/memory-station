<template>
  <div
    id="login-request-otp"
    class="flex flex-col items-center w-full gap-6 p-6 border border-border rounded-xl">
    <span class="w-full text-base font-light text-black">
      ยืนยันรหัส OTP
    </span>
    <div class="flex flex-col w-full gap-2">
      <span class="text-base text-black">
        ระบุ OTP ที่ได้รับทาง SMS หมายเลข {{ props.phone }} (Ref: {{ props.refOtp }})
      </span>
      <span class="text-sm font-light text-gray">
        OTP มีอายุการใช้งาน 5 นาที
      </span>
    </div>
    <div class="grid grid-cols-6 gap-4">
      <input
        v-for="(input, index) in 6"
        :id="`otp-${index}`"
        :key="input"
        :value="props.otp[index]"
        :type="props.otp[index] ? 'password' : 'tel'"
        placeholder="*"
        maxlength="1"
        class="p-2 text-center border-b focus-within:outline-none boder-border bg-light"
        @input="onInputChange($event, index)">
    </div>
    <button
      :disabled="!phone"
      class="w-full px-4 py-2 text-sm font-light text-white duration-200 bg-black rounded-lg md:w-auto disabled:bg-border disabled:text-gray"
      @click="onAction('onLoginOTP')">
      เข้าสู่ระบบ
    </button>
    <div class="flex items-center justify-center w-full gap-2">
      <span class="text-xs font-light text-black">
        ไม่ได้รับรหัส?
      </span>
      <button
        class="text-xs font-light text-black underline duration-200 hover:text-secondary"
        @click="onAction('requestOtp')">
        ขอรหัส OTP อีกครั้ง
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IActionValue } from '~/models/Global.model'

interface IProps {
  phone: string
  otp: string[]
  refOtp: string
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

function onInputChange (event: any, index: number): void {
  const nextIndex = !event.target.value
    ? index - 1
    : index + 1
  const nextEl: HTMLElement | null = document.getElementById(`otp-${nextIndex}`)
  if (nextEl) {
    setTimeout((): void => {
      nextEl.focus()
    }, 0)
  }
  onAction('onInputChange', {
    key: 'otp',
    value: event.target.value,
    index
  })
}
</script>

<style lang="scss" scoped>
</style>
