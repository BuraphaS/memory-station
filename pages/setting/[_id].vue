<template>
  <div class="relative flex flex-col items-center w-full h-full bg-white justify-strat">
    <NuxtLink 
      to="/profile"
      class="absolute flex px-2 py-1 mr-auto border rounded 4ustify-start left-12 top-6 mdi mdi-chevron-left">
      Back
    </NuxtLink>
    <div class="flex flex-col items-center w-full h-full p-8 m-4 bg-white rounded-xl">
      <div class="w-full gap-4">
        <div class="flex items-center justify-center m-auto img-profile">
            <div
              v-if="profile.image"
              class="relation flex items-center justify-center w-[200px] border h-[200px] rounded-full hover:opacity-70">
              <label for="dropzone-file" class="flex items-center justify-center rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <p class="absolute z-50 flex flex-col items-center mb-2 text-4xl text-gray-500 dark:text-gray-400 mdi mdi-image-outline"><span class="text-sm font-semibold">Choose Image</span></p>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    class="hidden" 
                    @change="handleFileUpload"/>
                    <img
                      :src="!selectedImage ? profile?.image : selectedImage"
                      alt="profile"
                      class="img-profile">
              </label> 
            </div>
          <div 
            v-if="!profile?.image"
            class="flex justify-center pt-2">
            <div class="flex items-center justify-center w-[180px] p-4 border h-[180px] rounded-full hover:opacity-70">
              <label for="dropzone-file" class="flex items-center justify-center rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <p class="flex flex-col items-center mb-2 text-4xl text-gray-500 dark:text-gray-400 mdi mdi-image-outline"><span class="text-sm font-semibold">Choose Image</span></p>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    class="hidden" 
                    @change="handleFileUpload"/>
              </label> 
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <div class="flex flex-col justify-start w-3/4 gap-8">
            <div class="flex items-center w-full gap-2">
                <InputTextField
                  :value="profile.username"
                  label="Username"
                  border
                  @input="onInputChange('username', $event.target.value)" 
                  />
            </div>
            <div class="flex items-center justify-center w-full gap-2">
                <InputTextField
                  :value="profile.description"
                  label="Description"
                  type="textarea"
                  border
                  @input="onInputChange('description', $event.target.value)" 
                  />
            </div>
            <div class="flex items-center w-full gap-2">
                <InputTextField
                  :value="profile.email"
                  label="Email"
                  disabled
                  border
                  @input="onInputChange('email', $event.target.value)" 
                  />
            </div>
            <div class="flex items-center w-full gap-2">
                <InputTextField
                  :value="profile.firstName"
                  label="FirstName"
                  border
                  @input="onInputChange('firstName', $event.target.value)" 
                  />
            </div>
            <div class="flex items-center w-full gap-2">
                <InputTextField
                  :value="profile.lastName"
                  label="LastName"
                  border
                  @input="onInputChange('lastName', $event.target.value)" 
                  />
            </div>
            <div class="flex items-center w-full gap-2">
                <InputTextField
                  :value="profile.phone"
                  label="Phone"
                  border
                  @input="onInputChange('phone', $event.target.value)" 
                  />
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-8 mt-12">
        <NuxtLink 
          to="/profile"
          class="bg-error w-[120px] p-1 text-white rounded-lg flex items-center justify-center">
          Cancel
        </NuxtLink>
        <button class="bg-success w-[120px] p-1 text-white rounded-lg" @click="updateProfile">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const supabase = useSupabaseClient()
const user: Ref<any> = useSupabaseUser()

const { data } = await supabase
  .from('user')
  .select(`*`)
  .eq('uid', user.value.id)
  .single()
const profile: Ref<any> = ref({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: 0,
    image: '',
    description: ''
})
const selectedImage = ref<string>()

function generateRandomFilename(extension: string): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}.${extension}`;
}
async function uploadImage(file: File): Promise<string | null> {
  try {
    const extension = file.name.split('.').pop();
    const randomFilename = generateRandomFilename(extension || 'jpg');

    const { data, error } = await supabase.storage
      .from('profile')
      .upload(`profile/${randomFilename}`, file);
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    return profile.value.image = `https://fhxsoitvmpbsbhoqlewr.supabase.co/storage/v1/object/public/profile/profile/${randomFilename}`
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}
async function fetchProfile(): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`*`)
      .eq('uid', user.value.id)
      .single()
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      profile.value = data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const url = URL.createObjectURL(file);

    selectedImage.value = url;
    uploadImage(file)
  }
}
const loading = ref(true)
loading.value = false

async function updateEmail() {
  try {
    loading.value = true
    const { error } = await supabase.auth.updateUser({email: profile.value.email})
    if (error) {
      if (error.message.includes('duplicate key value violates unique constraint "users_email_key"')) {
        // alert('The email address is already in use. Please use a different email.')
      } else {
        // alert(error.message);
      }
      return
    }
  } catch (error: any) {
    // alert(error.message)
  } finally {
    // alert('Please Check your Email to Confirm!')
    loading.value = false
  }
}
async function updateProfile() {
  try {
    loading.value = true
    const { error } = await supabase
      .from('user')
      .upsert(profile.value)
      .eq('uid', user.value.id)
      .select()
    console.log(user.value);
    if (error) throw error
    // await updateEmail()
    await fetchProfile()
  } catch (error: any) {
    alert(error.message)
  } finally {
    alert('Update Profile Success')
    loading.value = false
  }
}
function onInputChange(field: string, value: string) {
  profile.value[field] = value;
  console.log(field = value);
  
}
onMounted(() => {
  fetchProfile()
})
</script>

<style scoped lang="scss">
.img-profile {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
  opacity: 70%;
  z-index: 0;
}
</style>