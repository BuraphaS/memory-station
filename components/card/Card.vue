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
          <div class="cursor-pointer">
            <span class="flex items-center px-2 py-1 space-x-1 text-xs font-medium text-gray-400 bg-gray-700 rounded-full h-min w-min hover:text-rose-600 hover:bg-rose-50">
              <p class="flex gap-2 text-sm font-semibold mdi mdi-heart">{{ props.form?.like }}</p>
            </span>
          </div>
          <div class="flex cursor-pointer">
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 text-gray-300 ms-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
          </div>
        </div>
        <div class="flex flex-col pb-4 border-b-2">
          <span class="mb-2 text-xl">{{ props.form?.topic }}</span>
          <span class="text-sm font-light">{{ props.form?.description }}</span>
        </div>
        <div
          v-for="(item, index) in comment.slice(0,3)"
          :key="index"
          class="flex items-center gap-2 py-2 pb-4 border-b">
          <img 
            :src="item.image" 
            alt="pic"
            class="rounded-full w-[35px] h-[35px] bg-auto object-cover">
            <div class="flex flex-col">
              <span class="text-sm font-medium">{{ item.username }}</span>
              <span class="text-sm font-light">{{ item.comment }}</span>
            </div>
          </div>
          <div v-if="props.form?.comment?.length > 2"
            class="py-5 font-semibold border-b cursor-pointer"
            @click="openComment(props.form.id)">
            {{`View all ${props.form?.comment?.length} Comments`}}
          </div>
          <div class="relative">
            <textarea
              class="relative w-full p-2 mt-8 border rounded-xl"
              v-model="newComment" 
              placeholder="Comment" />
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
interface IProfile {
  username: string
  image: string
}
const props = defineProps<IProps>()
const postId: Ref<any> = ref()
const comment: Ref<any> = ref([])
const profileData: Ref<any> = ref()
const myProfile: Ref<any> = ref()
const images: Ref<any> = ref(props.form.image)
const loading = ref(true)
const newComment: Ref<any> = ref('')
  
function openComment (id: any): void {
  postId.value = id
  postCreate.value = true
  console.log(id);
}
async function sendComment(): Promise<void> {
  if (newComment.value.trim()) {
    const commentData: IComment = {
      uid: user.value.id,
      comment: newComment.value.trim(),
    }
    comment.value.push(
      {
      uid: user.value.id,
      comment: newComment.value.trim(),
      username: myProfile.value.username,
      image: myProfile.value.image,
      }
    )
      props.form.comment.push(commentData)
    try {
      const { data, error } = await supabase
        .from('post')
        .update({ comment: props.form.comment }as never)
        .eq('id', props.form.id)
      if (error) {
        console.error('Error updating post comments:', error)
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    }
  }
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
async function fetchProfileComment(): Promise<void> {
  try {
    const commentPromises = props.form.comment.map(async (comment) => {
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

const postCreate: Ref<boolean> = ref(false)

function handleCloseModal() {
  postCreate.value = false;
}

onMounted(() => {
  fetchProfileComment()
  fetchProfile()
  fetchMyProfile()
})
</script>

<style scoped lang="scss">
.img-post{
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>