<template>
  <div v-if="props.modal">
    <div class="fixed inset-0 z-50 flex items-center justify-center w-full">
      <div class="flex flex-col max-w-5xl w-[600px] p-4 bg-white rounded-lg shadow-lg modal-container">
        <client-only>
          <div class="w-full gap-4 bg-white rounded-xl">
            <div v-if="step == 1">
              <form class="flex flex-col" @submit.prevent="singIn">
                <span class="flex justify-center text-2xl font-semibold">
                  Sign In
                </span> 
                <div class="flex flex-col gap-8 form-widget">
                  <InputTextField
                    :value="signInForm.email"
                    placeholder="Your email"
                    label="Email"
                    autofocus
                    @keypress.enter="false"
                    @input="onInputChangeSignIn('email', $event.target.value)" />
                  <InputPasswordInput
                    :value="signInForm.password"
                    placeholder="Password"
                    label="Password"
                    @keypress.enter="false"
                    @input="onInputChangeSignIn('password', $event.target.value)" />
                  <div class="flex justify-between">
                    <div class="text-sky-600">
                      Don't have an account? <span class="underline cursor-pointer" @click="nextStep()">Register</span>
                    </div>
                    <input
                      type="submit"
                      class="flex items-center justify-center px-4 py-1 border rounded cursor-pointer bg-none hover:text-white hover:border-none hover:bg-success"
                      :value="loading ? 'Loading' : 'Sign In'"
                      :disabled="loading"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div v-if="step == 2">
              <div 
                class="cursor-pointer mdi mdi-arrow-left"
                @click="backStep()">
                Back
              </div>
              <form class="flex flex-col" @submit.prevent="singUp">
                <span class="flex justify-center text-2xl font-semibold">
                  Sign Up
                </span> 
                <div class="flex flex-col gap-8 form-widget">
                  <InputTextField
                    :value="signUpForm.email"
                    placeholder="Your email"
                    label="Email"
                    autofocus
                    :class="errorMsgEmail ? 'text-error' : ''"
                    @keypress.enter="false"
                    @input="onInputChange('email', $event.target.value)" />
                    <p class="text-sm text-error">{{ errorMsgEmail }}</p>
                  <InputTextField
                    :value="signUpForm.userName"
                    placeholder="Username"
                    label="Username"
                    autofocus
                    :class="errorMsgUsername ? 'text-error' : ''"
                    @keypress.enter="false"
                    @input="onInputChange('userName', $event.target.value)" />
                    <p class="text-sm text-error">{{ errorMsgUsername }}</p>
                  <div class="flex gap-4">
                    <InputTextField
                    :value="signUpForm.firstName"
                    placeholder="FirstName"
                    label="FirstName"
                    autofocus
                    :class="errorMsgFirstName ? 'text-error' : ''"
                    @keypress.enter="false"
                    @input="onInputChange('firstName', $event.target.value)" />
                    <p class="text-sm text-error">{{ errorMsgFirstName }}</p>
                  <InputTextField
                    :value="signUpForm.lastName"
                    placeholder="LastName"
                    label="LastName"
                    autofocus
                    :class="errorMsgLastName ? 'text-error' : ''"
                    @keypress.enter="false"
                    @input="onInputChange('lastName', $event.target.value)" />
                    <p class="text-sm text-error">{{ errorMsgLastName }}</p>
                  </div>
                  <InputTextField
                    :value="signUpForm.phone"
                    placeholder="Phone Number"
                    type="tel"
                    label="Phone Number"
                    autofocus
                    :class="errorMsgPhone ? 'text-error' : ''"
                    @keypress.enter="false"
                    @input="onInputChange('phone', $event.target.value)" />
                    <p class="text-sm text-error">{{ errorMsgPhone }}</p>
                  <InputPasswordInput
                    :value="signUpForm.password"
                    placeholder="Password"
                    label="Password"
                    :class="errorMsg ? 'text-error' : ''"
                    @keypress.enter="false"
                    @input="onInputChange('password', $event.target.value)" />
                    <p class="text-sm text-error">{{ errorMsg }}</p>
                  <InputPasswordInput
                    :value="signUpForm.confirmPassword"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    :class="errorMsg ? 'text-error' : ''"
                    @keypress.enter="false"
                    @input="onInputChange('confirmPassword', $event.target.value)" />
                    <p class="text-sm text-error">{{ errorMsg }}</p>
                  <div class="flex justify-start w-full">
                    <input
                      type="submit"
                      class="flex items-center justify-center w-full px-4 py-2 text-white rounded cursor-pointer bg-sky-500 hover:text-black hover:border hover:bg-info"
                      :value="loading ? 'Loading' : 'Sign Up'"
                      :disabled="loading"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </client-only>
      </div>
    </div>
    <div class="fixed inset-0 z-40 bg-black opacity-50"></div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
