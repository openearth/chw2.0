<template>
  <div>
    <data-layers-single
      :layers="layers"
      @change="handleChange"
    />
  </div>
</template>

<script>
import buildWmsLayer from "@/lib/build-wms-layer";
import DataLayersSingle from "@/components/data-layers-single";

import layers from "@/data/hazardlayers.json";

export default {
  components: {
    DataLayersSingle
  },
  data() {
    return {
      layers
    };
  },
  destroyed() {
    this.$store.commit("mapbox/CLEAR_WMS_LAYERS") 
  },
  methods: {
    handleChange(layer) {
      const wmsLayer = buildWmsLayer(layer)
      this.$store.commit("mapbox/CLEAR_WMS_LAYERS") 
      this.$store.commit("mapbox/SET_LAYERS", [wmsLayer]) 
      this.$store.commit("mapbox/SET_LEGEND_LAYER", layer.id) 
    },
  }
};
</script>
