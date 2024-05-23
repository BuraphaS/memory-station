<template>
  <section
    id="login-page"
    class="container flex items-center justify-center py-12">
    <div class="flex flex-col items-center w-full gap-4">
      <span class="text-xl font-light">
        เข้าสู่ระบบหรือลงทะเบียนเข้าใช้งาน
      </span>
      <div class="flex flex-col w-3/4 gap-1 md:w-2/3 lg:w-1/2">
        <button
          v-if="step > 1"
          class="flex gap-2 group"
          @click="setStep(-1)">
          <div class="duration-200 mdi mdi-chevron-left group-active:-translate-x-1" />
          <span class="text-xs font-light text-black text-start">
            ย้อนกลับ
          </span>
        </button>
        <AuthLoginPhone
          v-if="step === 1"
          :phone="phone"
          @on-action="handleAction($event)" />
        <AuthLoginPassword
          v-if="step === 2"
          :password="password"
          @on-action="handleAction($event)" />
        <AuthLoginRequestOtp
          v-if="step === 3"
          :phone="phone"
          @on-action="handleAction($event)" />
        <AuthLoginOtp
          v-if="step === 4"
          :phone="phoneFormat(phone, true)"
          :otp="otp"
          :ref-otp="refOtp"
          @on-action="handleAction($event)" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { socialSignIn } from '~/libs/social-sign-in/social-sign-in'
import type { IActionValue, IAction } from '~/models/Global.model'
import CustomerProvider from '~/resource/provider/Customer.provider'
import { phoneFormat } from '~/utils/Filter'
import AuthProvider from '~/resource/provider/Auth.provider'
import OTPProvider from '~/resource/provider/OTP.provider'

const CustomerService = new CustomerProvider()
const AuthService = new AuthProvider()
const OTPService = new OTPProvider()

definePageMeta({
  layout: 'auth-layout'
})

const router = useRouter()
const userStore = useUserStore()
const { setRegisterData } = userStore
const { getTempUser } = storeToRefs(userStore)

const step: Ref<number> = ref(1)
const phone: Ref<string> = ref('')
const password: Ref<string> = ref('')
const otp: Ref<string[]> = ref(['', '', '', '', '', ''])
const refOtp: Ref<string> = ref('')

function setStep (movement: number): void {
  step.value += movement
}

function setStepNumber (number: number): void {
  step.value = number
}

function requestOtp (): void {
  // TODO : request otp
}

function handleNextStep (): void {
  switch (step.value) {
    case 1:
      // Temp 'if' function
      if (getTempUser.value.phone === phone.value) {
        setStep(1)
        return
      }
      setRegisterData(phone.value)
      router.push('/auth/register-phone')
      break
    case 2:
      setStep(1)
      break
    case 3:
      requestOtp()
      setStep(1)
      break
    case 4:
      userStore.setIsLogin(true)
      router.push('/')
      break
    default:
      console.error(`[ERROR] - function handleNextStep case default name: ${step.value}`)
  }
}

function onInputChange (actionValue: IActionValue<any>): void {
  const { key, value, index }: IActionValue<any> = actionValue
  switch (key) {
    case 'phone':
      phone.value = value
      break
    case 'password':
      password.value = value
      break
    case 'otp':
      otp.value[index!] = value
      break
    default:
      console.error(`[ERROR] - function onInputChange case default key: ${key as string}`)
  }
}

function login (data: any): void {
  const customer = data?.customer
  const token = data?.token
  if (customer && token) {
    userStore.setUser({
      id: customer?.id,
      customerNo: customer.customerNo,
      firstName: customer.firstName,
      lastName: customer.lastName,
      loginType: customer.loginType,
      isRegisted: customer?.isRegisted,
      email: customer?.email,
      phoneNumber: customer?.phoneNumber
    })
    userStore.setToken({
      accessToken: token.accessToken,
      expireIn: token.expireIn
    })
    userStore.setIsLogin(true)

    if (!customer?.isRegisted) {
      router.push({
        path: customer.loginType === 'otp' ? '/auth/register-phone' : '/auth/register-social'
      })
    } else {
      router.push('/')
    }
  }
}

async function onLoginPassword (): Promise<void> {
  try {
    const payload = {
      phoneNumber: phone.value,
      password: password.value
    }
    const { data } = await AuthService.loginWithPassword(payload)
    login(data)
  } catch (error) {
    // error handle
  }
}

async function onGoogleLogin (): Promise<void> {
  const data = await socialSignIn('google')
  login(data)
}

async function onFacebookLogin (): Promise<void> {
  const data = await socialSignIn('facebook')
  login(data)
}

function onLoginSocial (action: IActionValue<any>): void {
  const { value: social }: IActionValue<any> = action
  switch (social) {
    case 'google':
      onGoogleLogin()
      break
    case 'facebook':
      onFacebookLogin()
      break
    default:
      console.error(`[ERROR] - function onInputChange case default social: ${social as string}`)
  }
}

async function onLoginOTP (): Promise<void> {
  try {
    const { data } = await AuthService.loginWithOtp({
      otp: otp.value.join(''),
      phoneNumber: phone.value,
      ref: refOtp.value
    })
    login(data)
    if (!data?.customer?.isRegisted) {
      router.push('/auth/register-phone')
    }
  } catch (error) {
    // error handle
  }
}

async function onRequestOTP (phoneNumber: string): Promise<void> {
  try {
    const { data: { ref } } = await OTPService.requestOTP({
      phoneNumber
    })
    refOtp.value = ref
  } catch (error) {
    // error handle
  }
}

async function requestOTPAndGoToLogin (phoneNumber: string): Promise<void> {
  try {
    await onRequestOTP(phoneNumber)
    setStepNumber(4)
  } catch (error) {
    // error handle
  }
}

async function onCheckCustomer (actionValue: IActionValue<any>): Promise<void> {
  try {
    const { value }: IActionValue<string> = actionValue

    const { data: { isFound, isRegisted } } = await CustomerService.checkCustomer(value)
    if (isFound && isRegisted) {
      setStep(1)
    } else {
      requestOTPAndGoToLogin(value)
    }
  } catch (error) {
    // error handle
  }
}

function handleAction (action: IAction<IActionValue<any>>): void {
  const { actionName: name, actionValue }: IAction<IActionValue<any>> = action
  switch (name) {
    case 'onInputChange':
      onInputChange(actionValue)
      break
    case 'onNextClick':
      handleNextStep()
      break
    case 'requestOtp':
      requestOtp()
      break
    case 'onLoginPassword':
      onLoginPassword()
      break
    case 'onLoginSocial':
      onLoginSocial(actionValue)
      break
    case 'onLoginOTP':
      onLoginOTP()
      break
    case 'onCheckCustomer':
      onCheckCustomer(actionValue)
      break
    case 'onRequestOTPAndGoToLogin':
      requestOTPAndGoToLogin(actionValue.value)
      break
    default:
      console.error(`[ERROR] - function handleAction case default name: ${name}`)
  }
}

</script>

<style lang="scss" scoped>
</style>
