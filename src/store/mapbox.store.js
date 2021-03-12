import Vue from "vue";

export default {
  namespaced: true,

  state: {
    wmsLayers: [],
    layers: [],
    layerVisibilityProxies: [],
    legendLayer: null,
    hazardLegendLayer: null,
    legendUrl: null,
    hazardLegendUrl: null,
    wmsHazardLayers: [],
  },
  getters: {
    hazardLegendLayer: state => state.hazardLegendLayer,
    hazardLegendUrl: state => state.hazardLegendUrl,

  },
  mutations: {
    SET_LAYERS(state, layers) {
      state.wmsLayers = layers
    },
    ADD_WMS_HAZARD_LAYER(state, newLayer) {
      const layerExists = state.wmsHazardLayers.some(storedLayer => storedLayer.id === newLayer.id);

      if(!layerExists) {
        state.wmsHazardLayers = [
          ...state.wmsHazardLayers, 
          newLayer
        ];
      }
    },
    CLEAR_WMS_LAYERS(state) {
      state.wmsLayers = [];
      state.legendLayer = null;
    },
    CLEAR_WMS_HAZARD_LAYERS(state) {
      state.wmsHazardLayers = [];
      // add also the legendLayer after.
    },
    SET_LEGEND_LAYER(state, layer) {
      state.legendLayer = layer;
    },
    SET_LEGEND_URL(state, url) {
      state.legendUrl = url;
    },
    SET_HAZARD_LEGEND_LAYER(state, layer) {
      state.hazardLegendLayer = layer;
    },
    SET_HAZARD_LEGEND_URL(state, url) {
      state.hazardLegendUrl = url;
    },
    UPDATE_LAYER_INDEX(state, { id, index }) {
      const wmsLayer = state.wmsLayers.find((layer) => id === layer.id);
      Vue.set(wmsLayer, "index", index);
    },
  },
};
