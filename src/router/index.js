import Vue from 'vue'
import VueRouter from 'vue-router'
import Modelling from "../views/Modelling.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Modelling',
    component: Modelling
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
