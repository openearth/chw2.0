export default {
  name: "v-mapbox-layer",
  inject: ["getMap"],
  render() {
    return null;
  },
  data() {
    return {
      isInitialized: false,
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
        // if has 1 or more points, reset features
        if (this.geojson.features.length > 1) {
          this.geojson.features = []
        }

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

        this.geojson.features.push(point);

        if (this.geojson.features.length === 2) {
          // emit points before line is drawn
          this.$emit('change', JSON.parse(JSON.stringify(this.geojson.features)))
        }

        
        // draw line 
        if (this.geojson.features.length > 1) {
          this.linestring.geometry.coordinates = this.geojson.features.map(
            (point) => point.geometry.coordinates
          );


          this.geojson.features.push(this.linestring);
        }

        map.getSource("geojson").setData(this.geojson);
      });

      map.on("mousemove", (e) => {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });

        map.getCanvas().style.cursor = features.length
          ? "pointer"
          : "crosshair";
      });
    },
  },
};
