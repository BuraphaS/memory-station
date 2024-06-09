<template>
  <div v-if="props.modal">
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="flex flex-col max-w-5xl bg-white rounded-lg shadow-lg modal-container">
        <!-- headerrrrr -->
          <div class="p-5">
            <div class="flex items-start justify-between">
              <span></span>
              <button class="cursor-pointer mdi mdi-close" 
                @click="closeModal()"></button>
            </div>
          </div>
        <!-- body -->
          <div 
            class="px-6">
            <div class="flex gap-6">
              <img
                :src="profile?.image"
                alt="profile"
                class="w-[55px] h-[55px] rounded-full object-cover">
              <div class="w-full">
                <label 
                  for="topic">
                  Name Place
                </label>
                <InputTextField
                  type="text" 
                  name="topic" 
                  id="topic" 
                  class="w-full mb-2 bg-white border" 
                  placeholder="Name Place"
                  :value="postData?.topic"
                  @input="onInputChange('topic', $event.target.value)"
/>
                <label 
                  for="description">
                  Description
                </label>
                <InputTextField 
                  type="textarea" 
                  name="description" 
                  id="description" 
                  class="w-full mb-2 bg-white border" 
                  placeholder="Description"
                  :value="postData?.description"
                  @input="onInputChange('description', $event.target.value)"
/>
              </div>
            </div>
            <div class="flex justify-between mx-4">
              <div class="flex items-center">
                <select 
                  id="category" 
                  name="category"
                  class="px-2 ml-2 border rounded-lg"
                  :value="postData?.status"
                  @change="onInputChange('status', $event.target.value)">
                  <option>Public</option>
                  <option>Just Friend</option>
                </select>
              </div>
              <div>
                <span>Category :</span>
                <select 
                  id="category" 
                  name="category"
                  class="px-2 ml-2 border rounded-lg"
                  :value="postData?.type"
                  @change="onInputChange('type', $event.target.value)">
                  <option>Travel</option>
                  <option>Food</option>
                </select>
              </div>
            </div>
            <div class="mt-4 divide-y divide-slate-400">
              <div></div>
              <div class="flex justify-center pt-2">
                <div class="flex items-center justify-center w-full hover:opacity-70">
                  <label for="dropzone-file" class="flex items-center justify-center rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <p class="flex items-center mb-2 text-4xl text-gray-500 dark:text-gray-400 mdi mdi-image-outline"><span class="text-sm font-semibold">Choose Image</span></p>
                      <input 
                        id="dropzone-file" 
                        type="file" 
                        class="hidden"
                        @change="handleFileUpload">
                  </label> 
                </div>
              </div>
              <div></div>
            </div>   
            <div class="flex grid grid-cols-2">
              <div
                v-for="(item, index) in postData.image"
                :key="index"
                class="relative w-full p-8">
                <div 
                  class="mdi mdi-close-circle cursor-pointer absolute right-7 top-6 text-[#FF0000] hover:text-[#000000]"
                  @click="removeImage(index)"></div>
                <img 
                  :src="item" 
                  :alt="item"
                  class="img-preview border-2 border-[#868A8F] p-2 rounded"
                  >
              </div>
            </div> 
          </div>
        <!-- footer -->
          <div class="flex items-center justify-end p-6">
            <button
              class="px-2 py-1 text-white border rounded-lg bg-error hover:opacity-70"
              @click="closeModal()">
              CANCEL
            </button>
            <button
              class="border px-4 py-1 ml-4 rounded-lg bg-[#0DB51E] text-white hover:opacity-70"
              @click="updatePost()">
              UPDATE
            </button>
          </div>
      </div>
    </div>
    <div class="fixed inset-0 z-40 bg-black opacity-25"></div>
  </div>
</template>

<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue'

interface IProps {
  modal: boolean
  form: any
}
interface IForm {
  uid: string,
  image: string[],
  topic: string,
  description: string,
  type: string
  status: string,
  like: number
}

interface IRating {
  value: any
}
const supabase = useSupabaseClient()
const user: any = useSupabaseUser()
const props = defineProps<IProps>()
const selectedImage = ref<string[]>([])
const postData: Ref<IForm> = ref({
  uid: user.value.id,
  image: [],
  topic: '',
  description: '',
  type: 'Travel',
  status: 'Public',
  like: 0
})
const profile: Ref<any> = ref()

async function fetchProfile (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`username, image`)
      .eq('uid', user.value.id)
      .single()
    if (error) {
      console.log(error); 
    } else {
      profile.value = data
    }
  } catch (error) {
    console.log(error); 
  }
}
// const selectedImage = ref<string[]>([])

async function fetchPost (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('post')
      .select(`*`)
      .eq('id', props.form)
    if (error) {
      console.log(error); 
    } else {
      postData.value = data[0]
    }
  } catch (error) {
    console.log(error); 
  }
}
async function updatePost() {
  try {
    const { error } = await supabase
      .from('post')
      .upsert(postData.value)
      .eq('id', postData.value.id)
      .select()
    console.log(user.value);
    if (error) {
      alert('Update Post Failed')
      return
    } else {
    alert('Update Post Success')
    await window.location.reload()
    }
  } catch (error: any) {
    alert(error.message)
  }
}
function generateRandomFilename(extension: string): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}.${extension}`;
}

async function uploadImage(file: File): Promise<string | null> {
  try {
    const extension = file.name.split('.').pop();
    const randomFilename = generateRandomFilename(extension || 'jpg');

    const { data, error } = await supabase.storage
      .from('post')
      .upload(`post/${randomFilename}`, file);
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    return `https://fhxsoitvmpbsbhoqlewr.supabase.co/storage/v1/object/public/post/post/${randomFilename}`
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}
async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const newFilesCount = input.files.length
    if (selectedImage.value.length + newFilesCount <= 4) {
      for (let i = 0; i < newFilesCount; i++) {
        const file = input.files[i]
        const url = URL.createObjectURL(file)
        selectedImage.value.push(url)
        const imageupload: any = await uploadImage(file)
        postData.value.image.push(imageupload)
      }
    } else {
      console.log('You can only upload up to 4 images.')
    }
  }
}
const handleRatingUpdate = (rating: any) => {
  postData.value.rating = rating
}

function onInputChange(field: string, value: any) {
  postData.value[field] = value
}
function removeImage(index: number) {
  postData.value.image.splice(index, 1)
}
const emits = defineEmits([
  'close-modal'
])
function closeModal(): void {
  emits('close-modal', false)
}
onMounted(() => {
  fetchPost()
  fetchProfile()
})
</script>

<style scoped lang="scss">
.img-preview{
  width: 350px;
  height: 300px;
  object-fit: cover;
}
.modal-container {
  max-height: 90%;
  overflow-y: auto;
}
</style>