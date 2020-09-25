<template>
  <div>
    <div class="pa-4">
      <h2 class="h2">Data</h2>
      <v-divider class="mt-4 mb-4" />
    </div>
    <data-layers
      :layers="visibleLayers"
      @updateVisibility="onVisibilityChange"
      @updateLegend="onLegendChange"
    ></data-layers>
  </div>
</template>

<script>
import buildWmsLayer from "@/lib/build-wms-layer";
import DataLayers from "@/components/data-layers";
import { mapGetters } from "vuex";
import layers from "@/data/datalayers.json";
export default {
  components: {
    DataLayers
  },
  data() {
    return {
      layers
    };
  },
  computed: {
    ...mapGetters({
      layersWithVisibility: "mapbox/layersWithVisibility"
    }),
    visibleLayers() {
      console.log("layerswithvisibility", this.layersWithVisibility);
      return this.layers.map(folder => {
        folder.layers = folder.layers.map(layer => {
          const layerWithVisibility = this.layersWithVisibility.find(
            item => item.id === layer.id
          );
          layer.visible = layerWithVisibility.visible;
          return layer;
        });
        return folder;
      });
    }
  },
  created() {
    this.$store.commit("mapbox/SET_LEGEND_LAYER", null);
    this.layers.forEach(name => {
      name.layers.map(buildWmsLayer).forEach(layer => {
        this.$store.commit("mapbox/ADD_WMS_LAYER", layer);
      });
    });
  },
  methods: {
    onVisibilityChange(id) {
      const map = this.$root.map;
      this.$store.commit("mapbox/UPDATE_LAYER_VISIBILITY", { id, map });
    },
    onLegendChange(layer) {
      this.$store.commit(
        "mapbox/SET_LEGEND_LAYER",
        this.legendLayer === layer ? null : layer
      );
    }
  }
};
</script>
    
<style>
</style>