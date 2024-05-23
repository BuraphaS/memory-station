<template>
  <section
    id="product-list-filter-section"
    class="flex flex-col items-center justify-between gap-2 text-sm font-light md:flex-row">
    <div class="flex justify-between w-full gap-6 md:justify-start">
      <button
        v-for="({type, value, isMultiple}, index) in filterHeaders"
        :key="index"
        :class="{
          'flex': index === 0,
          'hidden md:flex': index > 0,
          'text-primary': hasValue(type)
        }"
        class="relative gap-2 group">
        {{ value }}
        <div
          :class="{
            'hidden md:flex': index !== 0 && index !== filterHeaders.length - 1
          }"
          class="duration-200 mdi text-secondary group-hover:text-primary mdi-chevron-down" />
        <div
          v-if="getFilterOption(type).length"
          class="absolute left-0 flex flex-col w-0 h-0 p-0 overflow-hidden duration-200 bg-white border rounded-md opacity-0 top-full border-border group-focus-within:w-fit group-focus-within:h-fit group-focus-within:opacity-100">
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
      </button>
      <button
        class="flex gap-2 group"
        @click="openAllFilter()">
        ตัวกรองทั้งหมด
        <div class="duration-200 mdi text-secondary group-hover:text-primary mdi-tune" />
      </button>
    </div>
    <span class="w-full text-gray text-end md:w-fit whitespace-nowrap">
      รายการสินค้า {{ filters.numberFormat(props.count || 0) }} รายการ
    </span>

    <ProductAllFilter
      :open="isAllOpen"
      :current-filter="currentFilter"
      :sort-items="sortOptions"
      :brand-items="brands"
      :category-items="categories"
      @select-filter="innerSelectFilter($event)"
      @reset="resetFilter()"
      @close="closeAllFilter()" />
  </section>
</template>

<script setup lang="ts">
import filters from '~/utils/Filter'
// import AttributeProvider from '~/resource/provider/Attribute.provider'

// const AttributeService = new AttributeProvider()

interface IProps {
  count: number
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
  isMultiple?: boolean
}

const emit = defineEmits([
  'change'
])
const props = defineProps<IProps>()

const route = useRoute()
const router = useRouter()

const currentFilter: Ref<any> = ref({
  sortBy: '',
  sortOrder: '',
  category: [],
  brand: []
})

const isAllOpen: Ref<boolean> = ref(false)
const filterHeaders: Ref<IFilterType[]> = ref([
  {
    type: EFilterTypeItem.SORT,
    value: 'สินค้าล่าสุด',
    isMultiple: false
  },
  {
    type: EFilterTypeItem.CATEGORY,
    value: 'หมวดหมู่สินค้า',
    isMultiple: true
  },
  {
    type: EFilterTypeItem.BRAND,
    value: 'แบรนด์',
    isMultiple: true
  }
])
const sortOptions: Ref<IFilterOption[]> = ref([
  {
    text: 'สินค้าล่าสุด',
    value: 'createdAt',
    order: 'DESC'
  },
  {
    text: 'ราคาต่ำสุด',
    value: 'price',
    order: 'ASC'
  },
  {
    text: 'ราคาสูงสุด',
    value: 'price',
    order: 'DESC'
  }
])
const brands: Ref<IFilterOption[]> = ref([
  {
    text: 'Apple',
    value: 11
  },
  {
    text: 'Samsung',
    value: 12
  },
  {
    text: 'Oppo',
    value: 13
  },
  {
    text: 'Vivo',
    value: 14
  },
  {
    text: 'Dell',
    value: 15
  }
])
const categories: Ref<IFilterOption[]> = ref([
  {
    text: 'test',
    value: 1
  },
  {
    text: 'test',
    value: 2
  },
  {
    text: 'test',
    value: 3
  }
])

async function fetch (): Promise<void> {
  // try {
  //   const [brand, category] = await Promise.all([
  //     AttributeService.getBrands(),
  //     AttributeService.getCategories()
  //   ])
  //   brands.value = brand.data
  //   categories.value = category.data
  // } catch (err) {
  //   console.error(err)
  // }
}

function getFilterOption (type: EFilterTypeItem): IFilterOption[] {
  switch (type) {
    case EFilterTypeItem.SORT: return sortOptions.value
    case EFilterTypeItem.CATEGORY: return categories.value
    case EFilterTypeItem.BRAND: return brands.value
    default: return []
  }
}

async function setQuery (): Promise<void> {
  await router.replace({
    query: {
      ...route.query,
      ...currentFilter.value
    }
  })
  emit('change')
}

function handleFilterSelect (type: EFilterTypeItem, value: string | number): void {
  const key = type === EFilterTypeItem.CATEGORY ? 'category' : 'brand'
  const foundIndex: number = currentFilter.value[key]?.findIndex((item: string | number): boolean => item === `${value}`)
  if (foundIndex >= 0) {
    currentFilter.value[key].splice(foundIndex, 1)
  } else {
    currentFilter.value[key].push(`${value}`)
  }
  setQuery()
}

function selectFilter (type: EFilterTypeItem, value: string | number, order?: string): void {
  if (type === EFilterTypeItem.SORT) {
    currentFilter.value.sortBy = value
    currentFilter.value.sortOrder = order || 'DESC'
    setQuery()
    return
  }
  handleFilterSelect(type, value)
}

function innerSelectFilter (event: any): void {
  const { type, value, order }: any = event
  selectFilter(type, value, order)
}

function isSelect (type: EFilterTypeItem, value: string | number): boolean {
  const key = type === EFilterTypeItem.CATEGORY ? 'category' : 'brand'
  const found: boolean = currentFilter.value[key].includes(`${value}`)
  return found
}

function hasValue (type: EFilterTypeItem): boolean {
  const key = type === EFilterTypeItem.CATEGORY ? 'category' : 'brand'
  const found: boolean = currentFilter.value[key].length
  return !!found
}

function openAllFilter (): void {
  document.body.style.overflow = 'hidden'
  isAllOpen.value = true
}

function closeAllFilter (): void {
  document.body.style.overflow = 'scroll'
  isAllOpen.value = false
}

function resetFilter (): void {
  currentFilter.value = {
    sortBy: '',
    sortOrder: '',
    category: [],
    brand: []
  }
  setQuery()
}

function setQueryArray (data: any | any[]): any[] | null {
  if (!data) {
    return []
  }
  return Array.isArray(data) ? data : [data]
}

function setDefaultFilter (): void {
  const queryValue = route.query
  currentFilter.value = {
    ...currentFilter.value,
    ...queryValue,
    brand: setQueryArray(queryValue?.brand),
    category: setQueryArray(queryValue?.category)
  }
}

onMounted((): any => {
  fetch()
  setDefaultFilter()
})

</script>

<style lang="scss" scoped>
</style>
