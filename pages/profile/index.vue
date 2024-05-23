<template>
  <div class="flex flex-col items-center justify-center w-full h-full p-8 mx-auto bg-white">
    <div class="flex grid items-center grid-cols-3">
      <div class="flex items-center justify-center">
        <img
          :src="!profile?.image ? '/svg/account-icon-account.svg' : profile?.image"
          alt="profile"
          class="object-cover profile-img">
      </div>
      <div class="flex flex-col w-full">
        <span class="text-2xl">{{ profile?.username }}</span>
        <span>{{ profile?.description }}</span>
      </div>
      <div class="flex justify-center w-full gap-4">
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

const supabase = useSupabaseClient()
const user: Ref<any> = useSupabaseUser()
  
const profile: Ref<any> = ref()
const postData: Ref<any> = ref([])

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
      postData.value = data
    }
  } catch (error) {
    console.log(error); 
  }
}

const router = useRouter()
const activeTab = ref('post');

function editProfile (): void {
  router.push({ path: `/setting/${user.value.id}` })
}
function changePassword (): void {
  router.push({ path: `/setting/change-password/${user.value.id}` })
}
const postComment: Ref<boolean> = ref(false)
const postId: Ref<any> = ref()

function openComment (id: any): void {
  postId.value = id
  postComment.value = true
  console.log(id);
  
}
function handleCloseModal() {
  postComment.value = false;
  postId.value = null;
}
const images = ref<string[]>([]);
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
</style>