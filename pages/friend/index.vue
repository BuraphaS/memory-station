<template>
  <div class="flex flex-col justify-center items-center mt-4 mx-auto w-[500px]">
    <div class="w-[600px] border-2 rounded-lg mt-12">
      <ul 
        id="default-tab" 
        data-tabs-toggle="#default-tab-content" 
        role="tablist"
        class="hidden text-sm font-medium text-center text-gray-500 bg-white rounded-lg sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li 
            class="w-full focus-within:z-10"
            role="presentation">
              <button 
                id="friends-tab"
                data-tabs-target="#friends"
                type="button" 
                role="tab" 
                aria-controls="friends" 
                aria-selected="false"
                :class="activeTab === 'friends' ? `mdi mdi-account-group-outline items-center flex justify-center gap-4 text-sm inline-block w-full p-4 text-white bg-primary rounded-s-lg`
                : `mdi mdi-account-group-outline items-center flex justify-center gap-4 text-sm inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white`" 
                @click="activeTab = 'friends'">
                Friends
              </button>
          </li>
          <li 
            class="w-full focus-within:z-10"
            role="presentation">
              <button 
                id="search-tab"
                data-tabs-target="#search"
                type="button" 
                role="tab" 
                aria-controls="search" 
                aria-selected="false"
                :class="activeTab === 'search' ? `mdi mdi-magnify items-center flex justify-center gap-4 text-sm inline-block w-full p-4 text-white bg-primary ` 
                : `mdi mdi-magnify items-center flex justify-center gap-4 text-sm inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-white`" 
                @click="activeTab = 'search'">
                Search
              </button>
          </li>
          <li
            class="w-full focus-within:z-10"
            role="presentation">
              <button
                id="request-tab"
                data-tabs-target="#request"
                type="button" 
                role="tab" 
                aria-controls="request" 
                aria-selected="false"
                :class="activeTab === 'request' ? `mdi mdi-account-clock-outline items-center flex justify-center gap-4 text-sm text-white inline-block w-full p-4 bg-primary rounded-e-lg hover:text-gray-700 hover:bg-gray-50`
                : `mdi mdi-account-clock-outline items-center flex justify-center gap-4 text-sm inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50`"
                @click="activeTab = 'request'">
                Friend Requests
              </button>
          </li>
      </ul>
    </div>
    <div 
      id="default-tab-content" 
      class="w-[1000px] flex justify-center items-center">
      <div 
        v-if="activeTab === 'friends'" 
        class="flex grid items-center justify-center grid-cols-2 rounded-lg bg-gray-50 dark:bg-gray-800" 
        id="friends" 
        role="tabpanel"
        aria-labelledby="profile-tab">
          <NuxtLink
            v-for="(item, index) in friend"
            :key="index"
            :to="{
              path: item?.uid
                ? `/profile/${item?.uid}`
                : '/'
            }"
            class="w-[450px] bg-white h-[100px] rounded-xl flex justify-between p-4 m-8 hover:bg-[#D9D9D9] cursor-pointer drop-shadow-md">
            <div class="flex items-center gap-4">
              <img
                :src="item.image"
                alt=""
                class="profile-img ">
                <span class="text-lg">{{ item.username }}</span>
            </div>
            <div class="flex items-center">
              <button
                class="h-[40px] z-30 p-1 rounded shadow bg-error text-white text-sm "
                @click="deleteFriend(item.uid)">
                Unfriend
              </button>
            </div>
          </NuxtLink>
        </div>
      <div v-if="activeTab === 'search'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="search" role="tabpanel" aria-labelledby="dashboard-tab">
          <!-- <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the LOVE tab.</p> -->
          <form class="w-[500px] mx-auto" @submit.prevent="onSearch">   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                  <input 
                    type="search" 
                    id="default-search" 
                    v-model="search"
                    class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search" 
                    required />
                  <button 
                    type="submit" 
                    class="text-white absolute end-2.5 bottom-2.5 bg-[#1E1E1E] hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-2 
                    py-1 dark:bg-[#1E1E1E] dark:hover:bg-[#1E1E1E] dark:focus:ring-[#1E1E1E] mdi mdi-magnify">
                  </button>
              </div>
          </form>
          <div v-if="searchResults.length" class="grid grid-cols-2 gap-4 mt-4">
            <NuxtLink
              v-for="(userData, index) in searchResults"
              :key="index"
              :to="`/profile/${userData.uid}`"
              class="w-[450px] bg-white h-[100px] rounded-xl flex justify-between p-4 m-8 hover:bg-[#D9D9D9] cursor-pointer drop-shadow-md">
              <div class="flex items-center gap-4">
                <img
                  :src="userData.image"
                  alt=""
                  class="profile-img ">
                <span class="text-lg">{{ userData.username }}</span>
              </div>
              <div class="flex items-center">
                <!-- <button class="h-[40px] z-30 p-1 rounded shadow bg-primary text-white text-sm ">
                  Add Friend
                </button> -->
              </div>
            </NuxtLink>
          </div>
      </div>
      <div
        v-if="activeTab === 'request'"
        class="flex grid items-center justify-center grid-cols-2 rounded-lg bg-gray-50 dark:bg-gray-800" 
        id="request" 
        role="tabpanel" 
        aria-labelledby="dashboard-tab">
        <NuxtLink
            v-for="(item, index) in friendRequest"
            :key="index"
            :to="{
              path: item?.uid
                ? `/profile/${item?.uid}`
                : '/'
            }"
            class="w-[450px] bg-white h-[100px] rounded-xl flex justify-between p-2 m-8 hover:bg-[#D9D9D9] cursor-pointer drop-shadow-md">
            <div class="flex items-center gap-4">
              <img
                :src="item.image"
                alt=""
                class="profile-img ">
                <span class="text-lg">{{ item.username }}</span>
            </div>
            <div class="z-10 flex items-center">
              <button 
                class="h-[40px] p-1 rounded shadow bg-success text-white text-sm "
                @click="acceptFriend(item.uid)">
                Accept Friend
              </button>
            </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
