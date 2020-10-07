import Vue from "vue";

export default {
  namespaced: true,

  state: {
    wmsLayers: [],
    layers: [],
    layerVisibilityProxies: [],
    legendLayer: null,
  },

  getters: {
    // layers need to be displayed sorted by z-index, so sort from high to low
    wmsLayers: (state) => state.wmsLayers.sort((a, b) => b.index - a.index),
    legendLayer: (state) => state.legendLayer,
  },

  mutations: {
    ADD_WMS_LAYER(state, newLayer) {
      const layerExists = state.wmsLayers.some(
        (storedLayer) => storedLayer.id === newLayer.id
      );

      if (!layerExists) {
        state.wmsLayers = [...state.wmsLayers, newLayer];
      }
    },
    REMOVE_WMS_LAYER(state, id) {
      state.wmsLayers = state.wmsLayers.filter((layer) => layer.id !== id);
    },
    CLEAR_WMS_LAYERS(state) {
      state.wmsLayers = [];
      state.legendLayer = null;
    },
    SET_LEGEND_LAYER(state, layer) {
      state.legendLayer = layer;
    },
    UPDATE_LAYER_INDEX(state, { id, index }) {
      const wmsLayer = state.wmsLayers.find((layer) => id === layer.id);
      Vue.set(wmsLayer, "index", index);
    },
  },
};
