<template>
  <div>
    <div class="pa-4 pb-0">
      <h2 class="h2">Data</h2>
      <v-divider class="mt-4" />
    </div>
    <data-layers-multiple
      :layers="layers"
      @change="handleChange"
    />
  </div>
</template>

<script>
import arrayCompare from 'array-compare'
import buildWmsLayer from "@/lib/build-wms-layer";
import DataLayersMultiple from "@/components/data-layers-multiple";

import layers from "@/data/datalayers.json";

export default {
  components: {
    DataLayersMultiple,
  },
  data() {
    return {
      layers,
    };
  },
  computed: {
    wmsLayers() {
      return this.$store.getters["mapbox/wmsLayers"]
    },
  },
  destroyed() {
    this.$store.commit("mapbox/CLEAR_WMS_LAYERS") 
  },
  methods: {
    handleChange(layers) {
      const diff = arrayCompare(this.wmsLayers.map(({ id }) => id), layers.map(({ id }) => id))
      const addedLayers = diff.added.map(({ b })=> layers.find(layer => layer.id === b))
      const addedWmsLayers = addedLayers.map(layer => buildWmsLayer(layer))
      const removedWmsLayers = diff.missing.map(layer => layer.a)

      addedWmsLayers.forEach(wmsLayer => this.$store.commit("mapbox/ADD_WMS_LAYER", wmsLayer))
      removedWmsLayers.forEach(wmsLayer => this.$store.commit("mapbox/REMOVE_WMS_LAYER", wmsLayer))
    },
  },
};
</script>
