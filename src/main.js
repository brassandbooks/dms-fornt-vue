import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueJWT from 'vuejs-jwt'
import JsonExcel from "vue-json-excel";



Vue.config.productionTip = false
Vue.use(VueJWT)
Vue.component("downloadExcel", JsonExcel);


new Vue({
  router,
  store,
  vuetify,


  render: h => h(App)
}).$mount('#app')
