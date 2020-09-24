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
      const map = this.getMap();

      this.geojson.features = [];
      this.setLineString(value);

      value.forEach((coordinate) => {
        const point = this.generateFeature(coordinate);
        this.geojson.features.push(point);
      });

      map.getSource("geojson")?.setData(this.geojson);
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

      map.on("click", (e) => {
        if (this.disabled) return;

        const point = this.generateFeature([e.lngLat.lng, e.lngLat.lat]);

        // reset for new line
        if (!this.drawing) {
          this.geojson.features = [];
        }

        this.geojson.features.push(point);

        this.$emit("change", this.points);

        if (this.drawing) {
          // emit points when line is drawn

          this.drawing = false;
        }

        if (this.geojson.features.length === 1) {
          this.drawing = true;
        }

        map.getSource("geojson")?.setData(this.geojson);
      });

      map.on("mousemove", (e) => {
        map.getCanvas().style.cursor = this.disabled ? "pointer" : "crosshair";

        if (this.disabled) return;

        if (this.drawing && this.points.length) {
          this.setLineString([
            this.points[0].geometry.coordinates,
            [e.lngLat.lng, e.lngLat.lat],
          ]);
        }
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