const supabase = useSupabaseClient()
const user: any = useSupabaseUser()

const activeTab: Ref<any> = ref('friends');
const search = ref('')
const users = ref()
const searchResults: Ref<any> = ref([])
const friendRequest: Ref<any> = ref([])
const friend: Ref<any> = ref([])
const loading: Ref<boolean> = ref(false)
  
async function fetchProfileComment(info: any): Promise<void> {
  try {
    const userUids = info.map((c: { uid: any; }) => c.uid).filter((uid: any) => uid !== user.value.id)
    const friendUids = info.map((f: { frienduid: any; }) => f.frienduid).filter((frienduid: any) => frienduid !== user.value.id)
    
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('uid, username, image')
      .in('uid', userUids)

    const { data: friendData, error: friendError } = await supabase
      .from('user')
      .select('uid, username, image')
      .in('uid', friendUids)

    if (userError) {
      console.error('Error fetching user data:', userError)
    }

    if (friendError) {
      console.error('Error fetching friend data:', friendError)
    }

    if (userData && friendData) {
      const userMap = new Map(userData.map(user => [user.uid, user]))
      const friendMap = new Map(friendData.map(user => [user.uid, user]))
      
      info.forEach((c: { uid: any; username: any; image: any; }) => {
        const user = userMap.get(c.uid as never)
        if (user) {
          c.username = user.username
          c.image = user.image
          c.uid = user.uid
        }
      })
      
      info.forEach((f: { frienduid: any; username: any; image: any; uid: any; }) => {
        const user = friendMap.get(f.frienduid as never)
        if (user) {
          f.username = user.username
          f.image = user.image
          f.uid = user.uid
        }
      })
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
async function fetchFriend (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('friend')
      .select(`*`)
      .or(`frienduid.eq.${user.value.id},uid.eq.${user.value.id}`)
      .eq('status', 'FRIEND')
    if (error) {
      console.log(error); 
    } else {
      friend.value = data
      await fetchProfileComment(friend.value)
    }
  } catch (error) {
    console.log(error); 
  }
}
async function fetchFriendRequest (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('friend')
      .select(`*`)
      .eq('frienduid', user.value.id)
      .eq('status', 'WAITING')
      .select()
    if (error) {
      console.log(error); 
    } else {
      friendRequest.value = data
      await fetchProfileComment(friendRequest.value)
    }
  } catch (error) {
    console.log(error); 
  }
}
async function fetchUser (uid: any): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`*`)
      .eq('uid', uid)
      .single()
    if (error) {
      console.log(error); 
    } else {
      users.value = data
    }
  } catch (error) {
    console.log(error)
  }
}
async function onSearch (): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`uid, username, image`)
      .ilike('username', `%${search.value}%`)

    if (error) {
      console.log(error);
    } else {
      searchResults.value = data;
    }
  } catch (error) {
    console.log(error);
  }
}
async function acceptFriend(uid: any): Promise<void> {
  loading.value = true
    try {
      const { data, error } = await supabase
        .from('friend')
        .update({ 
          status: 'FRIEND'
         } as never)
        .eq('uid', uid)
        .eq('frienduid', user.value.id)
        .select()
      if (error) {
        console.error('Error updating post comments:', error)
      } else {
        await fetchFriendRequest()
      }
    } catch (error) {
      console.error('Error saving new comment:', error)
    } finally {
    loading.value = false
    }
}
async function deleteFriend(uid: any): Promise<void> {
  loading.value = true
    try {
      const { data, error } = await supabase
        .from('friend')
        .delete()
        .eq('uid', uid)
        .eq('frienduid', user.value.id)
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
onMounted(()=>{
  fetchFriendRequest()
  fetchFriend()
})
</script>

<style scoped lang="scss">
.profile-img {
  width: 75px;
  height: 75px;
  border-radius: 100%;
  object-fit: cover;
}
</style>