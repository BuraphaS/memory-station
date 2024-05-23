<template>
  <div v-if="props.modal">
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="flex flex-col max-w-5xl bg-white rounded-lg shadow-lg modal-container">
        <!-- headerrrrr -->
          <div class="px-5 py-4">
            <div class="flex items-start justify-between">
              <span 
                v-if="user.id"
                class="text-xl cursor-pointer mdi mdi-cog-outline"
                @click="openSetting()"></span>
              <span v-else></span>
              <button class="cursor-pointer mdi mdi-close" 
                @click="closeModal()"></button>
            </div>
          </div>
        <!-- body -->
        <client-only>
          <div
            v-if="step == 1"
            class="grid grid-cols-1 gap-4 bg-white lg:grid-cols-2 rounded-xl">
            <ProductDetailImage
              class="flex items-start justify-center px-3"
              :images="postData.image" />
            <div class="p-4 border-l-2 border-gray">
              <div class="flex gap-6 pb-4 border-b">
                <img
                  :src="profile.image"
                  alt="profile"
                  class="w-[55px] h-[55px] rounded-full object-cover">
                <div class="flex items-center text-xl font-base">
                  {{ profile.username }}
                </div>
              </div>
              <div class="flex flex-col">
                <span class="pl-4 my-2 text-xl font-medium">{{ postData.topic }}</span>
                <span>
                  {{ postData.description }}
                </span>
              </div>
              <div class="my-4 border-b-2 border-gray"></div>
              <div
                v-for="(item, index) in comment"
                :key="index"
                class="flex flex-col gap-2">
                <div class="flex gap-4">
                  <img
                    :src="item.image"
                    alt="profile"
                    class="w-[55px] h-[55px] rounded-full object-cover">
                  <span class="flex items-center font-semibold cursor-pointer"
                    @click="toProfile(item.uid)">
                    {{ item.username }}
                  </span>
                </div>
                <div class="ml-8">
                  <span>
                    {{ item.comment }}
                  </span>
                </div>
                <div class="my-1 border-b-2 border-gray"></div>
              </div>
              <div class="relative">
                <textarea 
                  v-model="newComment"
                  class="relative w-full p-4 mt-8 border rounded-xl" 
                  placeholder="Comment" />
                <span class="absolute text-2xl -rotate-45 cursor-pointer top-14 right-3 mdi mdi-send"
                  @click="sendComment()"></span>
              </div>
            </div>
          </div>
          <div v-else-if="step == 2"
            class="grid grid-cols-1 gap-4 bg-white lg:grid-cols-2 rounded-xl">
            <ModalUpdate
              :modal="true"
              :form="postData.id"
              @update="updatePost"
              @close-modal="handleCloseModal()"
              @on-action="handleAction($event)"/>
          </div>
        </client-only>
        <!-- footer -->
          <div class="flex items-center justify-end p-6">
          </div>
      </div>
    </div>
    <div class="fixed inset-0 z-40 bg-black opacity-25"></div>
  </div>
</template>

<script setup lang="ts">
import { type IAction, type IActionValue } from "~/models/Global.model"

const supabase = useSupabaseClient()
const user: any = useSupabaseUser()

const router = useRouter()
interface IProps {
  modal: boolean
  id: any
}
interface IForm {
  id: number
  image: any
  topic: string
  description: string
  rating: number
  like: number
  comment: IComment[]
  uid: string
}
interface IComment {
  uid: string
  comment: string
  username?: string
  image?: string
}
interface IRating {
  value: any
}
const postData: Ref<any> = ref()
const newComment: Ref<any> = ref('')
const profile: Ref<any> = ref()
const props = defineProps<IProps>()
const form: Ref<any> = ref()

const loading = ref(true)
const comment: Ref<any> = ref([])
const step: Ref<any> = ref(1)
const myProfile: Ref<any> = ref()
const postCreate: Ref<boolean> = ref(false)
  
