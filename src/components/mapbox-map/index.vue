<template>
  <div class="mapbox-map">
    <v-mapbox
      class="mapbox-map__map"
      :access-token="mapBoxToken"
      :map-style="mapConfig.style"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      @mb-created="onMapCreated"
      id="map"
      ref="map"
    >
      <!-- Map Controls -->
      <v-mapbox-geocoder />
      <v-mapbox-navigation-control :options="navigationOptions" position="bottom-right" />
      <map-control-baselayer :layers="mapBaseLayers" position="bottom-right" />
      <map-control-fitbounds :fitToBounds="fitToBounds" position="bottom-right" />

      <!-- Line draw interaction -->
      <map-coordinates-selector
        v-if="lineCoordinates"
        :disabled="!selectionEnabled"
        :coordinates="lineCoordinates"
        :exceptionMessage="notification"
      />
      <!-- Map Layers -->

      <map-layer
        v-for="layer in wmsHazardLayers"
        :key="layer.id"
        :options="layer"
      />
      <map-legend v-if="hazardLegendLayer" :legendLayer="hazardLegendLayer" :geoserverUrl="hazardLegendUrl" />
      <map-layer
        v-for="layer in wmsLayers"
        :key="layer.id"
        :options="layer"
        :before="wmsHazardId"
      />

      <map-legend v-if="legendLayer" :legendLayer="legendLayer" :geoserverUrl="legendUrl" /> 
      
    </v-mapbox>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT, MAP_BASELAYERS } from '@/lib/constants';
import MapLayer from './map-layer.js';
import MapCoordinatesSelector from './map-coordinates-selector.js';
import MapControlBaselayer from './map-control-baselayer';
import MapControlFitbounds from './map-control-fitbounds';
import MapLegend from './map-legend';
import mapboxgl from 'mapbox-gl'


export default {
  components: {
    MapLayer,
    MapCoordinatesSelector,
    MapControlBaselayer,
    MapControlFitbounds,
    MapLegend,
  },
  computed: {
    ...mapState({
      lineCoordinates: (state) => state.selection.lineCoordinates,
      notification:(state) => state.selection.notification, 
      selectionEnabled: (state) => state.selection.enabled,
      wmsLayers: (state) => state.mapbox.wmsLayers,
      wmsHazardLayers: (state) => state.mapbox.wmsHazardLayers,
      legendLayer: (state) => state.mapbox.legendLayer,
      legendUrl: (state) => state.mapbox.legendUrl ,
      hazardLegendUrl: (state) => state.mapbox.hazardLegendUrl,
      hazardLegendLayer: (state) => state.mapbox.hazardLegendLayer,
    }),
   
    mapBoxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN; 
    },
    mapConfig() {
      return {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        style: MAP_BASELAYER_DEFAULT.style
      };
    },
    mapBaseLayers() {
      return MAP_BASELAYERS;
    },

  },
  data () {
    return {
      wmsHazardId: null,
      navigationOptions: {
        showCompass: false
      }
    };
  },
  watch: {
    wmsLayers() {
      this.sortLayers() 
    },
    wmsHazardLayers() {
      if (this.wmsHazardLayers.length) {
        this.wmsHazardId = this.wmsHazardLayers[0].id
      }
    },
    lineCoordinates() {
      // zoom to extent of transect
      
      if (this.lineCoordinates) {
        this.zoomToLineExtent()
      }  
    }
  },
  mounted() {
    const { map } = this.$root

    window.__map = map

    map.on('click', this.handleMapClick)
    // disable map rotation using right click + drag
    map.dragRotate.disable();
 
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    // show crosshair cursor if we're on the coastal classification route
    if (this.$route.name === 'coastal-classification') {
      map.getCanvas().style.cursor = "crosshair";
    }
  },
  methods: {
    ...mapMutations({
      setSelectedCoordinate: "selection/SET_SELECTED_COORDINATE",
      setLineCoordinates: "selection/SET_LINE_COORDINATES"
    }),
    handleMapClick(event) {
      const coordinates = Object.values(event.lngLat)
      this.setSelectedCoordinate(coordinates)
    },
    onMapCreated(map) {
      this.$root.map = map;
      map.on("load", () => {
        this.$root.mapLoaded = true;
      });
    },
    fitToBounds() {
      this.$root.map.flyTo({
        center: this.mapConfig.center,
        zoom: this.mapConfig.zoom
      });
    },
    handleSelectionUpdated(features) {
      this.setCoordinates(
        features.map(feature => feature.geometry.coordinates)
      );
    },
    // makes sure the layers are rendered in the order or the wmsLayers array
    // position 1 gets rendered on top, 2 below that etc.
    sortLayers() {
      const { map } = this.$root

      // processing needs te be done in order, otherwise the internal layer order
      // of mapbox will be messed up
      this.wmsLayers.map(async (layer, index) => {
        
        const before = this.wmsLayers[index - 1] && this.wmsLayers[index - 1].id
        const hazardId = this.wmsHazardLayers[0] && this.wmsHazardLayers[0].id
  
        // wait until layers are both loaded before proceeding
        await Promise.all([layer.id, before, hazardId].map(async id => {
          await this.layerLoaded(id)  
        }))
        
        map.moveLayer(layer.id, hazardId);
        map.moveLayer(layer.id, before);
        
        
      })
    },
    // zooms to the enxtent of the created transect
    zoomToLineExtent() {
      var sw = new mapboxgl.LngLat(this.lineCoordinates[0][0], this.lineCoordinates[0][1]);
      var ne = new mapboxgl.LngLat(this.lineCoordinates[1][0], this.lineCoordinates[1][1]);
      var llb = new mapboxgl.LngLatBounds(sw, ne);
      this.$root.map.fitBounds(llb, {
        padding: 100,
        maxZoom: 12
      })
  },
    // listens for when a layer is loaded by mapbox
    async layerLoaded(id) {
      const { map } = this.$root

      if (!map.getLayer(id)) {
        // we need to wait for when a layer is loaded, hence the Promise
        await new Promise((resolve) => {
          this.cb = e => {
            // check if the loaded layer has the current id
            if (e.sourceDataType === 'metadata' && e.sourceId === id) {
              resolve()
            }

            // remove callback since it will likely be re-added later
            map.off('sourcedata', this.cb)
          }

          // add callback when sourcedata is updated
          map.on('sourcedata', this.cb);
        })
      }
    }
  },
};
</script>

<style>
.mapbox-map {
  height: 100%;
  width: 100%;
}

.mapbox-map__map {
  height: 100%;
  width: 100%;
}
</style>
