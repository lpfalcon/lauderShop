<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CatalogView',
})
</script>

<script setup>
import ProductComponent from '@/components/Base/ProductComponent.vue'
import EmptyDataComponent from '@/components/Base/EmptyDataComponent.vue'
import CartComponent from '@/components/Base/CartComponent.vue'

import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let isLoading = ref(false)
let products = ref([])

// computed properties

// fetch data
async function fetchProducts() {
  try {
    isLoading.value = true
    const response = await store.dispatch('fetchProducts')
    const data = await response.json()
    products.value = data?.products
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    products.value = []
  }
}
// mounted 
onMounted(async () => {
  await fetchProducts()
})
// add products to card
function addToCart(product) {
  store.dispatch('addToCart',product)
}
</script>
<template>
  <main>
    <div class="container text-center" v-if="!isLoading">
      <CartComponent/>
      <div class="row mt-5" v-if="products?.length">
        <div
          class="col-12 col-lg-3 col-md-4 col-sm-6 mb-3 mr-3"
          v-for="product of products"
          :key="product.id"
        >
          <ProductComponent :product="product" v-on:add-to-cart="addToCart($event)" />
        </div>
      </div>
      <div class="row mt-5 d-flex justify-content-center" v-else>
        <EmptyDataComponent />
      </div>
    </div>
    <!-- SKELETON -->
    <div class="container text-center" v-else>
      <div class="row mt-5">
        <div class="col-12 col-lg-3 col-md-4 col-sm-6 mb-3 mr-3" v-for="item of 8" :key="item">
          <div class="card" aria-hidden="true">
            <svg width="300" height="200" class="card-img-top" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="200" fill="gray" />
            </svg>
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a href="#" tabindex="-1" class="btn bg-color placeholder col-6"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
.bg-color {
  background-color: var(--color-lauder);
}
</style>