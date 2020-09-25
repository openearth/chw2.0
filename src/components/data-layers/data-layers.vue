<template>
  <div>
    <div>
      <v-app id="inspire">
        <v-container fluid>
          <v-row align="center">
            <v-expansion-panels :multiple="true" :flat="true">
              <v-expansion-panel v-for="folder in layers" :key="folder.name">
                <v-expansion-panel-header>{{ folder.name }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <ul class="layers-list">
                    <li class="layers-list__item" v-for="layer in folder.layers" :key="layer.id">
                      <v-btn text icon @click.stop="$emit('updateVisibility', layer.id)">
                        <v-icon>{{ layer.visible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                      </v-btn>
                      <v-btn text icon @click.stop="$emit('updateLegend', layer.layer)">
                        <v-icon>{{ layer.layer === legendLayer ? 'mdi-card-bulleted' : 'mdi-card-bulleted-off' }}</v-icon>
                      </v-btn>
                      <span class="risks-list__item-title">{{ layer.id }}</span>
                    </li>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-app>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    layers: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      wmsLayers: state => state.mapbox.wmsLayers
    }),
    ...mapGetters({
      legendLayer: "mapbox/legendLayer"
    })
  }
};
</script>

<style>
.layers-list {
  padding: 0 !important;
  list-style: none outside none;
  border-top: thin solid #eee;
}

.layers-list__item {
  padding: 0.5rem 0;
  border-bottom: thin solid #eee;
}

.layers-list__item-title {
  text-transform: capitalize;
}
</style>