<template>
  <div>
    <div class="pa-4 pb-0">
      <h2 class="h2">Hazards (load maps)</h2>
      <v-divider class="mt-4" />
  </div>
    <data-layers-single
      :layers="hazardlayers"
      :activeLegendLayer="hazardLegendLayer || ''"
      @change="handleChangeHazard"
      @updateLegend="onLegendChange"
    />
    <div class="pa-4 pb-0">
      <h2 class="h2">Data</h2>
      <v-divider class="mt-4" />
    </div>
    <layer-list
      :layers="layers"
      :active-legend="legendLayer"
      @change="handleChange"
      @legendChange="handleLegendChange"
      @geoserverUrlChange="handleGeoserverUrlChange"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import buildWmsLayer from "@/lib/build-wms-layer";
import LayerList from "@/components/layer-list";
import DataLayersSingle from "@/components/data-layers-single";

import layers from "@/data/datalayers.json";
import hazardlayers from "@/data/hazardlayers.json";


export default {
  components: {
    LayerList,
    DataLayersSingle,
  },
  data() {
    return {
      layers,
      hazardlayers,
    };
  },
  computed: {
    ...mapState({
      legendLayer: state => state.mapbox.legendLayer,
      wmsLayers: state => state.mapbox.wmsLayers
    }),
    hazardLegendLayer() {
      return this.$store.getters['mapbox/hazardLegendLayer'];
    },
    hazardLegendUrl() {
      return this.$store.getters['mapbox/hazardLegendUrl'];
    },
  },
  destroyed() {
    this.$store.commit("mapbox/CLEAR_WMS_LAYERS") 
    this.$store.commit("mapbox/CLEAR_WMS_HAZARD_LAYERS")
  },
  methods: {
    ...mapMutations({
      SET_LEGEND_LAYER: 'mapbox/SET_LEGEND_LAYER',
      SET_LEGEND_URL: 'mapbox/SET_LEGEND_URL',
      SET_LAYERS: 'mapbox/SET_LAYERS'
    }),
    handleChange(layers) {
      this.SET_LAYERS(layers.map(buildWmsLayer))

      // if no layer is selected, set active layer to null
      if (!layers.length) {
        this.SET_LEGEND_LAYER(null)
        this.SET_LEGEND_URL(null)
      }

      // if there is only 1 layer selected or the legend layer is not selected anymore 
      if (layers.length === 1 || !layers.map(layer => layer.id).includes(this.legendLayer)) {
        this.SET_LEGEND_LAYER(layers[0].id)
        this.SET_LEGEND_URL(layers[0].url)
      }
    },
    handleChangeHazard(layer) {
      const wmsLayer = buildWmsLayer(layer)
      this.$store.commit("mapbox/CLEAR_WMS_HAZARD_LAYERS")  
      this.$store.commit("mapbox/ADD_WMS_HAZARD_LAYER", wmsLayer) 
      this.$store.commit("mapbox/SET_HAZARD_LEGEND_URL", layer.url)
      this.$store.commit('mapbox/SET_HAZARD_LEGEND_LAYER',layer.layer)

    },
    handleLegendChange(id) {
      this.SET_LEGEND_LAYER(id)
    },
    handleGeoserverUrlChange(url) {
      this.SET_LEGEND_URL(url)
    },
    onLegendChange(layer) {
      this.$store.commit('mapbox/SET_HAZARD_LEGEND_LAYER', this.hazardLegendLayer === layer.layer ? null : layer.layer)
      this.$store.commit('mapbox/SET_HAZARD_LEGEND_URL', this.hazardLegendUrl === layer.url ? null : layer.url)
    },

  },


};
</script>
