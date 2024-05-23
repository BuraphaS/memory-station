<template>
  <div class="grid w-full grid-cols-2 gap-4 p-4 bg-white border rounded-xl h-fit border-border">
    <div class="flex items-center justify-between col-span-2 pb-2 border-b border-border">
      <span>
        ที่อยู่จัดส่ง
      </span>
      <span class="text-xs font-light text-gray">
        ข้อมูลใบเสร็จใช้ที่อยู่เดียวกับที่อยู่จัดส่ง
      </span>
    </div>

    <div class="flex items-center col-span-2 gap-2">
      <InputCheckBox
        :value="form.isSameAddress"
        @click="onInputChange('isSameAddress', !form.isSameAddress)" />
      <div class="flex flex-wrap items-center gap-1 text-xs font-light text-gray">
        ฉันรับทราบว่าได้อ่านและยอมรับ
        <span class="underline duration-100 text-secondary hover:text-primary">
          ข้อกำหนด
        </span>
        และ
        <span class="underline duration-100 text-secondary hover:text-primary">
          เงื่อนไขความเป็นส่วนตัว
        </span>
        ของ NPR เรียบร้อยแล้ว
      </div>
    </div>

    <InputTextField
      :value="form.firstName"
      label="ชื่อ"
      border
      class="col-span-1"
      @input="onInputChange('firstName', $event.target.value)" />
    <InputTextField
      :value="form.lastName"
      label="นามสกุล"
      border
      class="col-span-1"
      @input="onInputChange('lastName', $event.target.value)" />
    <InputTextField
      :value="form.email"
      label="อีเมล"
      type="email"
      border
      class="col-span-1"
      @input="onInputChange('email', $event.target.value)" />
    <InputTextField
      :value="form.phone"
      label="เบอร์โทรศัพท์"
      type="tel"
      border
      class="col-span-1"
      @input="onInputChange('phone', $event.target.value)" />
    <InputTextField
      :value="form.address"
      label="ที่อยู่"
      type="textarea"
      border
      class="col-span-1 md:col-span-2"
      @input="onInputChange('address', $event.target.value)" />
    <InputTextField
      :value="form.postCode"
      label="รหัสไปรษณีย์"
      border
      class="col-span-1"
      @input="onInputChange('postCode', $event.target.value)" />
    <InputTextField
      :value="form.province"
      label="จังหวัด"
      border
      class="col-span-1"
      @input="onInputChange('province', $event.target.value)" />
    <InputTextField
      :value="form.district"
      label="เขต/อำเภอ"
      border
      class="col-span-1"
      @input="onInputChange('district', $event.target.value)" />
    <InputTextField
      :value="form.subDistrict"
      label="แขวง/ตำบล"
      border
      class="col-span-1"
      @input="onInputChange('subDistrict', $event.target.value)" />
    <div class="flex items-center justify-between col-span-2 pb-2 border-b border-border">
      <span>
        วิธีการจัดส่งสินค้า
      </span>
    </div>
    <div class="flex flex-col w-full col-span-2 gap-4">
      <div
        v-for="({icon, name, price, estimateTime}, index) in deliveryOptions"
        :key="index"
        class="flex flex-col gap-2 p-4 duration-200 border rounded-xl border-border hover:border-secondary">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img
              :src="icon"
              alt="icon delivery"
              class="object-cover object-center h-full aspect-square">
            <span>{{ name }}</span>
          </div>
          <span class="text-lg font-medium">
            {{ filters.numberFormatBaht(price || 0) }}
          </span>
        </div>
        <span class="text-sm font-light text-gray">
          {{ estimateTime }}
        </span>
      </div>
    </div>
    <div class="flex items-center col-span-2 gap-2">
      <InputCheckBox
        :value="props.isAcceptTerm"
        @click="onInputChange('isAcceptTerm', !props.isAcceptTerm)" />
      <div class="flex flex-wrap items-center gap-1 text-xs font-light text-gray">
        ฉันรับทราบว่าได้อ่านและยอมรับ
        <span class="underline duration-100 text-secondary hover:text-primary">
          ข้อกำหนด
        </span>
        และ
        <span class="underline duration-100 text-secondary hover:text-primary">
          เงื่อนไขความเป็นส่วนตัว
        </span>
        ของ NPR เรียบร้อยแล้ว
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import filters from '~/utils/Filter'

interface IProps {
  form: any
  deliveryOptions: any
  isAcceptTerm: boolean
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

function onInputChange (key: string, event: any): void {
  const name = 'onInputChange'
  onAction(name, { key, value: event?.target?.value })
}
</script>

<style lang="scss" scoped>
</style>
