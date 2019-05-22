import Vue from 'vue'
import 'bootstrap'
import './plugins/axios'
import './plugins/jwt' 
import './plugins/moment' 
import './plugins/helper' 

import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
