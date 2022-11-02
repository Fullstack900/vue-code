import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Breadcrumbs from './components/bread_crumbs'
import { store } from './store';
import VueFeather from 'vue-feather';

import PxCard  from './components/Pxcard.vue'
Vue.component(PxCard.name, PxCard)

// Import Theme scss
import './assets/scss/app.scss'


Vue.use(VueFeather);
Vue.use(BootstrapVue)
Vue.component('Breadcrumbs', Breadcrumbs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')