import Vue from "vue";

export default {
  namespaced: true,

  state: {
    wmsLayers: [],
    layers: [],
    layerVisibilityProxies: [],
    legendLayer: null,
    legendUrl: null,
  },
  mutations: {
    SET_LAYERS(state, layers) {
      state.wmsLayers = layers
    },
    CLEAR_WMS_LAYERS(state) {
      state.wmsLayers = [];
      state.legendLayer = null;
    },
    SET_LEGEND_LAYER(state, layer) {
      state.legendLayer = layer;
    },
    SET_LEGEND_URL(state, url) {
      state.legendUrl = url;
    },
    UPDATE_LAYER_INDEX(state, { id, index }) {
      const wmsLayer = state.wmsLayers.find((layer) => id === layer.id);
      Vue.set(wmsLayer, "index", index);
    },
  },
};
