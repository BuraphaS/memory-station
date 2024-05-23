<template>
  <section
    id="product-main-filter"
    class="container flex flex-col items-center gap-4">
    <span class="text-3xl font-semibold">
      {{ props.title }}
    </span>
    <slot>
      <div class="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
        <button
          v-for="({name, img}, index) in items"
          :key="index"
          class="flex flex-col items-center gap-2 md:gap-4 group"
          @click="click(name)">
          <img
            v-if="img"
            :src="img"
            :alt="`product filter ${name} image ${index}`"
            class="duration-100 group-hover:scale-105 group-active:scale-95">
          <span class="font-light duration-200 group-hover:text-primary">{{ name }}</span>
        </button>
      </div>
    </slot>
  </section>
</template>

<script setup lang="ts">
interface IImageItem {
  name: string
  img: string
}

interface IProps {
  title: string
  items?: IImageItem[]
}

const emit = defineEmits([
  'click'
])

const props = defineProps<IProps>()

function click (name: string): void {
  emit('click', name)
}
</script>

<style scoped>
</style>
