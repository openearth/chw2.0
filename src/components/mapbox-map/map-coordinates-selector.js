export default {
  name: "map-coordinates-selector",
  inject: ["getMap"],
  render() {
    return null;
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
  destroyed() {
    this.removeLayer();
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
        const point = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [e.lngLat.lng, e.lngLat.lat],
          },
          properties: {
            id: String(new Date().getTime()),
          },
        };

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

        map.getSource("geojson").setData(this.geojson);
      });

      map.on("mousemove", (e) => {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });

        if (this.drawing && this.points.length) {
          this.linestring.geometry.coordinates = [
            this.points[0].geometry.coordinates,
            [e.lngLat.lng, e.lngLat.lat],
          ];

          this.geojson.features = this.geojson.features.filter(
            (feature) => feature.geometry.type !== "LineString"
          );

          this.geojson.features.push(this.linestring);

          map.getSource("geojson").setData(this.geojson);
        }

        map.getCanvas().style.cursor = features.length
          ? "pointer"
          : "crosshair";
      });
    },
  },
};
