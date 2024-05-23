<template>
  <section
    id="login-page"
    class="container flex items-center justify-center py-12">
    <div class="flex flex-col items-center w-full gap-4">
      <span class="text-xl font-light">
        คุณยังไม่มีบัญชี กรุณาลงทะเบียน
      </span>
      <span>
        ลงทะเบียนด้วยบัญชี {{ userStore.getLoginType }}
      </span>
      <div class="flex flex-col w-3/4 gap-1 md:w-2/3 lg:w-1/2">
        <NuxtLink
          to="/auth/login-page"
          class="flex gap-2 group">
          <div class="duration-200 mdi mdi-chevron-left group-active:-translate-x-1" />
          <span class="text-xs font-light text-black text-start">
            ย้อนกลับ
          </span>
        </NuxtLink>
        <AuthRegisterForm
          :form="form"
          :is-accept-term="isAcceptTerm"
          is-social
          @on-action="handleAction($event)" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import type { Router } from 'vue-router'
import type { IRegisterForm } from '~/models/Auth.model'
import type { IActionValue, IAction } from '~/models/Global.model'
import CustomerProvider from '~/resource/provider/Customer.provider'

const CustomerService = new CustomerProvider()

definePageMeta({
  layout: 'auth-layout'
})

const userStore = useUserStore()
const router = useRouter()
// const { currentRoute }: Router = useRouter()

const form: Ref<IRegisterForm> = ref({
  firstName: '',
  lastName: '',
  subscribe: false
})
const isAcceptTerm: Ref<boolean> = ref(false)

function onInputChange (actionValue: IActionValue<IRegisterForm>): void {
  const { key, value }: IActionValue<IRegisterForm> = actionValue
  if (key === 'subscribe') {
    form.value.subscribe = value
    return
  }
  if (!(key in form.value)) {
    console.error(`[ERROR] - function onInputChange key not in form key: ${key as string}`)
    return
  }
  form.value = {
    ...form.value,
    [key]: value
  }
}

async function onRegister (): Promise<void> {
  try {
    const { firstName } = form.value
    const { lastName } = form.value
    await CustomerService.socialRegister({
      firstName,
      lastName
    })
    userStore.setUserAfterRegister({
      firstName,
      lastName
    })
    router.push('/')
  } catch (error) {
    // error handle
  }
  // userStore.setIsLogin(true)
}

function handleAction (action: IAction<IActionValue<IRegisterForm>>): void {
  const { actionName: name, actionValue }: IAction<IActionValue<IRegisterForm>> = action
  switch (name) {
    case 'onInputChange':
      onInputChange(actionValue)
      break
    case 'onRegister':
      onRegister()
      break
    case 'onAcceptTerm':
      isAcceptTerm.value = !isAcceptTerm.value
      break
    default:
      console.error(`[ERROR] - function handleAction case default name: ${name}`)
  }
}

</script>

<style lang="scss" scoped>
</style>
