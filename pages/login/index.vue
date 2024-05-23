<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <div class="container flex flex-col items-center gap-4 my-20 mt-8 sm:gap-8 md:gap-16">
      <div
        v-for="(items, index) in [...cardInfo, ...cardInfo]"
        :key="index">
        <Card :form="items"/>
      </div>
    </div>
    <Account v-if="user" />
    <!-- <Auth v-else /> -->
    <Register v-else
      :modal="modal"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useSupabaseUser()
const client = useSupabaseClient()

const modal:Ref<boolean> = ref(false)
const cardInfo: Ref<any> = ref([])
async function fetchPosts(): Promise<void> {
  try {
    const { data, error } = await client.from('post').select('*');
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      cardInfo.value = data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
function scrollDown (): void {
  const scrollPosition = Math.min(window.scrollY, 1000)
  window.scrollTo({ top: scrollPosition })
  if (scrollPosition > 800) {
    modal.value = true
  }
}
function raplace() {
  if (user) {
    router.replace('/')
  }
}
onMounted((): void => {
  // raplace()
  window.addEventListener('scroll', scrollDown)
  fetchPosts()
})
// onUnmounted((): void => {
//   window.removeEventListener('scroll', scrollDown)
// })
</script>

<style scoped>


</style>