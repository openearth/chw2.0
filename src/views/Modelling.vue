<template>
  <div>
    <v-tabs height="60" grow>
      <v-tab :to="{ name: 'hazard-maps' }">
        Hazard map 
      </v-tab>
      <v-tab :to="{ name: 'coastal-classification' }">
        Coastal classification
      </v-tab>
    </v-tabs>

    <router-view />
  </div>
</template>