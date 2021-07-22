import Vue from 'vue'
import App from './App.vue'
import Refreshable from '../../src/vueRefreshable';

Vue.config.productionTip = false

Vue.use(Refreshable);

new Vue({
  render: h => h(App),
}).$mount('#app')
