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
const postCreate: Ref<boolean> = ref(false)
const cardInfo: Ref<any> = ref()
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
    const { data: postsData, error: postsError } = await client
      .from('post')
      .select('*')
      .eq('status', 'Public')
    const { data: ratingsData, error: ratingsError } = await client
      .from('rating')
      .select('postId, rating');

    if (postsError || ratingsError) {
      console.error('Error fetching data:', postsError || ratingsError);
      return;
    }
    const postAverageRatings = postsData.map((post: {id: any}) => {
      const postRatings = ratingsData.filter(rating => rating.postId === post.id);
      const averageRating = postRatings.reduce((sum, rating) => sum + rating.rating, 0) / postRatings.length || 0;
      return { ...(post as object), averageRating };
    });

    const sortedPosts = postAverageRatings.sort((a, b) => b.averageRating - a.averageRating);
    const top5Posts = sortedPosts.slice(0, 5);
    cardInfo.value = top5Posts
    console.log('Top 5 posts:', top5Posts);
  } catch (error: any) {
    console.error('Error:', error.message);
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
onMounted(() => {
  fetchPosts()
})
</script>

<style lang="scss" scoped>
</style>
