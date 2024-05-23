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
                  {{ signInForm.email }}
                  {{ signInForm.password }}
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
                    @keypress.enter="false"
                    @input="onInputChange('email', $event.target.value)" />
                  <InputTextField
                    :value="signUpForm.userName"
                    placeholder="Username"
                    label="Username"
                    autofocus
                    @keypress.enter="false"
                    @input="onInputChange('userName', $event.target.value)" />
                  <div class="flex gap-4">
                    <InputTextField
                    :value="signUpForm.firstName"
                    placeholder="FirstName"
                    label="FirstName"
                    autofocus
                    @keypress.enter="false"
                    @input="onInputChange('firstName', $event.target.value)" />
                  <InputTextField
                    :value="signUpForm.lastName"
                    placeholder="LastName"
                    label="LastName"
                    autofocus
                    @keypress.enter="false"
                    @input="onInputChange('lastName', $event.target.value)" />
                  </div>
                  <InputTextField
                    :value="signUpForm.phone"
                    placeholder="Phone Number"
                    type="tel"
                    label="Phone Number"
                    autofocus
                    @keypress.enter="false"
                    @input="onInputChange('phone', $event.target.value)" />
                  <InputPasswordInput
                    :value="signUpForm.password"
                    placeholder="Password"
                    label="Password"
                    @keypress.enter="false"
                    @input="onInputChange('password', $event.target.value)" />
                  <InputPasswordInput
                    :value="signUpForm.confirmPassword"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    @keypress.enter="false"
                    @input="onInputChange('confirmPassword', $event.target.value)" />
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
  }
}
async function singUp(): Promise<void> {
  try {
    const { data, error } = await client.auth.signUp({
      email: signUpForm.value.email,
      password: signUpForm.value.password,
      phone: signUpForm.value.phone
    })
    if (error) throw error
      await singUpData(data.user?.id as any)
      alert('Check your email for the login link!')

    alert('Check your email for the login link!')
  } catch (error: any) {
    errorMsg.value = error.message
  }
}
async function singIn(): Promise<void> {
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: signInForm.value.email,
      password: signInForm.value.password
    })
    if (error) throw error
    window.location.reload()
  } catch (error: any) {
    errorMsg.value = error.message
  } finally {
    router.push('/')
  }
}
</script>

<style scoped>

</style>