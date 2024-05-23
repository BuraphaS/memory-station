<template>
  <section id="products-details-page">
    <div class="container flex flex-col gap-8 py-4 lg:py-8 lg:gap-16">
      <div class="flex flex-row flex-wrap items-start gap-2 text-xs font-light md:items-center">
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/"
            class="duration-200 text-primary hover:text-secondary">
            หน้าแรก
          </NuxtLink>
          <div class="mdi mdi-chevron-right text-secondary" />
        </div>
        <div class="flex items-center gap-2">
          <span class="duration-200 text-primary hover:text-secondary">
            {{ product?.category?.name || '-' }}
          </span>
          <div class="mdi mdi-chevron-right text-secondary" />
        </div>
        <div class="flex items-center gap-2">
          <span class="duration-200 text-primary hover:text-secondary">
            {{ product?.brand?.name || '-' }}
          </span>
          <div class="mdi mdi-chevron-right text-secondary" />
        </div>
        <div class="flex items-center gap-2">
          <span>
            {{ product?.name || '-' }}
          </span>
        </div>
      </div>
      <client-only>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ProductDetailImage
            :images="product?.images" />
          <ProductDetail
            :key="key"
            :data="product"
            :select="select"
            @on-action="handleAction($event)" />
        </div>
      </client-only>
      <client-only>
        <div class="flex flex-col gap-8 py-8">
          <ProductDetailInfo
            :desc="product?.description"
            title="รายละเอียดสินค้า" />
          <ProductDetailInfo
            :desc="product?.description"
            title="สภาพสินค้า" />
        </div>
      </client-only>
    </div>
    <WarrantyBanner />
    <ProductRelate :product="product" />
  </section>
</template>

<script setup lang="ts">
import type { IAction, IActionValue } from '~/models/Global.model'
import type { IProductSku } from '~/models/Product.model'
import type { IGetProductDetailResponse, IGetProductResponseData } from '~/models/response/ProductRes.model'
import ProductsProvider from '~/resource/provider/Products.provider'

const ProductsService = new ProductsProvider()

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const { data: product } = await useAsyncData(`product-detail-[${route.params._id}]`, async (): Promise<IGetProductResponseData> => {
  const { data }: IGetProductDetailResponse = await ProductsService.getProductsById(route.params._id as string)
  return data
})

const select: Ref<any> = computed((): any => ({
  ...product.value,
  sku: product.value?.sku.map((sku: IProductSku<string | string[]>): IProductSku<string> => ({
    name: sku.name,
    value: Array.isArray(sku.value) ? sku.value[0] : sku.value
  }))
}))
const key: Ref<number> = ref(0)

function onSelectSku (actionValue: IActionValue<any>): void {
  const { value, index }: IActionValue<any> = actionValue
  select.value.sku[index!].value = value
  key.value += 1
}

function handleAction (action: IAction<IActionValue<any | any>>): void {
  const { actionName: name, actionValue: value }: IAction<IActionValue<any | any>> = action
  switch (name) {
    case 'addToCart':
      cartStore.addToCart(select.value)
      break
    case 'processOrder':
      cartStore.addToCart(select.value)
      router.push('/cart')
      break
    case 'onSelectSku':
      onSelectSku(value)
      break
    default:
      console.error(`[ERROR] - function handleAction case default: ${action}`)
  }
}

async function fetchProduct (id: string): Promise<void> {
  try {
    const { data }: IGetProductDetailResponse = await ProductsService.getProductsById(id)
    product.value = data
  } catch (err) {
    console.error(err)
    router.replace({ name: 'products' })
  }
}

onMounted((): void => {
  fetchProduct(route.params._id as string)
})
</script>

<style lang="scss" scoped>
</style>
