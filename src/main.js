import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { VueTypedJs } from 'vue-typed-js'
import Vue2Editor from 'vue2-editor'
import axios from 'axios'
axios.defaults.baseURL='http://127.0.0.1:8000/api'
Vue.config.productionTip = false
Vue.use(Vue2Editor);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(VueTypedJs)
