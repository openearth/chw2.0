import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vue2MapboxGL from "vue2mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

Vue.config.productionTip = false

Vue.use(Vue2MapboxGL);

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
