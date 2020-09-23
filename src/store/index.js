import Vue from "vue";
import Vuex from "vuex";
import FileSaver from "file-saver";
import pick from "lodash/pick";

import mapbox from "./mapbox.store";
import selection from "./selection.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mapbox,
    selection,
  },
  state: {
    acceptedLegal: false 
  },
  mutations: {
    SET_ACCEPTED_LEGAL(state, value) {
      state.acceptedLegal = value;
    }
  },
  actions: {
    saveProject({ state }) {
      const map = {
        center: window.__map.getCenter(),
        zoom: window.__map.getZoom()
      }

      const project = {
        selection: pick(state.selection, 'coordinates'),
        map
      };

      const title = "chw_project";

      const blob = new Blob([JSON.stringify(project, null, 2)], {
        type: "application/json",
      });

      FileSaver.saveAs(blob, `${title}.json`);
    }
  }
});
