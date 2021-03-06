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
  },
  computed: {
    points() {
      return this.geojson.features.filter(
        (feature) => feature.geometry.type === "Point"
      );
    },
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
  },
};
