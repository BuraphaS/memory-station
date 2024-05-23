<template>
  <div
    id="register-form"
    class="flex flex-col w-full gap-6 p-6 border border-border rounded-xl">
    <div class="flex flex-col items-center w-full gap-4">
      <InputTextField
        :value="props.form.firstName"
        placeholder="ชื่อ"
        label="ชื่อ"
        autofocus
        @keypress.enter="false
          ? onAction('onRegister')
          : (): void => {}"
        @input="onInputChange('firstName', $event)" />
      <InputTextField
        :value="props.form.lastName"
        placeholder="นามสกุล"
        label="นามสกุล"
        @keypress.enter="false
          ? onAction('onRegister')
          : (): void => {}"
        @input="onInputChange('lastName', $event)" />
      <label
        v-if="!isSocial"
        for="label"
        class="flex flex-col w-full gap-2">
        <span class="text-xs font-light">
          สร้างรหัสผ่าน
        </span>
        <InputPasswordInput
          :value="props.form.password"
          @input="onInputChange('password', $event)" />
        <span class="text-xs font-light text-gray">
          รหัสผ่านต้องมีอักขระขั้นต่ำ 8-12 ตัว ประกอบไปด้วยตัวเลข (0-9) อย่างน้อยหนึ่งตัว
          และตัวอักษร (a-z) พิมพ์เล็กหรือพิมพ์ใหญ่อย่างน้อยหนึ่งตัว
        </span>
      </label>
      <label
        v-if="!isSocial"
        for="label"
        class="flex flex-col w-full gap-2">
        <span class="text-xs font-light">
          ยืนยันรหัสผ่าน
        </span>
        <InputPasswordInput
          :value="confirmPassword"
          placeholder="ยืนยันรหัสผ่าน"
          @input="confirmPassword = $event.target.value" />
      </label>
      <div class="flex items-center col-span-2 gap-2">
        <InputCheckBox
          :value="props.isAcceptTerm"
          @click="onAction('onAcceptTerm')" />
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
      <div class="flex items-center col-span-2 gap-2">
        <InputCheckBox
          :value="props.form.subscribe"
          @click="onInputChange('subscribe', !props.form.subscribe)" />
        <div class="flex flex-wrap items-center gap-1 text-xs font-light text-gray">
          ฉันต้องการรับข้อเสนอและโปรโมชันจาก NPR ดูข้อมูลเพิ่มเติม เงื่อนไขความเป็นส่วนตัว
          <span class="underline duration-100 text-secondary hover:text-primary">
            เงื่อนไขความเป็นส่วนตัว
          </span>
        </div>
      </div>
      <button
        :disabled="!props.isAcceptTerm"
        class="w-full px-4 py-2 text-sm font-light text-white duration-200 bg-black rounded-lg md:w-auto disabled:bg-border disabled:text-gray"
        @click="onAction('onRegister')">
        ลงทะเบียน
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IActionValue } from '~/models/Global.model'
import type { IRegisterForm } from '~/models/Auth.model'

interface IProps {
  form: IRegisterForm
  isSocial?: boolean
  isAcceptTerm?: boolean
}

const emit = defineEmits([
  'onAction'
])
const props = withDefaults(defineProps<IProps>(), {
  isSocial: false
})
const confirmPassword: Ref<string> = ref('')

function onAction (actionName: string, actionValue?: IActionValue<any> | string): void {
  emit('onAction', {
    actionName,
    actionValue
  })
}

function onInputChange (key: string, event: any): void {
  onAction('onInputChange', {
    key,
    value: event?.target?.value || event
  })
}
</script>

<style lang="scss" scoped>
</style>
