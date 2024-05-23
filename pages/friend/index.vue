<template>
  <div class="flex flex-col justify-center items-center mt-4 mx-auto w-[900px]">
    <div class="w-[800px] border-2 rounded-lg mt-12">
      <ul 
        id="default-tab" 
        data-tabs-toggle="#default-tab-content" 
        role="tablist"
        class="hidden text-sm font-medium text-center text-gray-500 rounded-lg sm:flex bg-white dark:divide-gray-700 dark:text-gray-400">
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
                :class="activeTab === 'friends' ? `mdi mdi-account-group-outline items-center flex justify-center gap-4 text-xl inline-block w-full p-4 text-white bg-primary rounded-s-lg`
                : `mdi mdi-account-group-outline items-center flex justify-center gap-4 text-xl inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white`" 
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
                :class="activeTab === 'search' ? `mdi mdi-magnify items-center flex justify-center gap-4 text-xl inline-block w-full p-4 text-white bg-primary ` 
                : `mdi mdi-magnify items-center flex justify-center gap-4 text-xl inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-white`" 
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
                :class="activeTab === 'request' ? `mdi mdi-account-clock-outline items-center flex justify-center gap-4 text-xl text-white inline-block w-full p-4 bg-primary rounded-e-lg hover:text-gray-700 hover:bg-gray-50`
                : `mdi mdi-account-clock-outline items-center flex justify-center gap-4 text-xl inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50`"
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
        class="grid grid-cols-2 flex justify-center items-center rounded-lg bg-gray-50 dark:bg-gray-800" 
        id="friends" 
        role="tabpanel"
        aria-labelledby="profile-tab">
          <NuxtLink
            v-for="(item, index) in [...friend, ...friend]"
            :key="index"
            :to="{
              path: item?.id
                ? `/friend/${item?.id}`
                : '/'
            }"
            class="w-[450px] bg-white h-[100px] rounded-xl flex justify-between p-4 m-8 hover:bg-[#D9D9D9] cursor-pointer drop-shadow-md">
            <div class="flex gap-4 items-center">
              <img
                :src="item.img"
                alt=""
                class="profile-img ">
                <span class="text-lg">{{ item.name }}</span>
            </div>
            <div class="flex items-center">
              <button class="h-[40px] z-30 p-1 rounded shadow bg-error text-white text-sm ">
                Unfriend
              </button>
            </div>
          </NuxtLink>
        </div>
      <div v-if="activeTab === 'search'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="search" role="tabpanel" aria-labelledby="dashboard-tab">
          <!-- <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the LOVE tab.</p> -->
          <form class="w-[500px] mx-auto">   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                  <input type="search" id="default-search" class="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                  <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-[#1E1E1E] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-2 py-1 dark:bg-[#1E1E1E] dark:hover:bg-[#1E1E1E] dark:focus:ring-[#1E1E1E] mdi mdi-magnify">
                  </button>
              </div>
          </form>
      </div>
      <div
        v-if="activeTab === 'request'" 
        :to="{
          path: request?.id
            ? `/friend/${request?.id}`
            : '/'
        }"
        class="grid grid-cols-2 flex justify-center items-center rounded-lg bg-gray-50 dark:bg-gray-800" 
        id="request" 
        role="tabpanel" 
        aria-labelledby="dashboard-tab">
        <NuxtLink
            v-for="(item, index) in [...request, ...request]"
            :key="index"
            :to="{
              path: item?.id
                ? `/friend/${item?.id}`
                : '/'
            }"
            class="w-[450px] bg-white h-[100px] rounded-xl flex justify-between p-2 m-8 hover:bg-[#D9D9D9] cursor-pointer drop-shadow-md">
            <div class="flex gap-4 items-center">
              <img
                :src="item.img"
                alt=""
                class="profile-img ">
                <span class="text-lg">{{ item.name }}</span>
            </div>
            <div class="flex items-center">
              <button class="h-[40px] p-1 rounded shadow bg-success text-white text-sm ">
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

const activeTab: Ref<any> = ref('friends');

const friend: Ref<any> = ref([
  {
    id: 1,
    name: 'Thanaphoom',
    img: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
  },
  {
    id: 2,
    name: 'Ten Hag',
    img: 'https://static.independent.co.uk/2024/05/04/09/006ae59f824aefd28c9dabb55811b8d0Y29udGVudHNlYXJjaGFwaSwxNzE0ODIzOTYx-2.75970411.jpg',
  }
])
const search: Ref<string> = ref('')
const request: Ref<any> = ref([
  {
    id: 1,
    name: 'Thanaphoom',
    img: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
  },
  {
    id: 2,
    name: 'Ten Hag',
    img: 'https://static.independent.co.uk/2024/05/04/09/006ae59f824aefd28c9dabb55811b8d0Y29udGVudHNlYXJjaGFwaSwxNzE0ODIzOTYx-2.75970411.jpg',
  }
])
</script>

<style scoped lang="scss">
.profile-img {
  width: 75px;
  height: 75px;
  border-radius: 100%;
  object-fit: cover;
}
</style>