function openSetting (): void {
  step.value++
}
function handleCloseModal() {
    postCreate.value = false;
}
async function fetchProfile (id: any): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`username, image, uid`)
      .eq('uid', id)
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
async function fetchPost (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('post')
      .select(`*`)
      .eq('id', props.id)
    if (error) {
      console.log(error); 
    } else {
      postData.value = data[0]
      await fetchProfile(postData.value.uid)
      await fetchProfileComment(postData.value.comment)
    }
  } catch (error) {
    console.log(error); 
  }
}
async function fetchMyProfile (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`username, image, uid`)
      .eq('uid', user.value.id)
      .single()
    if (error) {
      console.log(error); 
    } else {
      myProfile.value = data
      
    }
  } catch (error) {
    console.log(error); 
  }
}
const selectedImage = ref<string[]>([])
async function fetchProfileComment(comments: any): Promise<void> {
  try {
    const commentPromises = comments.map(async (comment: IComment) => {
      const { data, error } = await supabase
        .from('user')
        .select('username, image')
        .eq('uid', comment.uid)
        .single();

      if (error) {
        console.error(`Error fetching user data for UID ${comment.uid}:`, error);
      } else {
        return {
          ...comment,
          username: data.username,
          image: data.image,
        };
      }
    })
    const resolvedComments = await Promise.all(commentPromises);
    comment.value = resolvedComments.filter(Boolean)
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}

async function sendComment(): Promise<void> {
  if (newComment.value.trim()) {
    const commentData: IComment = {
      ...postData.value.comment,
      uid: user.value.id,
      comment: newComment.value.trim()
    }
    comment.value.push(
      {
      uid: user.value.id,
      comment: newComment.value.trim(),
      username: myProfile.value.username,
      image: myProfile.value.image,
      }
    )
    postData.value.comment = commentData

    try {
      const { data, error } = await supabase
        .from('post')
        .update({ comment: postData.value.comment } as never)
        .eq('id', postData.value.id)
      if (error) {
        console.error('Error updating post comments:', error)
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    }
  }
}
function generateRandomFilename(extension: string): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}.${extension}`;
}
async function uploadImage(file: File,uid: string): Promise<string | null> {
  try {
    const extension = file.name.split('.').pop();
    const randomFilename = generateRandomFilename(extension || 'jpg');

    const { data, error } = await supabase.storage
      .from('post')
      .upload(`post/${randomFilename}`, file);

    if (data) {

    }
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
// async function updatePost(form: any): Promise<void> {
//   try {
//     const imageUrls: string[] = [];
//     for (const file of form.image) {
//       const url: any = await uploadImage(file,form.uid);
//       if (url) {
//         imageUrls.push(url);
//       }
//     }
//     const { data, error } = await supabase
//     .from('post')
//     .update({
//       uid: form.uid,
//       topic: form.topic,
//       description: form.description,
//       type: form.type,
//       rating: form.rating,
//       like: form.like,
//       image: form.image
//     } as never)
//     .eq('id', props.id)
//     .select()
//     if (error) {
//       console.error('Error creating post:', error);
//     } else {
//       // cardInfo.value.push(data)
//       console.log('Post created successfully:', data);
//     }
//   }catch (error) {
//     console.log(error, 'error')
//   }finally{
//     handleCloseModal()
//   }
//   console.log(form)
  
// }
// function removeImage(index: number) {
//   form.value.img.splice(index, 1)
// }
const emits = defineEmits()

function closeModal(): void {
  emits('close-modal', false)
}

function ratingStar(event: any): void {
  emits('rating-star', event)
}

function cancel(): void {
  closeModal()
}

function post(): void {
  emits('post', form.value)
}
function toProfile (id: any): void {
  router.push(`/profile/${id}`)
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
function onInputChange (actionValue: IActionValue<any>): void {
  const { key, value }: IActionValue<any> = actionValue
  // if (!(key in form.value)) {
  //   console.error(`[ERROR] - function onInputChange key not in form key: ${key as string}`)
  //   return
  // }
  form.value = {
    ...form.value,
    [key]: value
  }
  console.log(key , value)
  
}
function handleAction (action: IAction<IActionValue<any>>): void {
  const { actionName: name, actionValue }: IAction<IActionValue<any>> = action
  switch (name) {
    case 'onInputChange':
      onInputChange(actionValue)
      break
    default:
      console.error(`[ERROR] - function handleAction case default name: ${name}`)
  }
}
onMounted(() => {
  fetchPost()
  fetchMyProfile()
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