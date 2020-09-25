import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vue2MapboxGL from "vue2mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import router from './router'
import store from './store'

import './main.css'

Vue.config.productionTip = false

Vue.use(Vue2MapboxGL);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
