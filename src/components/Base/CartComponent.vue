<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CartComponent'
})
</script>
<script setup>
import { computed, ref, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const store = useStore()
const cart = computed(() => store.state.cart)
const totalAmount = computed(() => store.getters.totalAmount)
const form = computed(() => store.state.creditCardData)
const summaryModal = ref(null)
const formModal = ref(null)
let summaryModalComponent = null
let formModalComponent = null
const swal = inject('$swal')

onMounted(async () => {
  summaryModalComponent = new Modal(summaryModal.value)
  formModalComponent = new Modal(formModal.value)
  await store.dispatch('setCartValueFromLocalStorage')
  await store.dispatch('setCreditCardFromLocalStorage')
})

const emptyCard = () => {
  store.commit('setEmptyCart')
}

function closeSummaryModal() {
  summaryModalComponent.hide()
  formModalComponent.hide()
}

// REMOVE EMPTY ELEMENTS OF AN OBJECT
function removeEmpty(object) {
  return Object.fromEntries(Object.entries(object).filter(([_, v]) => !!v))
}

function submitForm(e) {
  e.preventDefault()
  const data = removeEmpty(form.value)
  if (
    JSON.stringify(data) === '{}' ||
    Object.keys(data).length !== Object.keys(form.value).length
  ) {
    swal('Campos vacios')
  } else {
    store.commit('setCreditCardData', form.value)
    summaryModalComponent.show()
    formModalComponent.hide()
  }
}
function payment() {
    swal('Pago Realizado')
  closeSummaryModal()
}
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
        @click=" formModalComponent.show()"
      role="button"
      :disabled="JSON.stringify(cart) ==='{}'"
    >
      <i class="bi bi-cart"></i> Pagar
    </button>
    <button type="button" class="btn btn-dark bg-color fw-bold" @click="emptyCard()">
      <i class="bi bi-cart"></i> Vaciar
    </button>

    <!-- PAYMENT MODAL COMPONENT -->

    <div ref="formModal" class="modal fade" id="exampleModalToggle">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">Credit Card Info</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit="submitForm">
              <div class="form-group">
                <label>Card number</label>
                <input class="form-control" v-model="form.number" v-cardformat:formatCardNumber />
              </div>
              <div class="form-group">
                <label>Card Expiry</label>
                <input class="form-control" v-model="form.cvc" v-cardformat:formatCardExpiry />
              </div>
              <div class="form-group">
                <label>Card CVC</label>
                <input class="form-control" v-model="form.cardExpiry" v-cardformat:formatCardCVC />
              </div>
              <div class="form-group">
                <label>Numeric input</label>
                <input
                  class="form-control"
                  v-model="form.numericInput"
                  v-cardformat:restrictNumeric
                />
              </div>
              <button class="btn btn-dark bg-color fw-bold mt-3" id="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div ref="summaryModal" class="modal fade">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel2">TOTAL AMOUNT</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeSummaryModal()"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">$ {{ totalAmount.toFixed(2) }}</div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="payment">Pay</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang=""></style>
