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
                class="w-[55px] h-[55px] rounded-full">
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
              <div>
                <span>Rate : </span>
                <div class="flex">
                <button type="button" 
                  v-for="i in 5" 
                  :key="i" 
                  :class="{ 'mr-1': i < 5 }" 
                  @click="ratingStar(i)">
                  <!-- <svg class="block w-8 h-8" :class="[ props.raing.value >= i ? 'text-blue': 'text-grey']" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg> -->
                </button>
              </div>
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

          <div 
            v-if="props.form" 
            class="px-6">
            <div class="flex gap-6">
              <img
                :src="profile?.image"
                alt="profile"
                class="w-[55px] h-[55px] rounded-full">
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
                  :value="props.form.topic"
                  @input="onInputChange('topic', $event.target.value)" />
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
                  :value="props.form.description"
                  @input="onInputChange('description', $event.target.value)" />
              </div>
            </div>
            <div class="flex justify-between mx-4">
              <div>
                <span>Rate : </span>
                <div class="flex">
                <button type="button" 
                  v-for="i in 5" 
                  :key="i" 
                  :class="{ 'mr-1': i < 5 }" 
                  @click="ratingStar(i)">
                  <!-- <svg class="block w-8 h-8" :class="[ props.raing.value >= i ? 'text-blue': 'text-grey']" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg> -->
                </button>
              </div>
              </div>
              <div>
                <span>Category :</span>
                <select 
                  id="category" 
                  name="category"
                  class="px-2 ml-2 border rounded-lg"
                  :value="props.form.type"
                  @input="onInputChanges($event)">
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
                v-for="(item, index) in props.form.image"
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
  like: number
}

interface IRating {
  value: any
}
const supabase = useSupabaseClient()
const user: any = useSupabaseUser()

const props = defineProps<IProps>()
const form: Ref<IForm> = ref({
  uid: user.value.id,
  image: [],
  topic: '',
  description: '',
  type: 'Travel',
  rating: 0,
  like: 0
})
const { data } = await supabase
  .from('user')
  .select(`username`)
  .eq('uid', user.value.id)
  .single()
const profile: Ref<any> = ref(data)
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