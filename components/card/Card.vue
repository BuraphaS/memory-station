<template>
  <div class="shadow rounded-xl w-[590px] h-full p-4 bg-white">
    <div 
      class="flex items-center gap-4 p-2 border-b-2 border-slate-400">
      <img 
        :src="profileData?.image" 
        alt="pic"
        class="rounded-full w-[55px] h-[55px] bg-auto object-cover">
        <span class="text-xl">{{ profileData?.username }}</span>
    </div>
    <div class="flex flex-col p-4 ">
        <SwiperImage :images="images"/>
        <div class="flex justify-between py-2">
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
            :id="props.form.id"/>
        </div>
        <div class="flex flex-col pb-4 border-b">
          <div class="text-xl">{{ props.form?.topic }}</div>
          <div class="text-sm">
            <StarRating 
              :isAverage="true"
              :value="rating" 
              :id="props.form.id"/>
            <span>{{ `(${rating || 0})` }}</span>
          </div>
          <span class="text-sm font-light">{{ props.form?.description }}</span>
        </div>
        <div
          v-for="(item) in comment.slice(0,2)"
          :key="item.id"
          class="flex items-center gap-2 py-2 pb-4 border-b border-border">
          <img 
          :src="item.image" 
          alt="pic"
          class="rounded-full w-[35px] h-[35px] bg-auto object-cover">
          <div class="flex flex-col w-full">
              <div class="flex items-center justify-between">  
                <div class="text-sm font-medium">{{ item.username }}</div>
                <div
                  v-if="item.uid === user.id || props.form.uid === user.id"
                  class="relative flex items-center text-xl cursor-pointer mdi mdi-settings-helper"
                  @click="toggleDropdown(item.id)">
                  <div 
                    v-if="isDropdownOpen === item.id"
                    class="absolute left-0 z-10 w-32 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          </div>
          <div v-if="comment?.length > 2"
            class="py-5 font-semibold border-b cursor-pointer"
            @click="openComment(props.form.id)">
            {{`View all ${comment?.length} Comments`}}
          </div>
          <div class="relative">
            <textarea
              class="relative w-full p-2 mt-8 border rounded-xl"
              v-model="newComment" 
              placeholder="Comment"
              @keypress.enter="sendComment()" />
            <span class="absolute text-2xl -rotate-45 cursor-pointer top-12 right-3 mdi mdi-send"
              @click="sendComment()"></span>
          </div>
        </div>
    <ModalComment
      :modal="postCreate"
      :id="props.form.id"
      @close-modal="handleCloseModal()"/>
  </div>
</template>

<script setup lang="ts">

const supabase = useSupabaseClient()
const user:any = useSupabaseUser()

interface IProps {
  form: IForm
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
interface ILike {
  uid: string
  status: any
}
const props = defineProps<IProps>()
const postCreate: Ref<boolean> = ref(false)
const postId: Ref<any> = ref()
const comment: Ref<any> = ref([])
const editNewComment: Ref<any> = ref('')
const profileData: Ref<any> = ref()
const myProfile: Ref<any> = ref()
const images: Ref<any> = ref(props.form.image)
const loading = ref(true)
const newComment: Ref<any> = ref('')
const like: Ref<ILike[]> = ref([])
const rating: Ref<any> = ref(0)
const isDropdownOpen = ref(null)
const editComment = ref(null)
  
function openComment (id: any): void {
  postId.value = id
  postCreate.value = true
  console.log(id);
}

const toggleDropdown = (id: any): void => {
  isDropdownOpen.value = isDropdownOpen.value === id ? null : id
}
const editComments = (id: any): void => {
  editComment.value = editComment.value === id ? null : id
}
async function fetchMyProfile(): Promise<void> {
  try {
      const { data, error } = await supabase
        .from('user')
        .select('username, image')
        .eq('uid', user.value.id)
        .single();

      if (error) {
        console.error(`Error fetching user data:`, error);
      } else {
        myProfile.value = data
      }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}
async function fetchProfile(): Promise<void> {
  try {
      const { data, error } = await supabase
        .from('user')
        .select('username, image')
        .eq('uid', props.form.uid)
        .single();

      if (error) {
        console.error(`Error fetching user data:`, error);
      } else {
        profileData.value = data
      }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
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
        .eq('postId', props.form.id)
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

async function sendComment(): Promise<void> {
  if (newComment.value.trim()) {
    comment.value.push(
      {
      uid: user.value.id,
      comment: newComment.value.trim(),
      username: myProfile.value.username,
      image: myProfile.value.image,
      }
    )

    try {
      const { data, error } = await supabase
        .from('comment')
        .insert({ 
          comment: newComment.value,
          uid: user.value.id,
          postId: props.form.id
         } as never)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        newComment.value = ''
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    }
  }
}
async function sendEditComment(event: any, id: any): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('comment')
      .update({ 
        comment: event,
        uid: user.value.id,
        postId: props.form.id
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
async function fetchLike(): Promise<void> {
  try {
    const { data, error } = await supabase
        .from('like')
        .select('status, uid')
        .eq('postId', props.form.id)
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
          postId: props.form.id
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
const fetchRating = async () => {
  try {
    const { data, error } = await supabase
      .from('rating')
      .select('*')
      .eq('postId', props.form.id)
    if (error && error.details.includes('row')) {
      console.log('No existing rating found, ready to send new rating.');
    } else if (data) {
      const sum = data.reduce((total, current: any) => total + current.rating, 0);
      rating.value = sum / data.length;
    } else {
      console.error('Error fetching rating:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
function handleCloseModal() {
  postCreate.value = false;
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
onMounted(() => {
  fetchComment()
  fetchProfile()
  fetchMyProfile()
  fetchLike()
  fetchRating()
})
</script>

<style scoped lang="scss">
.img-post{
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>