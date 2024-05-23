<template>
  <section
    id="cart-page"
    class="container py-12">
    <div v-if="step < 3" class="flex flex-col grid-cols-12 gap-4 lg:grid">
      <div class="col-span-8">
        <div
          v-if="step === 1"
          class="flex items-center justify-between ">
          <span>ตะกร้าสินค้า ({{ itemInCart }})</span>
          <span>เลือกซื้อ {{ select.length }} รายการ</span>
        </div>
        <button
          v-else
          class="flex gap-2 text-black group hover:text-primary"
          @click="setStep(-1)">
          <div class="duration-200 mdi mdi-chevron-left group-active:-translate-x-1 text-inherit" />
          <span class="text-xs font-light duration-200 text-inherit text-start">
            กลับไปที่ตะกร้าสินค้า
          </span>
        </button>
      </div>
      <CartForm
        v-if="step === 1"
        :selected="select"
        class="col-span-8"
        @on-action="handleAction($event)" />
      <CartDetailForm
        v-if="step === 2"
        :is-accept-term="isAcceptTerm"
        :delivery-options="deliveryOptions"
        :form="deliveryAddress"
        :step="step"
        class="col-span-8"
        @on-action="handleAction($event)" />
      <CartCouponForm
        :is-accept-term="isAcceptTerm"
        :code-discount="codeDiscount"
        :sum-price="sumPrice"
        :is-apply="isApply"
        :selected="select"
        :step="step"
        :code="code"
        class="col-span-4"
        @on-action="handleAction($event)" />
    </div>
    <div v-else class="flex items-center justify-center w-full h-full">
      <CartProcess v-if="step === 3" />
      <CartComplete v-else />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ICartDeliveryAddressForm } from '~/models/Cart.model'
import type { IActionValue, IAction } from '~/models/Global.model'

const userStore = useUserStore()
const { getDeliveryAddress } = storeToRefs(userStore)
const cartStore = useCartStore()
const { cart, itemInCart } = storeToRefs(cartStore)

const code: Ref<string> = ref('')
const step: Ref<number> = ref(1)
const codeDiscount: Ref<number> = ref(0)
const select: Ref<number[]> = ref([])
const isApply: Ref<boolean> = ref(false)
const isAcceptTerm: Ref<boolean> = ref(false)
const deliveryAddress: Ref<ICartDeliveryAddressForm> = ref({
  ...getDeliveryAddress.value,
  email: '',
  isSameAddress: false,
  deliveryMethod: ''
})
const deliveryOptions: Ref<any[]> = ref([
  {
    name: 'จัดส่งแบบปกติ',
    icon: '/svg/icon-delivery.svg',
    price: 50,
    estimateTime: 'ประมาณการที่จะได้รับสินค้าภายใน 1 - 3 วัน'
  }
])
const sumPrice = computed((): number => {
  const total = select.value.reduce((sum: number, index: number): number => sum + cart.value[index].price * cart.value[index].amount, 0)
  return total
})

function cancelCode (): void {
  codeDiscount.value = 0
  isApply.value = false
}

function applyCode (): void {
  if (isApply.value) {
    cancelCode()
    return
  }
  codeDiscount.value = 1000
  isApply.value = true
}

function onInputChange (actionValue: IActionValue<ICartDeliveryAddressForm | any>): void {
  const { key, value }: IActionValue<ICartDeliveryAddressForm | any> = actionValue
  if (key in deliveryAddress.value) {
    deliveryAddress.value = {
      ...deliveryAddress.value,
      [key as keyof ICartDeliveryAddressForm]: value as string | boolean
    }
    return
  }
  switch (key) {
    case 'select':
      select.value = value
      break
    case 'code':
      code.value = value
      break
    case 'isAcceptTerm':
      isAcceptTerm.value = !isAcceptTerm.value
      break
    case 'isSameAddress':
      deliveryAddress.value.isSameAddress = !deliveryAddress.value.isSameAddress
      break
    default:
      console.error(`[ERROR] - function onInputChange case default key: ${key as string}`)
  }
}

function setStep (movement: number): void {
  step.value += movement
}

function handleNextClick (): void {
  switch (step.value) {
    case 1:
      setStep(1)
      break
    case 2:
      setStep(1)
      setTimeout((): void => {
        setStep(1)
      }, 3000)
      break
    default:
      console.error(`[ERROR] - function handleNextStep case default name: ${step.value}`)
  }
}

function handleAction (action: IAction<any>): void {
  const { actionName: name, actionValue }: IAction<any> = action
  switch (name) {
    case 'onInputChange':
      onInputChange(actionValue)
      break
    case 'onApplyCode':
      applyCode()
      break
    case 'onNextClick':
      handleNextClick()
      break
    default:
      console.error(`[ERROR] - function handleAction case default actionName: ${name}`)
  }
}

</script>

<style lang="scss" scoped>
</style>
