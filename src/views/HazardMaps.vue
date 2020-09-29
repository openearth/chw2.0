<template>
  <div>
    <data-layers
      :layers="layers"
      @change="handleChange"
    />
  </div>
</template>

<script>
import buildWmsLayer from "@/lib/build-wms-layer";
import DataLayers from "@/components/data-layers";

import layers from "@/data/hazardlayers.json";

export default {
  components: {
    DataLayers
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
      this.$store.commit("mapbox/ADD_WMS_LAYER", wmsLayer) 
    },
  }
};
</script>
