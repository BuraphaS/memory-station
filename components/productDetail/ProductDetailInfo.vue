<template>
  <section
    id="product-detail-info"
    class="flex flex-col w-full gap-2">
    <span class="w-full pb-2 border-b border-border">
      {{ props.title }}
    </span>
    <span class="text-sm font-light text-gray">
      {{ props.desc }}
    </span>
  </section>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  desc: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: 'title',
  desc: 'In dolore culpa do consequat adipisicing exercitation deserunt aute culpa proident aliqua labore.'
})
</script>

<style scoped>
</style>
