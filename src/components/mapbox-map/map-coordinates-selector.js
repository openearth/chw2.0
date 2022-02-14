import { mapState } from "vuex";
export default {
  name: "map-coordinates-selector",
  inject: ["getMap"],
  render() {
    return null;
  },
  props: {
    coordinates: {
      type: Array,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: true,
    },

  },
  data() {
    return {
      isInitialized: false,
      drawing: false,
      geojson: {
        type: "FeatureCollection",
        features: [],
      },
      linestring: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    };
  },
  watch: {
    coordinates(value) {
      if (value) {
        const map = this.getMap();
  
        this.geojson.features = [];
        this.setLineString(value);
  
        value.forEach((coordinate) => {
          const point = this.generateFeature(coordinate);
          this.geojson.features.push(point);
        });
  
        map.getSource("geojson")?.setData(this.geojson);
      }
    },
    notification() {
      this.removeNotification(this.notification)
      this.addNotification(this.notification)
    }
  },
  computed: {
    points() {
      return this.geojson.features.filter(
        (feature) => feature.geometry.type === "Point"
      );
    },
    ...mapState({
      notification:(state) => state.selection.notification, 
    }),
  },
  mounted() {
    
    if (this.getMap()) {
      this.rerender();
      this.isInitialized = true;
    }
  },
  methods: {
    deferredMountedTo() {
      if (!this.isInitialized) {
        this.rerender();
        this.isInitialized = true;
      }
    },
    rerender() {
      const map = this.getMap();

      map.addSource("geojson", {
        type: "geojson",
        data: this.geojson,
      });

      // Add styles to the map
      map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 5,
          "circle-color": "#000",
        },
        filter: ["in", "$type", "Point"],
      });

      map.addLayer({
        id: "measure-lines",
        type: "line",
        source: "geojson",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#000",
          "line-width": 2.5,
        },
        filter: ["in", "$type", "LineString"],
      });
     



    },
    generateFeature(coordinates) {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates,
        },
        properties: {
          id: String(new Date().getTime()),
        },
      };
    },
    setLineString(coordinates) {
      const map = this.getMap();

      this.linestring.geometry.coordinates = coordinates;

      this.geojson.features = this.geojson.features.filter(
        (feature) => feature.geometry.type !== "LineString"
      );

      this.geojson.features.push(this.linestring);

      map.getSource("geojson")?.setData(this.geojson);
    },
    addNotification(notification) {
      const map = this.getMap();
      if (notification) {
        map.addLayer({
          id: "exception-message",
          type: "symbol",
          source: "geojson",
          layout: {
            "symbol-placement": "point",
            "text-padding": 40,
            "text-field": notification,
            'text-justify': 'left',
            'text-offset': [6,6],
            "text-max-width": 40,
            "text-size": 12,
            'text-font': [
              'literal',
              ["Open Sans Regular", "Arial Unicode MS Regular"]
            ]
          },
          minzoom: 6
      });
      }

    },
    removeNotification() {
      const map = this.getMap();
      const exceptionLayer = map.getLayer("exception-message");
      if (exceptionLayer) {
        map.removeLayer("exception-message");
      }
    }
  },
};
