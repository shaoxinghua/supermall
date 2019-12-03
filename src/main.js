import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body);

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
