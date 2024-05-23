<template>
  <section id="products-list-page" class="container py-4 md:py-12">
    <div class="flex flex-col gap-8 md:gap-16">
      <ProductMainFilter
        title="สินค้าทั้งหมด">
        <InputSearchInput />
      </ProductMainFilter>
      <ProductBrands />
      <ProductCategories />
      <ProductList />
      <WarrantyBanner />
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
</style>
