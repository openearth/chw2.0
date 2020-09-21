import Vue from 'vue'
import VueRouter from 'vue-router'
import Modelling from "../views/Modelling.vue";
import Data from "../views/Data.vue";
import Sources from "../views/Sources.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/modelling',
    name: 'modelling',
    component: Modelling,
  },
  {
    path: '/data',
    name: 'data',
    component: Data
  },
  {
    path: '/sources',
    name: 'sources',
    component: Sources
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
