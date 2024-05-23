<template>
  <!-- <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>
    <div>
      <label for="avartar">avatar_url</label>
      <input id="avarta" type="text" v-model="avatar_url" />
    </div>

    <div>
      <input
        type="submit"
        class="block button primary"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

  </form>
  <div>
    <button class="block button" @click="signOut" :disabled="loading">Sign Out</button>
  </div> -->
  <div>

  </div>
</template>

<script setup lang="ts">
// const supabase = useSupabaseClient()

// const loading = ref(true)
// const username = ref('')
// const avatar_url = ref('')

// loading.value = true
// const user = useSupabaseUser()

// const { data } = await supabase
//   .from('user')
//   .select(`username`)
//   .eq('uid', user.value.id)
//   .single()

// if (data) {
//   username.value = data.username
//   // avatar_url.value = data.avatar_url
// }

// loading.value = false

// async function updateProfile() {
//   try {
//     loading.value = true
//     const user = useSupabaseUser()
//     const { error } = await supabase.from('user').update(
//       {
//         uid: user.value.id,
//         username: username.value,
//         firstName: 'tetetete',
//         // avatar_url: avatar_url.value,
//         updated_at: new Date()
//       } as never
//     )
//     .eq('username', data.username)
//     .select()
//     console.log(user.value);
    
//     if (error) throw error
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }

// async function signOut() {
//   try {
//     loading.value = true
//     const { error } = await supabase.auth.signOut()
//     if (error) throw error
//     user.value = null
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }
</script>
