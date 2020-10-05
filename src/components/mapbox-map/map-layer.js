export default {
  name: 'v-mapbox-layer',
  inject: ['getMap'],
  render() {
    return null;
  },
  props: {
    options: {
      default: () => {
        return {};
      },
      type: [Object, String]
    },
  },
  data() {
    return {
      // used to determine if mounted or deferredMountedTo should be used
      isInitialized: false
    };
  },
  // watch props and rerender if they change
  watch: {
    options() {
      this.rerender()
    }
  },
  mounted() {
    // only execute when map is available and layer is not already initialized
    if (this.getMap()) {
      this.rerender();
      this.isInitialized = true;
    }
  },
  destroyed() {
    this.removeLayer();
  },
  updated() {
    console.log('updated')
    this.moveLayer()
  },
  methods: {
    deferredMountedTo() {
      // only execute when layer is not already initialized
      if (!this.isInitialized) {
        this.rerender();
        this.isInitialized = true;
      }
    },
    removeLayer() {
      const map = this.getMap();
      if (map) {
        const layer = map.getLayer(this.options.id);

        if (layer) {
          map.removeLayer(this.options.id);
          try {
            map.removeSource(layer.source);
          } catch {
            console.warn('could not remove source', layer.source);
          }
        }
      }
    },
    addLayer() {
      const map = this.getMap();

      if (this.before && map.getLayer(this.before)) {
        map.addLayer(this.options, this.before);
      } else {
        map.addLayer(this.options);
      }

      this.moveLayer()
    },
    rerender() {
      this.removeLayer();
      this.addLayer();
    },
  }
};