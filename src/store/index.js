import Vue from "vue";
import Vuex from "vuex";

import mapbox from "./mapbox.store";
import selection from "./selection.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mapbox,
    selection,
  },
});
