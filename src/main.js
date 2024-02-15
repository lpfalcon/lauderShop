import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueCreditCardValidation from 'vue-credit-card-validation';

import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";

import router from './router'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueCreditCardValidation);
app.use(VueSweetalert2);

app.mount('#app')

import "bootstrap/dist/js/bootstrap.min";
