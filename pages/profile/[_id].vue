<template>
  <div class="flex flex-col items-center justify-center w-full h-full p-8 mx-auto bg-white">
    <div class="flex items-center gap-28">
      <img
        :src="!profile?.image ? '/svg/account-icon-account.svg' : profile?.image"
        alt="profile"
        class="object-cover profile-img">
      <div class="flex flex-col w-full">
        <span class="text-2xl">{{ profile?.username }}</span>
        <span>{{ profile?.description }}</span>
      </div>
      <div v-if="profile?.uid !== user.id">
        <button
          type="button"
          :class="switchButton(status?.status)"
          @click="toggleFriend">
          {{ switchFriend(status?.status) }}
        </button>
      </div>
      <div
        v-if="profile?.uid === user.id"
        class="flex justify-center w-full gap-4">
        <button 
          type="button"
          class="shadow py-1 px-2 rounded w-[130px] h-full bg-[#D9D9D9] hover:bg-[#000000] hover:text-white"
          @click="editProfile()">
          Edit profile
        </button>
        <button 
          type="button"
          class="shadow py-1 px-2 rounded w-[130px] bg-[#F8A221] text-white hover:bg-[#F5BD2C] hover:text-white"
          @click="changePassword()">
          Change Password
        </button>
      </div>
    </div>
    <div class="flex gap-20 mt-8">
      <div
        class="text-xl font-semibold">
        {{ !postData ? '0' : postData?.length }}
        <span class="text-lg font-normal"> Posts</span>
      </div>
      <div class="text-xl font-semibold">
        {{ !lovePostData ? '0' : lovePostData?.length }}
        <span class="text-lg font-normal"> Love</span>
      </div>
      <div class="text-xl font-semibold">
        {{ !friend ? '0' : friend?.length }}
        <span class="text-lg font-normal"> Friends</span>
      </div>
    </div>
    <div 
      :class="activeTab == 'post' ? 'w-[800px] border-y-2 rounded-l-lg mt-12' : 'w-[800px] border-y-2 rounded-r-lg mt-12'">
      <ul 
        id="default-tab" 
        data-tabs-toggle="#default-tab-content" 
        role="tablist"
        class="hidden text-sm font-medium text-center text-gray-500 rounded-lg sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li 
            class="w-full focus-within:z-10"
            role="presentation">
              <button 
                id="post-tab"
                data-tabs-target="#post"
                type="button" 
                role="tab" 
                aria-controls="post" 
                aria-selected="false"
                :class=" activeTab == 'post' ? 'inline-block w-full p-4 text-white bg-primary dark:border-gray-700 rounded-s-lg' :
                'inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white'" 
                @click="activeTab = 'post'">
                POST
              </button>
          </li>
          <li
            class="w-full focus-within:z-10"
            role="presentation">
              <button
                id="love-tab"
                data-tabs-target="#love"
                type="button" 
                role="tab" 
                aria-controls="post" 
                aria-selected="false"
                :class=" activeTab == 'love' ? 'inline-block w-full p-4 text-white bg-primary dark:border-gray-700 rounded-e-lg'
                : 'inline-block w-full p-4 bg-white border-s-0 border-gray-200 rounded-e-lg hover:text-gray-700 hover:bg-gray-50'"
                @click="activeTab = 'love'">
                LOVE
              </button>
          </li>
      </ul>
    </div>
    <div id="default-tab-content">
      <div v-if="activeTab === 'post'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="post" role="tabpanel" aria-labelledby="profile-tab">
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(item, index) in postData"
              :key="index"
              @click="openComment(item.id)">
              <img 
                :src="item.image[0]"
                alt="item"
                class="cursor-pointer post-img">
                <div class="flex justify-between">
                  <div class="text-sm mdi mdi-heart">
                    <span>{{ item.likes.length }}</span>
                  </div>
                  <StarRating 
                    :isAverage="true"
                    :value="item.ratings" 
                    :id="item.id"/>
                </div>
            </div>
          </div>
      </div>
      <div v-if="activeTab === 'love'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="love" role="tabpanel" aria-labelledby="dashboard-tab">
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(item, index) in lovePostData"
              :key="index"
              @click="openComment(item.id)">
              <img 
                :src="item.image[0]"
                alt="item"
                class="cursor-pointer post-img">
                <div class="flex justify-between">
                  <div class="text-sm mdi mdi-heart">
                    <span>{{ item.likes.length }}</span>
                  </div>
                  <StarRating 
                    :isAverage="true"
                    :value="item.ratings" 
                    :id="item.id"/>
                </div>
            </div>
          </div>
      </div>
    </div>
    <ModalComment
      v-if="postComment"
      :modal="postComment"
      :id="postId"
      @close-modal="handleCloseModal()"/>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'

