<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProductComponent'
})
</script>

<script setup>
import getTitle from '../../utils/reusableFunctions.js'
import { defineProps } from 'vue'
defineProps({
  product: {
    type: Object,
    description: 'Product Element',
    default: () => {}
  }
})
</script>
<template>
  <article class="card">
    <figure>
      <img :src="product.thumbnail" class="card-img-top image-style" alt="..." />
    </figure>
    <div class="card-body">
      <h5 class="card-title">{{ getTitle(product.title, 20) }}</h5>
      <p class="card-text">
        <small class="text-body-secondary"> {{ product?.category }}</small>
      </p>
      <h6 class="card-title">${{ product?.price?.toFixed(2) }}</h6>
      <p class="card-text">
        {{ getTitle(product.description, 25) }}
      </p>
      <button
        type="button"
        class="btn btn-dark bg-color fw-bold"
        @click="$emit('add-to-cart', product)"
      >
        <i class="bi bi-cart"></i> Buy
      </button>
    </div>
  </article>
</template>

<style>
.bg-color {
  background-color: var(--color-lauder);
}

.image-style {
  height: 206px;
  object-fit: cover;
}
</style>
