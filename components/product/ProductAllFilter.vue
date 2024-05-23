<template>
  <button
    id="product-all-filter-section"
    :class="{
      'opacity-100 rounded-none delay-0': props.open,
      'opacity-0 rounded-full scale-0 delay-200': !props.open
    }"
    class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center duration-200 cursor-default bg-slate-900/50"
    @click.self="close()">
    <div
      :class="{
        'scale-100 opacity-100 delay-200': props.open,
        'scale-0 opacity-0 delay-0': !props.open
      }"
      class="flex flex-col justify-between gap-4 bg-white min-h-[95%] md:min-h-[33%] max-h-[100%] md:max-h-[75%] overflow-scroll min-w-[100%] md:min-w-[33%] rounded-lg duration-200">
      <div class="flex flex-col gap-2">
        <div class="relative flex items-center justify-center p-4 text-center border-b border-border">
          ตัวกรองทั้งหมด
          <button
            class="absolute top-0 bottom-0 text-xl right-4 mdi mdi-close"
            @click="close()">
          </button>
        </div>
      </div>

      <div class="flex flex-col w-full h-full mb-auto overflow-scroll">
        <div
          v-for="({type, value, isOpen, isMultiple}, index) in filterHeaders"
          :key="index"
          class="relative">
          <button
            :class="{
              'border-border text-primary': isOpen,
              'border-transparent': !isOpen
            }"
            class="sticky top-0 left-0 right-0 flex items-center justify-between w-full p-4 font-medium duration-200 bg-white border-b hover:text-primary hover:bg-primaryHover"
            @click.stop="toggleFilterOpen(index)">
            {{ value }}
            <div
              :class="{
                'rotate-90': isOpen
              }"
              class="text-xl duration-200 mdi mdi-chevron-right" />
          </button>
          <div
            v-if="getFilterOption(type).length"
            :class="{
              'h-auto': isOpen,
              'h-0': !isOpen
            }"
            class="flex flex-col w-full overflow-scroll duration-200">
            <button
              v-for="(option, subIndex) in getFilterOption(type)"
              :key="`${index}-${subIndex}`"
              class="flex items-center gap-4 p-4 duration-100 whitespace-nowrap hover:bg-primaryHover text-start"
              @click="selectFilter(type, option.value, option?.order)">
              <div
                v-if="isMultiple"
                :class="{
                  'bg-primary': isSelect(type, option.value),
                  'bg-white': !isSelect(type, option.value)
                }"
                class="p-0.5 text-white border rounded-sm border-border mdi mdi-check text-xs aspect-square h-fit" />
              {{ option?.text || '-' }}
            </button>
          </div>
        </div>
      </div>

      <button
        class="p-2 m-4 duration-200 border border-black rounded hover:border-primary hover:text-primary"
        @click="clearFilter()">
        ล้างทั้งหมด
      </button>
    </div>
  </button>
</template>

<script setup lang="ts">
// import AttributeProvider from '~/resource/provider/Attribute.provider'

// const AttributeService = new AttributeProvider()

interface IProps {
  open: boolean
  currentFilter: any
  sortItems: any[]
  categoryItems: any[]
  brandItems: any[]
}

enum EFilterTypeItem {
  SORT = 'sort',
  CATEGORY = 'category',
  BRAND = 'brand',
  SEE_ALL = 'seeAll'
}

interface IFilterOption {
  text: string
  value: string | number
  order?: string
}

interface IFilterType {
  type: EFilterTypeItem
  value: string
  isOpen?: boolean
  isMultiple?: boolean
}

const emit = defineEmits([
  'select-filter',
  'reset',
  'close'
])
const props = defineProps<IProps>()

const filterHeaders: Ref<IFilterType[]> = ref([
  {
    type: EFilterTypeItem.SORT,
    value: 'สินค้าล่าสุด',
    isOpen: false,
    isMultiple: false
  },
  {
    type: EFilterTypeItem.CATEGORY,
    value: 'หมวดหมู่สินค้า',
    isOpen: false,
    isMultiple: true
  },
  {
    type: EFilterTypeItem.BRAND,
    value: 'แบรนด์',
    isOpen: false,
    isMultiple: true
  }
])

function getFilterOption (type: EFilterTypeItem): IFilterOption[] {
  switch (type) {
    case EFilterTypeItem.SORT: return props.sortItems
    case EFilterTypeItem.CATEGORY: return props.categoryItems
    case EFilterTypeItem.BRAND: return props.brandItems
    default: return []
  }
}

function selectFilter (type: EFilterTypeItem, value: string | number, order?: string): void {
  emit('select-filter', { type, value, order })
}

function isSelect (type: EFilterTypeItem, value: string | number): boolean {
  const key = type === EFilterTypeItem.CATEGORY ? 'category' : 'brand'
  const found: boolean = props.currentFilter[key].includes(`${value}`)
  return found
}

function toggleFilterOpen (index: number): void {
  filterHeaders.value[index].isOpen = !filterHeaders.value[index].isOpen
}

function clearFilter (): void {
  emit('reset')
  emit('close')
}

function close (): void {
  emit('close')
}

</script>

<style lang="scss" scoped>
</style>
