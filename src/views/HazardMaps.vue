<template>
  <div>
    <data-layers
      :layers="layers"
      @showLayer="handleShowLayer"
      @hideLayer="handleHideLayer"
    ></data-layers>
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
  methods: {
    handleShowLayer(layer) {
      const wmsLayer = buildWmsLayer(layer)
      this.$store.commit("mapbox/ADD_WMS_LAYER", wmsLayer) 
    },
    handleHideLayer(id) {
      this.$store.commit("mapbox/REMOVE_WMS_LAYER", id) 
    }
  }
};
</script>
