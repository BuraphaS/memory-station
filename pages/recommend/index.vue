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
const rating: Ref<number> = ref(0)
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
const fetchRating = async (id: any) => {
  try {
    const { data, error } = await client
      .from('rating')
      .select('*')
      .eq('postId',id)
    if (error && error.details.includes('row')) {
      console.log('No existing rating found, ready to send new rating.');
    } else if (data) {
      const sum = data.reduce((total, current: any) => total + current.rating, 0);
      rating.value = sum / data.length;
      console.log(rating.value);
      
    } else {
      console.error('Error fetching rating:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
function generateRandomFilename(extension: string): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}.${extension}`;
}

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
// async function fetchPosts(): Promise<void> {
//   try {
//     const { data, error } = await client
//     .from('post')
//     .select(`
//         id,
//         title,
//         (SELECT AVG(rating) FROM rating WHERE rating.postId = post.id) AS average_rating
//       `)
//     .order('average_rating', { ascending: false })
//     .range(0, 4); // เลือกเพียง 5 โพสต์แรก
//     if (error) {
//       console.error('Error fetching posts:', error);
//     } else {
//       cardInfo.value = data;
//       await fetchRating(cardInfo.value.id)
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
async function fetchPosts(): Promise<void> {
  try {
    // ดึงข้อมูลโพสต์และคะแนนจากฐานข้อมูล
    const { data: postsData, error: postsError } = await client
      .from('post')
      .select('*'); // เลือกเฉพาะคอลัมน์ที่ต้องการจากตาราง "post"
    const { data: ratingsData, error: ratingsError } = await client
      .from('rating')
      .select('postId, rating'); // เลือกเฉพาะคอลัมน์ที่ต้องการจากตาราง "rating"

    // ถ้ามีข้อผิดพลาดเกิดขึ้นในการดึงข้อมูล
    if (postsError || ratingsError) {
      console.error('Error fetching data:', postsError || ratingsError);
      return;
    }

    // คำนวณคะแนนเฉลี่ยของแต่ละโพสต์
    const postAverageRatings = postsData.map((post: {id: any}) => {
      // กรองเฉพาะคะแนนที่เกี่ยวข้องกับโพสต์นี้
      const postRatings = ratingsData.filter(rating => rating.postId === post.id);
      // คำนวณคะแนนเฉลี่ย
      const averageRating = postRatings.reduce((sum, rating) => sum + rating.rating, 0) / postRatings.length;
      return { ...(post as object), averageRating }; // เพิ่มค่าคะแนนเฉลี่ยเข้าไปในข้อมูลโพสต์
    });

    // เรียงลำดับโพสต์ตามคะแนนเฉลี่ย
    const sortedPosts = postAverageRatings.sort((a, b) => b.averageRating - a.averageRating);
    
    // เลือกเพียง 5 อันดับแรก
    const top5Posts = sortedPosts.slice(0, 5);
    cardInfo.value = top5Posts
    // แสดงผลลัพธ์
    console.log('Top 5 posts:', top5Posts);
  } catch (error: any) {
    console.error('Error:', error.message);
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
    await fetchPosts()
  }
}
onMounted(() => {
  fetchPosts()
})
</script>

<style lang="scss" scoped>
</style>
