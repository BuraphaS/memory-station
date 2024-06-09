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
            v-if="!props.form"
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
                <input
                  type="text" 
                  name="topic" 
                  id="topic" 
                  class="w-full px-3 py-1 mb-2 border rounded" 
                  placeholder="Name Place"
                  v-model="form.topic">
                <label 
                  for="description">
                  Description
                </label>
                <textarea 
                  type="text" 
                  name="description" 
                  id="description" 
                  class="w-full p-4 mb-2 border rounded-xl" 
                  placeholder="Description"
                  v-model="form.description"/>
              </div>
            </div>
            <div class="flex justify-between mx-4">
              <div class="flex items-center">
                <select 
                  id="category" 
                  name="category"
                  class="px-2 ml-2 border rounded-lg"
                  v-model="form.status">
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
                  
                  v-model="form.type">
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
                        @change="handleFileUpload"/>
                  </label> 
                </div>
              </div>
              <div></div>
            </div>   
            <div class="flex grid grid-cols-2">
              <div
                v-for="(item, index) in selectedImage"
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
              @click="cancel()">
              CANCEL
            </button>
            <button
              v-if="!props.form"
              class="border px-4 py-1 ml-4 rounded-lg bg-[#0DB51E] text-white hover:opacity-70"
              @click="post()">
              POST
            </button>
            <button
              v-if="props.form"
              class="border px-4 py-1 ml-4 rounded-lg bg-[#0DB51E] text-white hover:opacity-70"
              @click="update()">
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
  uid: string
  image: string[],
  topic: string,
  description: string,
  type: string
  rating: number,
  like: number,
  status: string
}

interface IRating {
  value: any
}
const supabase = useSupabaseClient()
const user: any = useSupabaseUser()

const props = defineProps<IProps>()
const profile: Ref<any> = ref()
const form: Ref<IForm> = ref({
  uid: user.value.id,
  image: [],
  topic: '',
  description: '',
  type: 'Travel',
  rating: 0,
  like: 0,
  status: 'Public'
})
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
const selectedImage = ref<string[]>([])

if (props.form) {
  form.value = { ...props.form }
  selectedImage.value = props.form.image
}
function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const newFilesCount = input.files.length
    if (selectedImage.value.length + newFilesCount <= 4) {
      for (let i = 0; i < newFilesCount; i++) {
        const file = input.files[i]
        const url = URL.createObjectURL(file)
        selectedImage.value.push(url)
        form.value.image.push(file as any)
      }
    } else {
      console.log('You can only upload up to 4 images.')
    }
  }
}
function removeImage(index: number) {
  selectedImage.value.splice(index, 1)
  form.value.image.splice(index, 1)
}
const handleRatingUpdate = (rating: any) => {
  form.value.rating = rating
};
const emits = defineEmits([
  'onAction','close-modal','rating-star','post','update','input'
])

function closeModal(): void {
  emits('close-modal', false)
}

function ratingStar(event: any): void {
  emits('rating-star', event)
}

function cancel(): void {
  closeModal()
}
function onInputChanges (event: any): void {
  emits('input', event)
}
function onInputChange (key: string, event: any): void {
  const name = 'onInputChange'
  onAction(name, { key, value: event?.target?.value })
}
function onAction (actionName: string, actionValue?: any): void {
  emits('onAction', {
    actionName,
    actionValue
  })
}
function post(): void {
  emits('post', form.value)
}
function update(): void {
  emits('update', props.form)
}

function switchCategory (value: string): any {
  switch (value) {
    case 'Food':
      return 'FOOD'
    case 'Travel':
      return 'TRAVEL'
    default:
      return 'error'
  }
}
onMounted(()=>{
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