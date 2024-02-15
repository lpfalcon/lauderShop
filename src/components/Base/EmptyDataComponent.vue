<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EmptyDataComponent'
})
</script>

<template>
  <article class="card border-secondary mb-3" style="max-width: 18rem">
    <div class="card-body">
      <h5 class="card-title text-color">Empty data</h5>
      <p class="card-text text-color">
        There is no data to show
      </p>
    </div>
  </article>
</template>

<style>
.text-color {
  color: var(--color-lauder);
}
</style>
