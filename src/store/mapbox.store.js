export default {
  namespaced: true,

  state: {
    wmsLayers: [],
    layerVisibilityProxies: [],
    legendLayer: "ra2ce:erosieafschuivingwegtalud_stremmingskosten",
  },

  getters: {
    wmsLayers: (state) => state.wmsLayers,
    legendLayer: (state) => state.legendLayer,
  },

  mutations: {
    ADD_WMS_LAYER(state, newLayer) {
      const layerExists = state.wmsLayers.some(storedLayer => storedLayer.id === newLayer.id);

      if(!layerExists) {
        state.wmsLayers = [
          ...state.wmsLayers, 
          newLayer
        ];
      }
    },
    REMOVE_WMS_LAYER(state, id) {
      state.wmsLayers = state.wmsLayers.filter((layer) => layer.id !== id);
    },
    SET_LEGEND_LAYER(state, layer) {
      state.legendLayer = layer;
    },
  },
};
