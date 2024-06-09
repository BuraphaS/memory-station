<template>
  <label
    id="search-input"
    for="search"
    class="flex w-full gap-2 px-2 py-1 duration-200 border rounded border-border focus-within:border-secondary hover:border-secondary">
    <button
      class="text-xl duration-200 mdi mdi-magnify hover:text-secondary"
      @click="onSearch()" />
    <input
      id="search"
      v-model="search"
      name="search"
      placeholder="ค้นหาสินค้าด้วย ยี่ห้อ รุ่น หรือคีย์เวิร์ด"
      type="text"
      class="w-full focus-visible:outline-none lg:placeholder:text-base md:placeholder:text-sm placeholder:text-xs"
      @keypress.enter="onSearch()">
  </label>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const search = ref('')

function onSearch (): void {
  router.replace({
    name: 'friend',
    query: {
      ...route.query,
      search: search.value
    }
  })
}
</script>

<style lang="scss" scoped>
</style>
