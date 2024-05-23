<template>
  <div class="flex flex-col w-full gap-4 p-4 rounded-xl h-fit bg-info">
    <div class="flex w-full gap-4">
      <input
        :value="props.code"
        type="text"
        placeholder="กรอกรหัสส่วนลด"
        class="w-full p-2 duration-200 bg-white border-b outline-none border-border focus-within:outline-none focus-within:border-primary hover:border-primary"
        @keypress.enter="applyCode()"
        @input="onInputChange('code', $event)">
      <button
        class="w-1/5 h-full px-4 py-2 text-sm text-white duration-200 bg-black rounded lg:w-fit whitespace-nowrap hover:bg-primary"
        @click="applyCode()">
        {{ isApply ? 'ยกเลิก' : 'ใช้งาน' }}
      </button>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <span class="col-span-2 text-sm font-light">ยอดรวม:</span>
      <span class="col-span-1 text-sm font-light">{{ filters.numberFormatBaht(sumPrice || 0) }}</span>
      <span class="col-span-2 text-sm font-light">ส่วนลด:</span>
      <span class="col-span-1 text-sm font-light">{{ filters.numberFormatBaht(codeDiscount || 0) }}</span>
      <span class="col-span-3 my-2 border-b border-border" />
      <span class="col-span-2 text-base font-normal">ยอดรวมสุทธิ:</span>
      <span class="col-span-1 text-base font-normal">{{ filters.numberFormatBaht(sumPrice - codeDiscount || 0) }}</span>
    </div>
    <button
      :disabled="
        (step === 1 && selected.length === 0) ||
          (step === 2 && !isAcceptTerm)"
      class="w-full h-full p-3 text-sm text-white duration-200 bg-black rounded-lg hover:bg-primary disabled:bg-gray disabled:text-info"
      @click="onAction('onNextClick')">
      ดำเนินการ{{ step === 1 ? 'สั่งซื้อ' : 'ชำระเงิน' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import filters from '~/utils/Filter'

interface IProps {
  isAcceptTerm: boolean
  codeDiscount: number
  selected: number[]
  sumPrice: number
  isApply: boolean
  code: string
  step: number
}

const emit = defineEmits([
  'onAction'
])

const props = defineProps<IProps>()

function onAction (actionName: string, actionValue?: any): void {
  emit('onAction', {
    actionName,
    actionValue
  })
}

function applyCode (): void {
  onAction('onApplyCode')
}

function onInputChange (key: string, event: any): void {
  const name = 'onInputChange'
  onAction(name, { key, value: event.target.value })
}
</script>

<style lang="scss" scoped>
</style>
