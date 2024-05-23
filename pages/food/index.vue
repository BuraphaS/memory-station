<template>
  <section id="home-page">
    <div class="container flex flex-col items-center gap-4 my-20 mt-8 sm:gap-8 md:gap-16">
      <div
        v-for="(items, index) in cardInfo"
        :key="index">
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

// async function uploadImage(image: any): Promise<void> {
//   try {
//     const { data, error } = await client
//     .storage
//     .from('post')
//     .createSignedUrls(image.name, image)
//   if (error) alert('Error', error)
//   } catch (error) {
//     console.log(error, 'error')
//   }
// }
function generateRandomFilename(extension: string): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}.${extension}`;
}
// async function getImage (): Promise<void> {
//   const { data, error} = await client.storage
//     .from('post')
//     .list('public', {
//       limit: 100,
//       offset: 0,
//       sortBy: {column: 'image', order:'asc'}
//     })
// }
async function uploadImage(file: File,uid: string): Promise<string | null> {
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
  }
}

const postCreate: Ref<boolean> = ref(false)
  
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
    .select(`*`)
    .eq('type', 'Food')
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      cardInfo.value = data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
const cardInfo: Ref<any> = ref()
  
async function createPost(form: any): Promise<void> {
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
  }
}
onMounted(() => {
  fetchPosts()
})
</script>

<style lang="scss" scoped>
</style>