// import { defineProps, defineEmits } from 'vue'
import { type ISignUp } from '~/models/request/AuthReq.model'

interface IProps {
  modal: boolean
}

const router = useRouter()
const client = useSupabaseClient()

const errorMsg: Ref<any> = ref(null)
const errorMsgEmail: Ref<any> = ref(null)
const errorMsgUsername: Ref<any> = ref(null)
const errorMsgFirstName: Ref<any> = ref(null)
const errorMsgLastName: Ref<any> = ref(null)
const errorMsgPhone: Ref<any> = ref(null)
const successMsg: Ref<any> = ref(null)
  
const loading: Ref<boolean> = ref(false)
const step = ref(1)
const props = defineProps<IProps>()
const emits = defineEmits()


const signInForm: Ref<any> = ref({
  email: '',
  password: ''
})
const signUpForm: Ref<ISignUp> = ref({
  email: '',
  userName: '',
  password: '',
  confirmPassword: '',
  phone: '',
  firstName: '',
  lastName: ''
})
function nextStep (): void {
  step.value ++
}
function backStep (): void {
  step.value --
}
function closeModal(): void {
  emits('close-modal', false)
}

function onInputChange (key: string, event: any): void {
  signUpForm.value = {
    ...signUpForm.value, 
    [key]: event
  }
}
function onInputChangeSignIn(key: string, event: any): void {
  signInForm.value = {
    ...signInForm.value,
    [key]: event
  }
}
async function singUpData(uid: string): Promise<void> {
  loading.value = true
  try {
    const { data, error } = await client.from('user').insert(
      {
        email: signUpForm.value.email,
        username: signUpForm.value.userName,
        phone: signUpForm.value.phone,
        firstName: signUpForm.value.firstName,
        lastName: signUpForm.value.lastName,
        image: null,
        uid: uid
      } as any
  ).select()
  if (error) alert('Please!! Check your Email & UserName')
  } catch (error) {
    console.error('Error while inserting user data:', error);
  } finally {
    loading.value = false
  }
}
async function singUp(): Promise<void> {
  loading.value = true
  try {
    if (signUpForm.value.password !== signUpForm.value.confirmPassword) {
      errorMsg.value = 'Passwords do not match'
    }else if (!signUpForm.value.email) {
      errorMsgEmail.value = 'Please Enter your email'
    }else if(!signUpForm.value.userName) {
      errorMsgUsername.value = 'Please Enter your UserName'
    }else if(!signUpForm.value.firstName) {
      errorMsgFirstName.value = 'Please Enter your FirstName'
    }else if (!signUpForm.value.lastName) {
      errorMsgLastName.value = 'Please Enter your LastName'
    }else if (!signUpForm.value.phone) {
      errorMsgPhone.value = 'Please Enter your PhoneNumber'
      return
    }
    const { data, error } = await client.auth.signUp({
      email: signUpForm.value.email,
      password: signUpForm.value.password,
      phone: signUpForm.value.phone
    })
    if (error) throw error
      await singUpData(data.user?.id as any)
      alert('Check your email for the login link!')
    } catch (error: any) {
      errorMsg.value = error.message
    } finally {
      loading.value = false
    }
}
async function singIn(): Promise<void> {
  loading.value = true
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: signInForm.value.email,
      password: signInForm.value.password
    })
    if (error) throw error
    window.location.reload()
  } catch (error: any) {
    errorMsg.value = error.message
    alert(error.message)
  } finally {
    loading.value = false
    router.push('/')
  }
}
</script>

<style scoped>

</style>