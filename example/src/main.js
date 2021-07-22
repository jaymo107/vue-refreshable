import Vue from 'vue'
import App from './App.vue'
import Refreshable from 'vue-refreshable';

Vue.config.productionTip = false

Vue.use(Refreshable);

new Vue({
  render: h => h(App),
}).$mount('#app')
