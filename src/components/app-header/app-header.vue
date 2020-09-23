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
      <v-tab :to="{ name: 'sources' }">
        Sources
      </v-tab>
    </v-tabs>

    <v-btn @click="handleSaveClick">Save 💾</v-btn>
    <v-btn @click="handleSaveClick">Load 📂</v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['saveProject']),
    handleSaveClick() {
      this.saveProject()
    }
  }
}
</script>
