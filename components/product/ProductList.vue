<template>
  <ClientOnly>
    <section
      id="product-list-section"
      class="flex flex-col gap-4 mb-12 md:mb-20">
      <ProductListFilter
        v-if="!props.max"
        :count="pagination.total || products?.length || 0"
        @change="loadProductClean()" />
      <div
        v-if="products?.length"
        id="product-list"
        class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <template
          v-for="(item, index) in products"
          :key="index">
          <ProductCard
            v-if="props.max
              ? index < +props.max
              : true"
            :data="item" />
        </template>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center w-full gap-8 p-8">
        <span class="text-4xl font-semibold text-border">
          ไม่พบสินค้าที่ค้นหา
        </span>
        <button
          class="px-8 py-3 text-white duration-200 bg-black rounded-lg hover:bg-gray"
          @click="resetFilter()">
          ดูสินค้าทั้งหมด
        </button>
      </div>
      <div
        v-if="!props.hideMore && (pagination.page < pagination.totalPage) && products?.length"
        class="flex items-center justify-center my-4">
        <button
          class="px-8 py-3 text-white duration-200 bg-black rounded-lg hover:bg-gray"
          @click="loadProduct()">
          ดูสินค้าเพิ่มเติม
        </button>
      </div>
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { IGetProductResponse, IGetProductResponseData } from '~/models/response/ProductRes.model'
import type { IPagination } from '~/models/Global.model'
import ProductsProvider from '~/resource/provider/Products.provider'

const ProductsService = new ProductsProvider()

interface IProps {
  max?: string | number
  hideMore?: boolean
  relate?: boolean
}

const props = defineProps<IProps>()

const route = useRoute()
const router = useRouter()

// const products: Ref<IProductList[]> = ref([])
const pagination: Ref<IPagination> = ref({
  perPage: 10,
  page: 1,
  totalPage: 1,
  total: 0
})

const { data: products } = await useAsyncData('product-list', async (): Promise<IGetProductResponseData[]> => {
  const { data }: IGetProductResponse = await ProductsService.getProducts(
    {
      limit: pagination.value.perPage,
      page: pagination.value.page,
      search: '',
      brandIds: [],
      categoryIds: [],
      sortBy: 'createdAt',
      sortOrder: 'DESC'
    }
  )
  return data
})

function setQueryArray (data: any | any[]): any[] | null {
  if (!data) {
    return null
  }
  return Array.isArray(data) ? data : [data]
}

async function fetch (): Promise<IGetProductResponseData[]> {
  try {
    const response: IGetProductResponse = await ProductsService.getProducts(
      {
        limit: pagination.value.perPage,
        page: pagination.value.page,
        search: route.query?.search as string || '',
        brandIds: setQueryArray(route.query?.brand),
        categoryIds: setQueryArray(route.query?.category),
        sortBy: route.query?.sortBy as string || '',
        sortOrder: route.query?.sortOrder as string || ''
      }
    )
    pagination.value = {
      perPage: response.limit,
      page: response.page,
      totalPage: response.totalPage,
      total: response.count
    }
    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}

async function loadProductClean (): Promise<void> {
  products.value = await fetch()
}

async function loadProduct (): Promise<void> {
  pagination.value.page++
  const newProduct = await fetch()
  if (products.value) {
    products.value.push(...newProduct)
  }
}

async function resetFilter (): Promise<void> {
  await router.replace({ query: undefined })
  loadProductClean()
}

onMounted((): void => {
  loadProductClean()
})
</script>

<style lang="scss" scoped>
</style>
