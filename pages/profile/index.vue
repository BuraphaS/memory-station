<template>
  <div class="flex flex-col items-center justify-center w-full h-full p-4 mx-auto bg-white md:p-8">
    <div class="flex grid items-center grid-cols-3">
      <div class="flex items-center justify-center">
        <img
          :src="!profile?.image ? '/svg/account-icon-account.svg' : profile?.image"
          alt="profile"
          class="object-cover profile-img">
      </div>
      <div class="flex flex-col w-full">
        <span class="md:text-2xl">{{ profile?.username }}</span>
        <span class="text-sm">{{ profile?.description }}</span>
      </div>
      <div class="items-center justify-center w-full gap-4 m-auto md:flex">
        <button 
          type="button"
          class="shadow justify-center flex m-auto py-1 px-2 rounded md:w-[130px] h-full text-sm bg-[#D9D9D9] hover:bg-[#000000] hover:text-white"
          @click="editProfile()">
          Edit profile
        </button>
        <button 
          type="button"
          class="shadow py-1 px-2 rounded flex m-auto md:w-[130px] w-[90px] bg-[#F8A221] text-sm text-white hover:bg-[#F5BD2C] hover:text-white"
          @click="changePassword()">
          Change Password
        </button>
      </div>
    </div>
    <div class="flex gap-12 mt-8 md:gap-20">
      <div
        class="text-xl font-semibold">
        {{ !postData ? '0' : postData.length }}
        <span class="text-lg font-normal"> Posts</span>
      </div>
      <div class="text-xl font-semibold">
        {{ !profile?.love ? '0' : profile?.love }}
        <span class="text-lg font-normal"> Love</span>
      </div>
      <div class="text-xl font-semibold">
        {{ !profile?.friend ? '0' : profile?.firend }}
        <span class="text-lg font-normal"> Friends</span>
      </div>
    </div>
    <div 
      :class="activeTab == 'post' ? 'w-full md:w-[700px] border-y-2 rounded-l-lg mt-12' : 'w-full md:w-[700px] border-y-2 rounded-r-lg mt-12'">
      <ul 
        id="default-tab" 
        data-tabs-toggle="#default-tab-content" 
        role="tablist"
        class="flex text-sm font-medium text-center text-gray-500 rounded-lg dark:divide-gray-700 dark:text-gray-400">
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
            <!-- <div
              v-for="(item, index) in [...profile.postDetail]"
              :key="index">
              <img 
                :src="item.img" 
                alt="item"
                class="cursor-pointer post-img">
                <div class="flex justify-between">
                  <div class="text-sm mdi mdi-heart">
                    50
                  </div>
                  <div class="flex">
                    <div class="text-sm mdi mdi-star"></div>
                    <div class="text-sm mdi mdi-star"></div>
                    <div class="text-sm mdi mdi-star"></div>
                    <div class="text-sm mdi mdi-star"></div>
                    <div class="text-sm mdi mdi-star"></div>
                  </div>
                </div>
            </div> -->
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
import { useRouter } from 'nuxt/app';

const router = useRouter()
const supabase = useSupabaseClient()
const user: Ref<any> = useSupabaseUser()
  
const profile: Ref<any> = ref()
const postData: Ref<any> = ref([])
const activeTab = ref('post');
const postComment: Ref<boolean> = ref(false)
const postId: Ref<any> = ref()
const images = ref<string[]>([])
const rating: Ref<number> = ref(0)

async function fetchProfile (): Promise<void> {
  try {
    const { data,error } = await supabase
      .from('user')
      .select(`*`)
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
async function fetchPost (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('post')
      .select(`*`)
      .eq('uid', user.value.id)
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
function editProfile (): void {
  router.push({ path: `/setting/${user.value.id}` })
}
function changePassword (): void {
  router.push({ path: `/setting/change-password/${user.value.id}` })
}

function openComment (id: any): void {
  postId.value = id
  postComment.value = true
}
function handleCloseModal() {
  postComment.value = false;
  postId.value = null;
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
@media only screen and (max-width: 600px) {
  .profile-img{
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }
  .post-img{
    width: 250px;
    height: 120px;
    object-fit: cover;
  }
}
</style>