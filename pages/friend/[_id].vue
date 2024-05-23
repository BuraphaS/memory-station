<template>
  <div class="flex flex-col justify-center items-center mx-auto w-full h-full bg-white p-8">
    <div class="flex gap-28 items-center">
      <img
        :src="profile.img"
        alt="profile"
        class="profile-img">
      <div class="flex flex-col w-full">
        <span class="text-2xl">{{ profile.name }}</span>
        <span>{{ profile.description }}</span>
      </div>
      <div>
        <button
          type="button"
          :class="switchButton(profile.status)">
          {{ switchFriend(profile?.status) }}
        </button>
      </div>
    </div>
    <div class="flex gap-20 mt-8">
      <div class="text-xl font-semibold">
        {{ profile.post }}
        <span class="text-lg font-normal"> Posts</span>
      </div>
      <div class="text-xl font-semibold">
        {{ profile.love }}
        <span class="text-lg font-normal"> Love</span>
      </div>
      <div class="text-xl font-semibold">
        {{ profile.friend }}
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
              v-for="(item, index) in [...profile.postDetail, ...profile.postDetail]"
              :key="index">
              <img 
                :src="item.img" 
                alt="item"
                class="post-img cursor-pointer">
                <div class="flex justify-between">
                  <div class="mdi mdi-heart text-sm">
                    50
                  </div>
                  <div class="flex">
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div v-if="activeTab === 'love'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="love" role="tabpanel" aria-labelledby="dashboard-tab">
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(item, index) in [...profile.postDetail]"
              :key="index">
              <img 
                :src="item.img" 
                alt="item"
                class="post-img cursor-pointer">
                <div class="flex justify-between">
                  <div class="mdi mdi-heart text-sm">
                    50
                  </div>
                  <div class="flex">
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                    <div class="mdi mdi-star text-sm"></div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'

interface IUserProfile {
  img: string;
  name: string;
  description: string;
  post: number;
  love: number;
  friend: number;
  status: string;
  postDetail: {
    img: string;
    topic: string;
    description: string;
    comment: {
      name: string;
      profileImg: string;
      comment: string;
    }[];
  }[];
}
const profile: Ref<IUserProfile> = ref({
  img: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
  name: 'Erik Ten Hag',
  description: 'ชอบการท่องเที่ยวและอาหาร Thailand 22 years old.',
  post: 12,
  love: 100,
  friend: 200,
  status: 'DONT',
  postDetail: [
    {
    img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fHww',
    topic: 'Beautiful World Best Pic In The World Best, most beautiful places on earth HD ',
    description: 'Beautiful World Best Pic In The World Best, most beautiful places on earth HD ',
    comment: [
      {
        name: 'Ten Hagg',
        profileImg: 'https://prod-media.beinsports.com/image/1708164001806_0d19ee95-bb70-443b-a046-c0e89bad34a7.jpg',
        comment: 'น่าไปจังเลยย'
      },
      {
        name: 'Thanaphoom',
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhiWAP58ytURnSopgXAcRpt-N0oYExestuwvGz0JLPw&s',
        comment: 'รถไฟร้อนมากแดดไทยแลนด์'
      },
      {
        name: 'Arnon',
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsWVddCQZ7TjwYJZf6BrIomSI0Hs9WxxziJKytg7-MQ&s',
        comment: 'อยากเล่นบาส'
      }
    ]
  },
  {
    img: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
    topic: 'Beautiful World Best Pic In The World Best, most beautiful places on earth HD ',
    description: 'Beautiful World Best Pic In The World Best, most beautiful places on earth HD ',
    comment: [
      {
        name: 'Ten Hagg',
        profileImg: 'https://prod-media.beinsports.com/image/1708164001806_0d19ee95-bb70-443b-a046-c0e89bad34a7.jpg',
        comment: 'น่าไปจังเลยย'
      },
      {
        name: 'Thanaphoom',
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhiWAP58ytURnSopgXAcRpt-N0oYExestuwvGz0JLPw&s',
        comment: 'รถไฟร้อนมากแดดไทยแลนด์'
      },
      {
        name: 'Arnon',
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsWVddCQZ7TjwYJZf6BrIomSI0Hs9WxxziJKytg7-MQ&s',
        comment: 'อยากเล่นบาส'
      }
    ]
  },
  {
    img: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
    topic: 'Beautiful World Best Pic In The World Best, most beautiful places on earth HD ',
    description: 'Beautiful World Best Pic In The World Best, most beautiful places on earth HD ',
    comment: [
      {
        name: 'Ten Hagg',
        profileImg: 'https://prod-media.beinsports.com/image/1708164001806_0d19ee95-bb70-443b-a046-c0e89bad34a7.jpg',
        comment: 'น่าไปจังเลยย'
      },
      {
        name: 'Thanaphoom',
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhiWAP58ytURnSopgXAcRpt-N0oYExestuwvGz0JLPw&s',
        comment: 'รถไฟร้อนมากแดดไทยแลนด์'
      },
      {
        name: 'Arnon',
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsWVddCQZ7TjwYJZf6BrIomSI0Hs9WxxziJKytg7-MQ&s',
        comment: 'อยากเล่นบาส'
      }
    ]
  }
]
})
const activeTab = ref('post');

function switchFriend (value: string): any {
  switch (value) {
    case 'FRIEND':
      return 'Unfriend'
    case 'REQUEST':
      return 'Accept Friend'
    case 'DONT':
      return 'Add Friend'
    default:
      return '-'
  }
}
function switchButton (value: string): any {
  switch (value) {
    case 'FRIEND':
      return 'shadow py-1 px-2 rounded w-[150px] bg-error text-white hover:bg-[#000000] hover:text-white'
    case 'REQUEST':
      return 'shadow py-1 px-2 rounded w-[150px] bg-success text-white hover:bg-[#000000] hover:text-white'
    case 'DONT':
      return 'shadow py-1 px-2 rounded w-[150px] bg-primary text-white hover:bg-[#000000] hover:text-white'
    default:
      return '-'
  }
}
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