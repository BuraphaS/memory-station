<template>
  <div class="layout-default bg-primary">
    <AppBar :data="profile"/>
    <main id="site-content">
      <slot />
    </main>
    <!-- <AppFooter /> -->
    <AlertBar />
  </div>
</template>

<script setup lang="ts">
// import { type Router, useRouter } from '#vue-router'
const supabase = useSupabaseClient()
const user: any = useSupabaseUser()

const postCreate: Ref<boolean> = ref(false)
// const { currentRoute }: Router = useRouter()

const profile: Ref<any> = ref()

async function fetchProfile (): Promise<void> {
  try {
    const { data,error } = await supabase
    .from('user')
    .select(`username`)
    .eq('uid', user.value.id)
    .single()
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      profile.value = data;
    }
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  fetchProfile()
})
</script>

<style lang="scss" scoped>
.layout-default {
  min-height: 100dvh;
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // background-color: #EAEAEA;
}

#site-content {
  margin-top: 80px;
  min-height: 100dvh;
  width: 50dvw;
  margin: auto;
  margin-top: 5rem;
  background-color: #EAEAEA;
}

@media only screen and (max-width: 600px) {
  #site-content {
    width: 100dvw;
  }
}
</style>
