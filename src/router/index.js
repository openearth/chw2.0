import Vue from "vue";
import VueRouter from "vue-router";

// views
const CoastalClassification = () =>
  import(
    /* webpackChunkName: "CoastalClassification" */ "../views/CoastalClassification.vue"
  );
const Mapping = () => import(/* webpackChunkName: "Mapping" */ "../views/Mapping.vue")
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue")
const Legal = () => import(/* webpackChunkName: "Legal" */ "../views/Legal.vue")
const References = () => import(/* webpackChunkName: "References" */ "../views/References.vue")

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/coastal-classification",
    name: "coastal-classification",
    component: CoastalClassification,
    props: true,
  },
  {
    path: "/mapping",
    name: "mapping",
    component: Mapping,
  },
  {
    path: "/legal",
    name: "legal",
    component: Legal,
  },
  {
    path: "/references",
    name: "references",
    component: References,
  },
  /* add refe */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
