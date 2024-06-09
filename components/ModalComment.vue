<template>
  <div v-if="props.modal">
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="flex flex-col max-w-5xl bg-white rounded-lg shadow-lg modal-container">
        <!-- headerrrrr -->
          <div class="px-5 py-4">
            <div class="flex items-start justify-between">
              <span 
                v-if="user.id == postData?.uid"
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
            <div class="p-4 border-l border-border">
              <div class="flex gap-6 pb-4">
                <img
                  :src="profile.image"
                  alt="profile"
                  class="w-[55px] h-[55px] rounded-full object-cover">
                <div class="flex items-center text-xl font-base">
                  {{ profile.username }}
                </div>
              </div>
              <div
                class="flex items-center justify-between pb-4 border-b border-border">
                <div
                  class="cursor-pointer"
                  @click="toggleLike">
                  <span 
                    :class="[
                      'flex items-center px-2 py-1 space-x-1 text-xs font-medium rounded-full h-min w-min',
                      isLiked ? 'text-rose-600 bg-rose-50' : 'text-gray-400 bg-gray-700 hover:text-rose-600 hover:bg-rose-50'
                    ]">
                    <p :class="['flex gap-2 text-xl font-semibold mdi', isLiked ? 'mdi-heart text-[#FFC0CB]' : 'mdi-heart']">
                      <span>{{ like.length }}</span>
                    </p>
                  </span>
                </div>
                <StarRating 
                  :id="postData.id"/>
              </div>
              <div class="flex flex-col">
                <span class="pl-4 my-2 text-xl font-medium">{{ postData.topic }}</span>
                <span>
                  {{ postData.description }}
                </span>
              </div>
              <div class="my-4 border-b border-border"></div>
              <div class="overflow-auto h-[500px]">
                <div
                  v-for="(item, index) in comment"
                  :key="index"
                  class="flex flex-col gap-2">
                  <div class="flex gap-4">
                    <img
                      :src="item.image"
                      alt="profile"
                      class="w-[55px] h-[55px] rounded-full object-cover">
                    <div class="flex items-center justify-between w-full">
                      <div class="flex items-center font-semibold cursor-pointer"
                        @click="toProfile(item.uid)">
                        {{ item.username }}
                      </div>
                      <div
                        v-if="item.uid === user.id || postData.uid === user.id"
                        class="relative flex items-center text-xl cursor-pointer mdi mdi-settings-helper"
                        @click="toggleDropdown(item.id)">
                        <div 
                          v-if="isDropdownOpen === item.id"
                          class="absolute top-0 z-10 w-32 mt-2 origin-top-right bg-white rounded-md shadow-lg right-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div class="py-1">
                            <button
                              v-if="item.uid === user.id" 
                              class="flex block gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mdi mdi-pencil-box-multiple-outline"
                              @click="editComments(item.id)">Edit</button>
                            <button
                              class="flex block gap-4 px-4 py-2 text-sm text-red-700 mdi mdi-delete-outline hover:bg-gray-100"
                              @click="deleteComment(item.id)">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ml-8">
                    <span
                      v-if="editComment === item.id"
                      class="text-sm font-light">
                      <InputTextField
                        :value="item.comment"
                        outlined
                        autofocus
                        @keypress.enter="sendEditComment($event.target.value, item.id)"/>
                      </span>
                    <span
                      v-else
                      class="text-sm font-light">{{ item.comment }}</span>
                  </div>
                  <div class="my-1 border-b border-border"></div>
                </div>
              </div>
              <div class="relative">
                <textarea 
                  v-model="newComment"
                  class="relative w-full p-4 mt-8 border rounded-xl" 
                  placeholder="Comment" 
                  @keypress.enter="sendComment()"/>
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
  id: any
  uid: string
  comment: string
  username?: string
  image?: string
}
interface ILike {
  uid: string
  status: any
}
const postData: Ref<any> = ref()
const newComment: Ref<any> = ref('')
const profile: Ref<any> = ref()
const props = defineProps<IProps>()
const form: Ref<any> = ref()

const loading = ref(true)
const comment: Ref<IComment[]> = ref([])
const step: Ref<any> = ref(1)
const myProfile: Ref<any> = ref()
const postCreate: Ref<boolean> = ref(false)
const like: Ref<ILike[]> = ref([])
const isDropdownOpen = ref(null)
const editComment = ref(null)

function openSetting (): void {
  step.value++
}
function handleCloseModal() {
    postCreate.value = false;
}
const toggleDropdown = (id: any): void => {
  isDropdownOpen.value = isDropdownOpen.value === id ? null : id
}
const editComments = (id: any): void => {
  editComment.value = editComment.value === id ? null : id
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
      await fetchComment()
      await fetchLike()
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

async function fetchProfileComment(comments: IComment[]): Promise<void> {
  try {
    const userUids = comments.map(c => c.uid)
    const { data, error } = await supabase
      .from('user')
      .select('uid, username, image')
      .in('uid', userUids)

    if (error) {
      console.error('Error fetching user data:', error)
    } else {
      const userMap = new Map(data.map(user => [user.uid, user]))
      comments.forEach(c => {
        const user = userMap.get(c.uid as never)
        if (user) {
          c.username = user.username
          c.image = user.image
        }
      })
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
async function fetchComment(): Promise<void> {
  try {
    const { data, error } = await supabase
        .from('comment')
        .select('*')
        .eq('postId', postData.value.id)
    if (error) {
        console.error(`Error fetching user data for UID ${comment}:`, error);
      } else {
        comment.value = data
        await fetchProfileComment(comment.value)
      }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}
async function sendEditComment(event: any, id: any): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('comment')
      .update({ 
        comment: event,
        uid: user.value.id,
        postId: postData.value.id
        } as never)
      .eq('id', id)
      .select()
    if (error) {
      console.error('Error updating post comments:', error)
    } else {
      editComment.value = null
      await fetchComment()
    }
  } catch (error) {
    console.error('Error saving new comment:', error)
  }
}
async function deleteComment(id: any): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('comment')
      .delete()
      .eq('id', id)
      .select()
    if (error) {
      console.error('Error updating post comments:', error)
    } else {
      await fetchComment()
    }
  } catch (error) {
    console.error('Error saving new comment:', error)
  }
}
async function sendComment(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('comment')
        .insert({ 
          comment: newComment.value,
          uid: user.value.id,
          postId: postData.value.id
         } as never)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        newComment.value = ''
        await fetchComment()
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    }
  }
// }
async function fetchLike(): Promise<void> {
  try {
    const { data, error } = await supabase
        .from('like')
        .select('status, uid')
        .eq('postId', postData.value.id)
    if (error) {
        console.error(`Error fetching user data for UID ${comment}:`, error);
      } else {
        like.value = data
      }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}
async function sendLike(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('like')
        .insert({ 
          status: true,
          uid: user.value.id,
          postId: postData.value.id
         } as never)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        await fetchLike()
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    }
}
async function deleteLike(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('like')
        .delete()
        .eq('uid', user.value.id)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        await fetchLike()
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    }
}
const isLiked = computed(() => {
  return like.value.some(like => like.uid === user.value?.id)
})
const toggleLike = async (): Promise<void> => {
  if (isLiked.value) {
    await deleteLike();
  } else {
    await sendLike();
  }
}
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