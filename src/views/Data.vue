<template>
  <div>
    <div class="pa-4 pb-0">
      <h2 class="h2">Data</h2>
      <v-divider class="mt-4" />
    </div>
    <data-layers-multiple
      :layers="layers"
      :activeLegend="legendLayer"
      @change="handleChange"
      @legendChange="handleLegendChange"
      @reorder="handleReorder"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import arrayCompare from 'array-compare'
import buildWmsLayer from "@/lib/build-wms-layer";
import arrayMove from "@/lib/array-move";
import findInTree from "@/lib/find-in-tree";
import addZIndex from "@/lib/add-z-index";
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
    ...mapState({
      legendLayer: state => state.mapbox.legendLayer
    }),
    wmsLayers() {
      return this.$store.getters["mapbox/wmsLayers"]
    },
    layersWithSortIndex() {
      return addZIndex(this.layers)
    },
  },
  destroyed() {
    this.$store.commit("mapbox/CLEAR_WMS_LAYERS") 
  },
  methods: {
    ...mapMutations({
      SET_LEGEND_LAYER: 'mapbox/SET_LEGEND_LAYER'
    }),
    handleChange(layers) {
      const diff = arrayCompare(this.wmsLayers.map(({ id }) => id), layers.map(({ id }) => id))
      const addedLayers = diff.added.map(({ b })=> layers.find(layer => layer.id === b))
      const addedWmsLayers = addedLayers.map(layer => buildWmsLayer(layer))
      const removedWmsLayers = diff.missing.map(layer => layer.a)

      addedWmsLayers.forEach(wmsLayer => this.$store.commit("mapbox/ADD_WMS_LAYER", wmsLayer))
      removedWmsLayers.forEach(wmsLayer => this.$store.commit("mapbox/REMOVE_WMS_LAYER", wmsLayer))

      if (layers.length === 1) {
        this.SET_LEGEND_LAYER(layers[0].id)
      }

      if (removedWmsLayers.includes(this.legendLayer)) {
        this.SET_LEGEND_LAYER(null)
      }

      this.setStoreIndexes()
    },
    handleReorder(values) {
      this.handleStateReorder(values)
      this.setStoreIndexes()
    },
    handleStateReorder({ oldDraggableIndex, newDraggableIndex, parentId }) {
      const list = parentId ? this.layers.find(({ id }) => parentId === id).children : this.layers
      arrayMove(list, oldDraggableIndex, newDraggableIndex)
    },
    setStoreIndexes() {
      this.wmsLayers.forEach(wmsLayer => {
        const layerInState = findInTree(this.layersWithSortIndex, 'id', wmsLayer.id)
        this.$store.commit('mapbox/UPDATE_LAYER_INDEX', { id: wmsLayer.id, index: layerInState.index })
      })
    },
    handleLegendChange(id) {
      this.SET_LEGEND_LAYER(id)
    }
  },
};
</script>