interface ILike {
  uid: string
  status: any
}
const supabase = useSupabaseClient()
const user: Ref<any> = useSupabaseUser()
const router = useRouter()
const route = useRoute()
  
const loading = ref(true)
const loveData: Ref<any> = ref([])
const lovePostData: Ref<any> = ref([])

const profile: Ref<any> = ref()
const postData: Ref<any> = ref([])
const activeTab = ref('post');
const images = ref<string[]>([])
const postComment: Ref<boolean> = ref(false)
const postId: Ref<any> = ref()
const like: Ref<ILike[]> = ref([])
const status: Ref<any> = ref()
const friend: Ref<any> = ref()
const rating: Ref<number> = ref(0)

async function fetchProfile (): Promise<void> {
  try {
    const { data,error } = await supabase
      .from('user')
      .select(`*`)
      .eq('uid', route.params._id)
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
      .eq('uid', route.params._id)
    if (error) {
      console.log(error); 
    } else {
      postData.value = data;
      for (const post of postData.value) {
        const likes = await fetchLike(post.id);
        const ratings = await fetchRating(post.id);
        post.likes = likes;
        post.ratings = ratings;
      }
    }
  } catch (error) {
    console.log(error); 
  }
}

const fetchRating = async (id: any) => {
  try {
    const { data, error } = await supabase
      .from('rating')
      .select('*')
      .eq('postId', id)
    if (error && error.details.includes('row')) {
      console.log('No existing rating found, ready to send new rating.');
    } else if (data) {
      const sum = data.reduce((total, current: any) => total + current.rating, 0);
      rating.value = sum / data.length;
      return rating.value;
    } else {
      console.error('Error fetching rating:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
async function fetchLike(id: any): Promise<any> {
  try {
    const { data, error } = await supabase
        .from('like')
        .select('*')
        .eq('postId', id)
    if (error) {
        console.error(`Error fetching user data for UID :`, error);
      } else {
        return data;
      }
  } catch (error) {
    console.error('Error:', error);
  } finally {
  }
}
async function fetchLovePost (postId: number[]): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('post')
      .select(`*`)
      .in('id', postId)
    if (error) {
      console.log(error); 
    } else {
      lovePostData.value = data;

      const postsWithLikesAndRatings = await Promise.all(
        lovePostData.value.map(async (post: any) => {
          const [likes, ratings] = await Promise.all([
            fetchLike(post.id),
            fetchRating(post.id),
          ]);
          return { ...post, likes, ratings };
      })
      )
      lovePostData.value = postsWithLikesAndRatings;
    }
  } catch (error) {
    console.log(error); 
  }
}
async function fetchLove (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('like')
      .select(`postId`)
      .eq('uid', user.value.id)
    if (error) {
      console.log(error); 
    } else {
      loveData.value = data
      const postIds = data.map((item: any) => item.postId);
      await fetchLovePost(postIds)
    }
  } catch (error) {
    console.log(error); 
  }
}
function openComment (id: any): void {
  postId.value = id
  postComment.value = true
}
function handleCloseModal() {
  postComment.value = false;
  postId.value = null;
}
function editProfile (): void {
  router.push({ path: `/setting/${user.value.id}` })
}
function changePassword (): void {
  router.push({ path: `/setting/change-password/${user.value.id}` })
}
async function fetchFriend(): Promise<void> {
  try {
    const { data, error } = await supabase
        .from('friend')
        .select('*')
    if (error) {
        console.error(`Error fetching user data for UID ${status}:`, error);
        return
      } else {
        friend.value = data
        await fetchFilterFriend()
      }
  } catch (error) {
    console.error('Error:', error);
  }
}
async function fetchFilterFriend(): Promise<void> {
  try {
    const { data: friendRequest, error: requestError } = await supabase
      .from('friend')
      .select('*')
      .or(`uid.eq.${route.params._id},frienduid.eq.${route.params._id}`)
      .single<{ uid: string; frienduid: string }>()
    if (requestError) {
      console.error('Error fetching friend request:', requestError)
      return
    } else if (friendRequest) {
      if (friendRequest.uid === user.value.id && friendRequest.frienduid === route.params._id) {
        status.value = friendRequest
      } else if (friendRequest.uid === route.params._id && friendRequest.frienduid === user.value.id) {
        status.value = friendRequest
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
async function sendFriend(): Promise<void> {
  loading.value = true
    try {
      const { data, error } = await supabase
        .from('friend')
        .insert({ 
          status: 'WAITING',
          uid: user.value.id,
          frienduid: route.params._id
         } as never)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        await fetchFriend()
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    } finally {
      loading.value = false
    }
}
async function acceptFriend(): Promise<void> {
  loading.value = true
    try {
      const { data, error } = await supabase
        .from('friend')
        .update({ 
          status: 'FRIEND'
         } as never)
        .eq('id', status.value.id)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        await fetchFriend()
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    } finally {
      loading.value = false
    }
}
async function deleteFriend(): Promise<void> {
  loading.value = true
    try {
      const { data, error } = await supabase
        .from('friend')
        .delete()
        .eq('uid', user.value.id)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        await fetchFriend()
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    } finally {
      loading.value = false
    }
}
const toggleFriend = async (): Promise<void> => {
  if (!status.value) {
    await sendFriend()
  } else if (status.value.status === 'WAITING' && profile?.value.uid !== user.value.id) {
    await deleteFriend()
  } else if (status.value.status === 'FRIEND' && profile?.value.uid !== user.value.id) {
    await deleteFriend()
  } else if (status.value.status === 'WAITING' && profile?.value.uid === user.value.id) {
    await acceptFriend()
  } else {
    await sendFriend()
  }
}
function switchFriend (value: string): any {
  switch (value) {
    case 'FRIEND':
      return 'Unfriend'
    case 'WAITING':
      return profile?.value.uid !== user.value.id && status.value.frienduid !== user.value.id ? 'Send Request' : 'Accept Friend'
    default:
      return 'Add Friend'
  }
}
function switchButton (value: string): any {
  switch (value) {
    case 'FRIEND':
      return 'shadow py-1 px-2 rounded w-[150px] bg-error text-white hover:bg-[#000000] hover:text-white'
    case 'WAITING':
      return profile?.value.uid !== user.value.id && status.value.frienduid !== user.value.id ? 'shadow py-1 px-2 rounded w-[150px] bg-[#FFA500] text-white hover:bg-error hover:text-white' : 'shadow py-1 px-2 rounded w-[150px] bg-success text-white hover:bg-[#000000] hover:text-white'
    default:
      return 'shadow py-1 px-2 rounded w-[150px] bg-primary text-white hover:bg-[#FFA500] hover:text-white'
  }
}
onMounted(() => {
  if (postData.value.image) {
    try {
      images.value = JSON.parse(postData.value.image);
    } catch (error) {
      console.log('Error parsing image JSON:', error);
    }
  }
  fetchPost()
  fetchProfile()
  fetchFriend()
  fetchLove()
})
</script>

<style scoped lang="scss">
.profile-img{
  width: 150px;
  height: 150px;
  border-radius: 100%;
}
.post-img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}
</style>