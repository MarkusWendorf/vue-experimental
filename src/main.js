import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

// should check Promise / Errors
navigator.serviceWorker.register('/sw.js', { scope: '/' });

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
