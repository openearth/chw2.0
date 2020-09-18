<template>
  <div class="layers-layout">
     <div class="header">
      <v-card small flat>
        <v-card-title>
          <h1>
            Layers
          </h1>
        </v-card-title>
      </v-card>
  </div>
  <div class="layer-div">
    <v-list >
      <v-list-group v-for="layer in layers" :key="layer.folder">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="layer.folder"></v-list-item-title>
            </v-list-item-content>
          </template>

          <li
            class=""
            v-for="lyr in layer.layers"
            :key="lyr.title"
          >
            <v-btn text icon @click.stop="$emit('updateVisibility', lyr.id)">
          <v-icon>{{ lyr.visible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </v-btn>
        <v-btn text icon @click.stop="$emit('updateLegend', lyr.layer)">
          <v-icon>{{ lyr.layer === activeLegendLayer ? 'mdi-card-bulleted' : 'mdi-card-bulleted-off' }}</v-icon>
        </v-btn>
        <span class="layer-list__item-title">
          {{ lyr.title }}
        </span>
          </li>
    
      </v-list-group>
    </v-list>
  </div>
  </div>

</template>

<script>
import { mapState } from "vuex"; 
export default {
  
  computed: {
    ...mapState({
      layers: (state) => state.mapbox.layers
    })
  }, 
  methods: {
    doit() {
      console.log('succeed')
    }
  }
}
</script>

<style>
</style>