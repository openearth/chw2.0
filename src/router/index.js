import Vue from "vue";
import VueRouter from "vue-router";

// views
const Modelling = () => import(/* webpackChunkName: "Modelling" */ "../views/Modelling.vue")
const Data = () => import(/* webpackChunkName: "Data" */ "../views/Data.vue")
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue")
const Legal = () => import(/* webpackChunkName: "Legal" */ "../views/Legal.vue")
const CoastalClassification = () => import(/* webpackChunkName: "CoastalClassification" */ "../views/CoastalClassification.vue")
const HazardMaps = () => import(/* webpackChunkName: "HazardMaps" */ "../views/HazardMaps.vue")

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
