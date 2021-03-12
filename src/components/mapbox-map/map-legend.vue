<template>
  <div class="layer-legend">
    <img
      :src="legendUrl"
      class="layer-legend__image"
      alt="legend"
    >
  </div>
</template>

<script>
import buildLegendUrl from '@/lib/build-legend-url';
import debounce from 'lodash/debounce'

export default {
  inject: ["getMap"],
  props: {
    legendLayer: {
      type: String,
      required: true
    },
    geoserverUrl: { 
      type: String, 
      required: true
    }

  },
  data() {
    return {
      scale: 0,
      initialized: false
    }
  },
  computed: {
    legendUrl() {
      return buildLegendUrl(this.legendLayer, 40, 20, this.scale, this.geoserverUrl);
    },
  },
  mounted() {
    if (!this.initialized && this.getMap()) {
      this.addZoomListener()
      this.initialized = true
    }
  },
  methods: {
    deferredMountedTo() {
      if (!this.initialized) {
        this.addZoomListener()
        this.initialized = true
      }
    },
    addZoomListener() {
      const map = this.getMap()

      this.calculateScale()
  
      map.on('zoom', () => {
        this.calculateScale()
      })
    },
    calculateScale: debounce(function () {
      const map = this.$root.map
      const left = map.unproject([0, 0]);
      const right = map.unproject([1, 0]);
      const kmPerPixel = left.distanceTo(right)
      const mPerPixel = kmPerPixel * 1000

      this.scale = Math.ceil(mPerPixel)
    }, 200),
  }
};
</script>

<style>
  .layer-legend {
    position: absolute;
    bottom: 2rem;
    left: .5rem;
    background-color: white;
    outline: 0;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .layer-legend__image {
    height: 100%;
    border-radius: 4px;
  }
</style>
