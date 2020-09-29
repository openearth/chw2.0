import Vue from "vue";
import VueRouter from "vue-router";
import Modelling from "../views/Modelling.vue";
import Data from "../views/Data.vue";
import Home from "../views/Home.vue";
import Legal from "../views/Legal.vue";
import CoastalClassification from "../views/CoastalClassification.vue";
import HazardMaps from "../views/HazardMaps.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/modelling",
    name: "modelling",
    component: Modelling,
    props: true,
    children: [
      {
        path: "coastal-classification",
        component: CoastalClassification,
        name: "coastal-classification",
      },
      {
        path: "hazard-maps",
        component: HazardMaps,
        name: "hazard-maps",
      },
    ],
  },
  {
    path: "/data",
    name: "data",
    component: Data,
  },
  {
    path: "/legal",
    name: "legal",
    component: Legal,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
