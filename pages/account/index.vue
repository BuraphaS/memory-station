<template>
  <section
    v-if="!pending"
    id="account-page"
    class="flex flex-col items-end gap-4">
    <div
      v-if="editState === EAccountEditState.VIEW"
      class="flex flex-col w-full gap-4">
      <div
        v-for="({title, state, template}, index) in mainTemplate"
        :key="index"
        class="flex flex-col gap-4 p-4 bg-white rounded-xl">
        <div class="flex items-center justify-between">
          <span>
            {{ title }}
          </span>
          <button
            class="flex items-center gap-2 duration-200 h-fit hover:text-yellow"
            @click="toggleEditState(state)">
            <img
              src="/svg/icon-edit.svg"
              alt="edit icon"
              class="h-full">
            แก้ไข
          </button>
        </div>
        <div class="flex flex-col w-full gap-2">
          <div
            v-for="({title: templateTitle, key}) in template"
            :key="`${templateTitle}-${key}`">
            <div
              class="grid w-full grid-cols-1 text-sm lg:grid-cols-4 gap-x-4 gap-y-2"
            >
              <span class="col-span-1 text-gray">
                {{ templateTitle }}
              </span>
              <span class="col-span-1 lg:col-span-3">
                {{ getValue(state, key) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="editState === EAccountEditState.DETAIL"
      class="grid w-full grid-cols-1 p-4 bg-white md:grid-cols-2 gap-x-4 gap-y-2 rounded-xl">
      <span class="col-span-1 md:col-span-2">
        ข้อมูลผู้ใช้งาน
      </span>
      <InputTextField
        :value="detailForm.firstName"
        label="ชื่อ"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('firstName', $event.target.value)" />
      <InputTextField
        :value="detailForm.lastName"
        label="นามสกุล"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('lastName', $event.target.value)" />
      <InputTextField
        v-if="myAccount?.loginType !== EUserSocial.OTP"
        :value="detailForm.email"
        label="อีเมล"
        disabled
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('email', $event.target.value)" />
      <InputTextField
        v-if="myAccount?.loginType === EUserSocial.OTP"
        :value="detailForm.phoneNumber"
        label="เบอร์โทรศัพท์"
        border
        class="col-span-1"
        disabled
        @keypress.enter="initSave()"
        @input="onInputChange('phone', $event.target.value)" />
    </div>
    <div
      v-else-if="editState === EAccountEditState.ADDRESS"
      class="grid w-full grid-cols-1 p-4 bg-white md:grid-cols-2 gap-x-4 gap-y-2 rounded-xl">
      <span class="col-span-1 md:col-span-2">
        ที่อยู่จัดส่ง
      </span>
      <InputTextField
        :value="addressForm.firstName"
        label="ชื่อ"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('firstName', $event.target.value)" />
      <InputTextField
        :value="addressForm.lastName"
        label="นามสกุล"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('lastName', $event.target.value)" />
      <InputTextField
        :value="addressForm.phoneNumber"
        label="เบอร์โทรศัพท์"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('phone', $event.target.value)" />
      <InputTextField
        :value="addressForm.address"
        type="textarea"
        label="ที่อยู่ *"
        border
        class="col-span-1 md:col-span-2"
        @keypress.enter="initSave()"
        @input="onInputChange('address', $event.target.value)" />
      <InputTextField
        :value="addressForm.postCode"
        label="รหัสไปรษณีย์ *"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('postCode', $event.target.value)" />
      <InputTextField
        :value="addressForm.province"
        label="จังหวัด *"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('province', $event.target.value)" />
      <InputTextField
        :value="addressForm.district"
        label="เขต/อำเภอ *"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('district', $event.target.value)" />
      <InputTextField
        :value="addressForm.subDistrict"
        label="แขวง/ตำบล *"
        border
        class="col-span-1"
        @keypress.enter="initSave()"
        @input="onInputChange('subDistrict', $event.target.value)" />
    </div>
    <button
      v-if="editState !== EAccountEditState.VIEW"
      class="w-full px-8 py-2 text-sm text-white bg-black rounded md:w-fit"
      @click="initSave()">
      บันทึก
    </button>
  </section>
</template>

<script setup lang="ts">
import type { IDisplayTemplate } from '~/models/Global.model'
import { type IAlert, EAlertType } from '~/models/store/AlertStore.model'
import type {
  IUserDataFull,
  IUserDeliveryAddressFull,
  IUserData,
  IUserDeliveryAddress
} from '~/models/store/UserStore.model'

import { EUserSocial } from '~/models/store/UserStore.model'
import CustomerProvider from '~/resource/provider/Customer.provider'

const CustomerService = new CustomerProvider()

definePageMeta({
  layout: 'account-layout',
  title: 'ข้อมูลส่วนตัว',
  icon: '/svg/account-icon-account.svg'
})

enum EAccountEditState {
  VIEW = 'view',
  DETAIL = 'detail',
  ADDRESS = 'address'
}

interface IMainTemplate {
  title: string
  state: EAccountEditState
  template: IDisplayTemplate<IUserDataFull>[] | IDisplayTemplate<IUserDeliveryAddressFull>[]
}

const userStore = useUserStore()
const { setUser, setDeliveryAddress } = userStore
const { getUser, getDeliveryAddress } = storeToRefs(userStore)

const alertStore = useAlertStore()
const { setAlert } = alertStore

const myAccount: Ref<IUserData> = ref({
  customerNo: '',
  id: 0,
  firstName: '',
  lastName: '',
  isRegisted: false,
  loginType: EUserSocial.NONE,
  phoneNumber: '',
  email: ''
})
const pending: Ref<boolean> = ref(true)
const editState: Ref<EAccountEditState> = ref(EAccountEditState.VIEW)
const detailForm: Ref<IUserData> = ref({ ...getUser.value })
const addressForm: Ref<IUserDeliveryAddress> = ref({ ...getDeliveryAddress.value })
const detailTemplate: Ref<IDisplayTemplate<IUserDataFull>[]> = ref([
  {
    title: 'ชื่อ - นามสกุล:',
    key: 'fullName'
  },
  {
    title: 'อีเมล:',
    key: 'email'
  },
  {
    title: 'เบอร์โทรศัพท์:',
    key: 'phoneNumber'
  }
])
const addressTemplate: Ref<IDisplayTemplate<IUserDeliveryAddressFull>[]> = ref([
  {
    title: 'ชื่อ - นามสกุล ผู้รับ:',
    key: 'fullName'
  },
  {
    title: 'เบอร์โทรศัพท์:',
    key: 'phoneNumber'
  },
  {
    title: 'ที่อยู่:',
    key: 'fullAddress'
  }
])
const mainTemplate: Ref<IMainTemplate[]> = ref([
  {
    title: 'ข้อมูลผู้ใช้งาน',
    state: EAccountEditState.DETAIL,
    template: detailTemplate.value
  },
  {
    title: 'ที่อยู่จัดส่ง',
    state: EAccountEditState.ADDRESS,
    template: addressTemplate.value
  }
])

async function getMyAccount (): Promise<void> {
  try {
    const { data } = await CustomerService.getMyAccount()
    myAccount.value = {
      ...data,
      fullName: `${data?.firstName} ${data?.lastName}`
    }
    detailForm.value = {
      ...data
    }
  } catch (error) {
    console.error(error)
  }
}

function toggleEditState (state: EAccountEditState = EAccountEditState.VIEW): void {
  editState.value = state
}

function toggleAlert (payload?: IAlert): void {
  setAlert({
    isActive: true,
    title: payload?.type === EAlertType.ERROR
      ? 'บันทึกข้อมูลล้มเหลว'
      : 'บันทึกข้อมูลสำเร็จ',
    desc: payload?.type === EAlertType.ERROR
      ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
      : 'ข้อมูลของคุณได้รับการอัพเดตเรียบร้อยแล้ว',
    type: payload?.type || EAlertType.SUCCESS,
    ...payload
  })
}

async function saveDetail (): Promise<void> {
  try {
    const { data } = await CustomerService.updateMyAccount({
      firstName: detailForm?.value?.firstName,
      lastName: detailForm?.value?.lastName
    })
    setUser(data)
    toggleEditState()
    toggleAlert()
    getMyAccount()
  } catch (error) {
    toggleAlert({
      type: EAlertType.ERROR
    })
  }
}

function saveAddress (): void {
  try {
    // handle save address api
    setDeliveryAddress(addressForm.value)
    toggleEditState()
    toggleAlert()
  } catch (error) {
    toggleAlert({
      type: EAlertType.ERROR
    })
  }
}

function initSave (): void {
  try {
    switch (editState.value) {
      case EAccountEditState.VIEW:
        throw new Error(`[ERROR] - function initSave case EAccountEditState.VIEW state: ${editState.value}`)
      case EAccountEditState.DETAIL:
        saveDetail()
        break
      case EAccountEditState.ADDRESS:
        saveAddress()
        break
      default:
        throw new Error(`[ERROR] - function initSave case default state: ${editState.value}`)
    }
  } catch (error) {
    console.error(error)
  }
}

function onInputChange (key: keyof IUserData | keyof IUserDeliveryAddress, value: string, type: EAccountEditState = EAccountEditState.DETAIL): void {
  try {
    switch (type) {
      case EAccountEditState.VIEW:
        throw new Error(`[ERROR] - function onInputChange case EAccountEditState.VIEW type: ${type}`)
      case EAccountEditState.DETAIL:
        if (key in detailForm.value) {
          detailForm.value = {
            ...detailForm.value,
            [key]: value
          }
        }
        break
      case EAccountEditState.ADDRESS:
        if (key in addressForm.value) {
          addressForm.value = {
            ...addressForm.value,
            [key]: value
          }
        }
        break
      default:
        throw new Error(`[ERROR] - function onInputChange case default type: ${type}`)
    }
  } catch (error) {
    console.error(error)
  }
}

function getValue (state: EAccountEditState, key: keyof IUserDataFull | keyof IUserDeliveryAddressFull): any {
  const result = state === EAccountEditState.DETAIL
    ? myAccount.value[key as keyof IUserData]
    : myAccount.value[key as keyof IUserData]
  return result
}

onMounted(async (): Promise<void> => {
  await getMyAccount()
  pending.value = false
})

</script>

<style lang="scss" scoped>
</style>
