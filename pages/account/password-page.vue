<template>
  <section
    id="account-password-page"
    class="flex flex-col items-end gap-4">
    <template v-if="isSocialLogin">
      <div class="flex flex-col items-center justify-center w-full gap-4 text-sm">
        <img
          src="/svg/icon-password-lock.svg"
          alt="icon password lock"
          class="w-1/4 aspect-square">
        <span>
          ขออภัย ไม่สามารถเปลี่ยนรหัสผ่านได้
        </span>
        <span class="font-light text-gray">
          เนื่องจากคุณใช้บัญชี Google หรือ Facebook ในการเข้าสู่ระบบ
        </span>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col w-full gap-4 p-4 bg-white rounded-xl">
        <InputTextField
          :value="form.password"
          label="รหัสผ่านเก่า *"
          border
          class="col-span-1"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          @keypress.enter="Object.values(form).every((item: string): boolean => !!item)
            && form.newPassword === form.confirmPassword
            ? initSave()
            : (): void => {}"
          @input="onInputChange('password', $event.target.value)"
          @click:append="togglePassword('showPassword')"
        />
        <InputTextField
          :value="form.newPassword"
          label="รหัสผ่านใหม่ *"
          border
          class="col-span-1"
          :type="showNewPassword ? 'text' : 'password'"
          :append-icon="showNewPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          @keypress.enter="Object.values(form).every((item: string): boolean => !!item)
            && form.newPassword === form.confirmPassword
            ? initSave()
            : (): void => {}"
          @input="onInputChange('newPassword', $event.target.value)"
          @click:append="togglePassword('showNewPassword')"
        />
        <InputTextField
          :value="form.confirmPassword"
          label="ยืนยันรหัสผ่านใหม่ *"
          border
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          class="col-span-1"
          @keypress.enter="Object.values(form).every((item: string): boolean => !!item)
            && form.newPassword === form.confirmPassword
            ? initSave()
            : (): void => {}"
          @input="onInputChange('confirmPassword', $event.target.value)"
          @click:append="togglePassword('showConfirmPassword')"
        />
      </div>
      <span class="text-xs font-light text-error">
        {{ errorMessage }}
      </span>
      <button
        :disabled="!!errorMessage || Object.values(form).some((item: string): boolean => !item)"
        class="w-full px-8 py-2 text-sm text-white duration-200 bg-black rounded md:w-fit disabled:bg-border disabled:text-gray"
        @click="initSave()">
        บันทึก
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { type IAlert, EAlertType } from '~/models/store/AlertStore.model'
import CustomerProvider from '~/resource/provider/Customer.provider'

const CustomerService = new CustomerProvider()

definePageMeta({
  layout: 'account-layout',
  title: 'เปลี่ยนรหัสผ่าน',
  icon: '/svg/account-icon-password.svg'
})

const userStore = useUserStore()
const { isSocialLogin } = storeToRefs(userStore)

const alertStore = useAlertStore()
const { setAlert } = alertStore

interface IPasswordForm {
  password: string
  newPassword: string
  confirmPassword: string
}

const form: Ref<IPasswordForm> = ref({
  password: '',
  newPassword: '',
  confirmPassword: ''
})
const errorMessage: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)
const showNewPassword: Ref<boolean> = ref(false)
const showConfirmPassword: Ref<boolean> = ref(false)

function toggleAlert (payload?: IAlert): void {
  setAlert({
    isActive: true,
    title: payload?.type === EAlertType.ERROR
      ? 'บันทึกข้อมูลล้มเหลว'
      : 'บันทึกข้อมูลสำเร็จ',
    desc: payload?.type === EAlertType.ERROR
      ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
      : 'ข้อมูลของคุณได้รับการอัพเดตเรียบร้อยแล้ว',
    type: payload?.type || EAlertType.SUCCESS,
    ...payload
  })
}

function handleErrorMessage (message: string = ''): void {
  errorMessage.value = message
}

function handleInputError (value?: string): void {
  handleErrorMessage()
  if (value && value.length < 8) {
    handleErrorMessage('Password must equal or more than 8 letters.')
  }
  if (form.value.confirmPassword && form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
    handleErrorMessage('New password and Confirm password doesn`t match')
  }
  if (form.value.password === form.value.newPassword) {
    handleErrorMessage('New password can`t be the same as old password')
  }
}

function handleSaveError (): void {
  if (form.value.newPassword === form.value.password) {
    throw new Error('new password can`t be the same as old password.')
  }
}

async function initSave (): Promise<void> {
  try {
    handleSaveError()
    await CustomerService.changePassword({
      oldPassword: form.value.password,
      newPassword: form.value.newPassword
    })
    toggleAlert()
  } catch (error: any) {
    handleErrorMessage(error?.message || 'an Error occur, please try again')
    toggleAlert({
      desc: error?.message,
      type: EAlertType.ERROR
    })
  }
}

function togglePassword (key: string): void {
  switch (key) {
    case 'showPassword':
      showPassword.value = !showPassword
      return
    case 'showNewPassword':
      showNewPassword.value = !showNewPassword
      return
    case 'showConfirmPassword':
      showConfirmPassword.value = !showConfirmPassword
      return
    default:
      console.error('[ERROR] - function togglePassword no key specified')
  }
}

function onInputChange (key: keyof IPasswordForm, value: string): void {
  form.value[key] = value
  handleInputError(value)
}
</script>

<style lang="scss" scoped>
</style>
