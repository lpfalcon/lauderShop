import { createStore } from 'vuex'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URLS
const updateLocalStorageCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}
const updateLocalStorageCreditCard = (creditCard) => {
  localStorage.setItem('creditCard', JSON.stringify(creditCard))
}

export default createStore({
  state: {
    products: [],
    cart: {},
    creditCardData: {}
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setToCart(state, payload) {
      state.cart[payload.id] = payload
      updateLocalStorageCart(state.cart)
    },
    setCreditCardData(state, payload) {
      state.creditCardData = payload
      updateLocalStorageCreditCard(payload)
    },
    setCartInfo(state, payload) {
      state.cart = payload
      updateLocalStorageCart(payload)
    },
    setEmptyCart(state) {
      state.cart = {}
      updateLocalStorageCart({})
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      return fetch(`${API_BASE_URL}/products`).then((response) => {
        commit('setProducts', response)
        return response
      })
    },
    addToCart({ commit, state }, product) {
      if (Object.prototype.hasOwnProperty.call(state.cart, product.id)) {
        product.quantity = state.cart[product.id].quantity + 1
      } else {
        product.quantity = 1
      }

      commit('setToCart', product)
    },
    setCartValueFromLocalStorage({ commit }) {
      const localStorageCart = localStorage.getItem('cart')
      if (localStorageCart) {
        commit('setCartInfo', JSON.parse(localStorageCart))
      }
    },
    setCreditCardFromLocalStorage({ commit }) {
      const localStorageCard = localStorage.getItem('creditCard')
      if (localStorageCard) {
        commit('setCreditCardData', JSON.parse(localStorageCard))
      }
    }
  },
  getters: {
    totalAmount(state) {
      return Object.values(state.cart).reduce(
        (acc, { quantity, price }) => acc + quantity * price,
        0
      )
    }
  },
  modules: {}
})
