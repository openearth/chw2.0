<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-toolbar-title><router-link to="/" class="white--text text-decoration-none">CHW</router-link></v-toolbar-title>

    <v-spacer />

    <v-tabs
      background-color="primary"
      dark
      right
      style="width: auto;"
    >
      <v-tab :to="{ name: 'home' }" exact>
        Introduction 
      </v-tab>
      <v-tab :to="{ name: 'modelling' }">
        Modelling
      </v-tab>
      <v-tab :to="{ name: 'data' }">
        Data
      </v-tab>
    </v-tabs>

    <v-divider
      inset
      vertical
    ></v-divider>

    <load-project-button />

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          @click="handleSaveClick"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </template>
      <span>Save project</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import LoadProjectButton from '@/components/load-project-button'
import { mapActions } from 'vuex'

export default {
  components: {
    LoadProjectButton
  },
  methods: {
    ...mapActions(['loadProject', 'saveProject']),
    handleSaveClick() {
      this.saveProject()
    }
  }
}
</script>
