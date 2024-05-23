<template>
  <div class="w-full h-screen bg-white flex flex-col justify-strat items-center gap-8">
        <div class="flex flex-col items-start justify-start mt-24">
          <div class="flex flex-col gap-8 justify-start">
            <div class="flex items-center gap-4 justify-between">
              <label 
                for="oldPass"
                class="flex justify-end">
                Old-Password :
              </label>
              <input
                type="text"
                id="oldPass"
                class="rounded bg-[#C9C9C9] px-2 border-2">
            </div>
            <div class="flex items-center gap-4 justify-between">
              <label 
                for="newPass"
                class="flex justify-end">
                New-Password :
              </label>
              <input
                type="text"
                id="newPass"
                class=" rounded bg-[#C9C9C9] px-2 border-2">
            </div>
            <div class="flex items-center gap-4 justify-between">
              <label 
                for="confirm"
                class="flex justify-end">
                Confirm-Password :
              </label>
              <input
                type="text"
                id="confirm"
                class="rounded bg-[#C9C9C9] px-2 border-2">
            </div>
          </div>
        </div>
      <div class="flex gap-8">
        <button class="bg-error w-[120px] p-1 text-white rounded-lg">
          Cancel
        </button>
        <button class="bg-success w-[120px] p-1 text-white rounded-lg">
          Confirm
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.img-profile {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
}
</style>