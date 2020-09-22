<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-toolbar-title><router-link to="/" class="">CHW</router-link></v-toolbar-title>

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
  </v-app-bar>
</template>
