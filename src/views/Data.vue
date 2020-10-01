<template>
  <div>
    <div class="pa-4 pb-0">
      <h2 class="h2">Data</h2>
      <v-divider class="mt-4" />
    </div>
    <data-layers-multiple
      :layers="layers"
      @change="handleChange"
      @reorder="handleReorder"
    />
  </div>
</template>

<script>
import arrayCompare from 'array-compare'
import buildWmsLayer from "@/lib/build-wms-layer";
import arrayMove from "@/lib/array-move";
import findInTree from "@/lib/find-in-tree";
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
    layersWithSortIndex() {
      return this.layers.map((layer, index) => {
        if (layer.children) {
          const inversedIndex = this.inverseIndex(this.layers, index)

          return {
            ...layer,
            children: layer.children.map((child, childIndex) => {
              const inversedChildIndex = this.inverseIndex(layer.children, childIndex)

              return {
                ...child,
                // index is used render layers in order, so highest one gets on top
                index: 10 * inversedIndex + inversedChildIndex,
              }
            }),
          };
        }

        return layer;
      });
    },
  },
  mounted() {
    // console.log(this.layersWithSortIndex)
  },
  destroyed() {
    this.$store.commit("mapbox/CLEAR_WMS_LAYERS") 
  },
  methods: {
    // indexed need to be inversed, so first one gets the highest index
    inverseIndex(arr, index) {
      return arr.length - index 
    }, 
    handleChange(layers) {
      const diff = arrayCompare(this.wmsLayers.map(({ id }) => id), layers.map(({ id }) => id))
      const addedLayers = diff.added.map(({ b })=> layers.find(layer => layer.id === b))
      const addedWmsLayers = addedLayers.map(layer => buildWmsLayer(layer))
      const removedWmsLayers = diff.missing.map(layer => layer.a)

      addedWmsLayers.forEach(wmsLayer => this.$store.commit("mapbox/ADD_WMS_LAYER", wmsLayer))
      removedWmsLayers.forEach(wmsLayer => this.$store.commit("mapbox/REMOVE_WMS_LAYER", wmsLayer))

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
    }
  },
};
</script>
