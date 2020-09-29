<template>
  <div>
    <div>
      <v-app id="inspire">
        <v-container fluid>
          <v-row align="center">
            <v-expansion-panels :multiple="true" :flat="true" v-model="panels">
              <v-expansion-panel v-for="folder in layers" :key="folder.name" >
                <v-expansion-panel-header>{{ folder.name }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <ul class="layers-list">
                    <li class="layers-list__item" v-for="layer in folder.layers" :key="layer.id">
                      <v-btn text icon @click.stop="toggleLayer(layer)">
                        <v-icon>{{ visibleLayers.includes(layer.id) ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                      </v-btn>
                      <span class="risks-list__item-title">{{ layer.name }}</span>
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
export default {
  props: {
    layers: {
      type: Array,
      required: true
    }
  },
  data() {
    return  {
      panels: [],
      visibleLayers: []
    }
  },
  mounted() {
    this.panels = [...Array(this.layers).keys()].map((k, i) => i)
  },
  methods: {
    toggleLayer(layer) {
      if (this.visibleLayers.includes(layer.id)) {
        this.$emit('hideLayer', layer.id)
        this.visibleLayers = this.visibleLayers.filter(l => l !== layer.id)
      } else {
        this.$emit('showLayer', layer)
        this.visibleLayers.push(layer.id)
      }
    },
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