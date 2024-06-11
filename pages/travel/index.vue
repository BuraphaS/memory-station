<template>
  <section id="home-page">
    <div class="container flex flex-col items-center gap-4 my-20 mt-8 sm:gap-8 md:gap-16">
      <div
        v-for="(items) in postData.slice().reverse()"
        :key="items.id">
        <Card :form="items"/>
      </div>
    </div>
    <button
      class="fixed flex items-center justify-center w-10 h-10 duration-200 bg-white border shadow-xl right-5 rounded-xl bottom-6 border-border hover:shadow-lg group active:bottom-12"
      @click="openCreate()">
      <div class="text-2xl duration-200 mdi mdi-plus text-primary group-active:-translate-y-2" />
    </button>
    <ModalCreate
    :modal="postCreate"
    @post="createPost"
    @close-modal="handleCloseModal()"/>
  </section>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user: any = useSupabaseUser()
const postCreate: Ref<boolean> = ref(false)
const postData: Ref<any> = ref([])
const cardInfo: Ref<any> = ref()
const friend: Ref<any> = ref([])
const loading: Ref<boolean> = ref(false)

function generateRandomFilename(extension: string): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}.${extension}`;
}

async function uploadImage(file: File,uid: string): Promise<string | null> {
  loading.value = true
  try {
    const extension = file.name.split('.').pop();
    const randomFilename = generateRandomFilename(extension || 'jpg');

    const { data, error } = await client.storage
      .from('post')
      .upload(`post/${randomFilename}`, file);

    if (data) {

    }
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    return `https://fhxsoitvmpbsbhoqlewr.supabase.co/storage/v1/object/public/post/post/${randomFilename}`
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  } finally {
    loading.value = false
  }
}
  
function openCreate (): void {
  postCreate.value = true
}
function handleCloseModal() {
  postCreate.value = false;
}
  
async function fetchPosts(): Promise<void> {
  try {
    const { data, error } = await client
    .from('post')
    .select('*')
    .eq('type', 'Travel')
    .eq('status', 'Public')
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      postData.value = data
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
async function fetchPostsOwn(): Promise<void> {
  try {
    const { data, error } = await client
    .from('post')
    .select('*')
    .eq('status', 'Just Friend')
    .eq('type', 'Travel')
    .eq('uid', user.value.id)
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      postData.value = [...postData.value, ...data]
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
  
async function createPost(form: any): Promise<void> {
  loading.value = true
  try {
    const imageUrls: string[] = [];
    for (const file of form.image) {
      const url: any = await uploadImage(file,form.uid);
      if (url) {
        imageUrls.push(url);
      }
    }
    const { data, error } = await client.from('post').insert({
      uid: form.uid,
      topic: form.topic,
      description: form.description,
      type: form.type,
      rating: form.rating,
      like: form.like,
      status: form.status,
      image: imageUrls
    } as never).select()
    if (error) {
      console.error('Error creating post:', error);
    } else {
      cardInfo.value.push(data)
      console.log('Post created successfully:', data);
    }
  }catch (error) {
    console.log(error, 'error')
  }finally{
    handleCloseModal()
    await fetchPosts()
    loading.value = false
  }
}
async function fetchPostFriend(info: any): Promise<void> {
  try {
    const userUids = info.map((c: { uid: any; }) => c.uid).filter((uid: any) => uid !== user.value.id)
    const friendUids = info.map((f: { frienduid: any; }) => f.frienduid).filter((frienduid: any) => frienduid !== user.value.id)
    
    const { data: userData, error: userError } = await client
      .from('post')
      .select('*')
      .eq('status', 'Just Friend')
      .eq('type', 'Travel')
      .in('uid', userUids)

    const { data: friendData, error: friendError } = await client
      .from('post')
      .select('*')
      .eq('status', 'Just Friend')
      .eq('type', 'Travel')
      .in('uid', friendUids)

    if (userError) {
      console.error('Error fetching user data:', userError)
    }

    if (friendError) {
      console.error('Error fetching friend data:', friendError)
    }
    if (userData || friendData) {
      const combinedData: any[] = [...(userData || []), ...(friendData || [])]
      const uniquePosts = Array.from(new Map(combinedData.map(post => [post.id, post])).values())
      
      postData.value = [...postData.value, ...uniquePosts]
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
async function fetchFriend (): Promise<void> {
  try {
    const { data, error } = await client
      .from('friend')
      .select(`*`)
      .or(`frienduid.eq.${user.value.id},uid.eq.${user.value.id}`)
      .eq('status', 'FRIEND')
    if (error) {
      console.log(error); 
    } else {
      friend.value = data
      await fetchPostFriend(friend.value)
    }
  } catch (error) {
    console.log(error); 
  }
}
onMounted(() => {
  fetchPosts()
  fetchFriend()
  fetchPostsOwn()
})
</script>

<style lang="scss" scoped>
</style>
