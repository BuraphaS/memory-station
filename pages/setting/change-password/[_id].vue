<template>
  <div class="relative flex flex-col items-center w-full h-screen gap-8 bg-white justify-strat">
    <NuxtLink 
      to="/profile"
      class="absolute flex px-2 py-1 mr-auto border rounded 4ustify-start left-12 top-6 mdi mdi-chevron-left">
      Back
    </NuxtLink>
        <div class="flex flex-col items-start justify-start mt-24">
          <div class="flex flex-col justify-start gap-8">
            <div class="flex items-center justify-between gap-4">
              <label 
                for="oldPass"
                class="flex justify-end">
                Old-Password :
              </label>
              <input
                type="text"
                id="oldPass"
                class="rounded bg-[#C9C9C9] px-2 border-2"
                v-model="oldPassword">
            </div>
            <div class="flex items-center justify-between gap-4">
              <label 
                for="newPass"
                class="flex justify-end">
                New-Password :
              </label>
              <input
                type="text"
                id="newPass"
                class=" rounded bg-[#C9C9C9] px-2 border-2"
                v-model="newPassword">
            </div>
            <div class="flex items-center justify-between gap-4">
              <label 
                for="confirm"
                class="flex justify-end">
                Confirm-Password :
              </label>
              <input
                type="text"
                id="confirm"
                class="rounded bg-[#C9C9C9] px-2 border-2"
                v-model="confirmPassword">
            </div>
          </div>
        </div>
      <div class="flex gap-8">
        <NuxtLink 
          class="bg-error w-[120px] p-1 text-white items-center flex justify-center rounded-lg"
          to="/profile">
          Cancel
        </NuxtLink>
        <button class="bg-success w-[120px] p-1 text-white rounded-lg"
          @click="confirm">
          Confirm
        </button>
      </div>
      <div v-if="message" class="text-red-500">
      {{ message }}
      </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const error = ref(false)
const loading: Ref<boolean> = ref(false)
  
const cancel = () => {
  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  message.value = ''
  error.value = false
}

const confirm = async () => {
  if (newPassword.value !== confirmPassword.value) {
    console.error('Passwords do not match')
    message.value = 'Passwords do not match'
    return
  }
  loading.value = true
  try {
    if (user) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword.value
      })

      if (error) {
        console.error('Error updating password:', error.message)
        message.value = error.message
      } else {
        alert('Password updated successfully')
        console.log('Password updated successfully')
        cancel()
      }
    } else {
      console.error('No authenticated user')
    }
  } catch (error: any) {
    console.error('Error updating password:', error)
    message.value = error.message
  } finally {
    loading.value = false
  }
}

</script>

<style scoped lang="scss">
.img-profile {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
}
</style>