import Vue from 'vue'
import store from './store'
import router from "./router";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2)

Vue.component('client-app', require('./App.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store,
}).$mount('#app');
