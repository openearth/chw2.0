import Vue from "vue";
import Vuex from "vuex";

import mapbox from "./mapbox.store";
import selection from "./selection.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    acceptedLegal: false 
  },
  mutations: {
    SET_ACCEPTED_LEGAL(state, value) {
      state.acceptedLegal = value;
    }
  },
  modules: {
    mapbox,
    selection,
  },
});
