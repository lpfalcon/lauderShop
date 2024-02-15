<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CartComponent'
})
</script>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const cart = computed(() => store.state.cart)
const emptyCard = () => {
  store.commit('setEmptyCart')
}
const totalAmount = computed(() => store.getters.totalAmount)
</script>

<template lang="">
  <main>
    <!-- TABLE COMPONENT -->
    <h1 class="mt-5">My Products</h1>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ item.price * item.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      class="btn btn-dark bg-color fw-bold mx-3"
      data-bs-toggle="modal" href="#exampleModalToggle" role="button"
    >
      <i class="bi bi-cart"></i> Pagar
    </button>
    <button type="button" class="btn btn-dark bg-color fw-bold" @click="emptyCard()">
      <i class="bi bi-cart"></i> Vaciar
    </button>

    {{ totalAmount }}

    <!-- PAYMENT MODAL COMPONENT -->

    <div
      class="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Show a second modal and hide this one with the button below.</div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
            >
              Open second modal
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Hide this modal and show the first with the button below.</div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Back to first
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang=""></style>
