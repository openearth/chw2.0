<template>
  <div>
    <v-tabs fixed-tabs v-model="activeTab" class="mb-4">
      <v-tab>Hazard</v-tab>
      <v-tab>Risk</v-tab>
      <v-tab>Measures</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-card class="mb-4">
          <v-card-title class="subtitle-1 font-weight-bold">Data results</v-card-title>
          <data-table :data="dataResults" />
        </v-card>
        <v-card>
          <v-card-title class="subtitle-1 font-weight-bold">Coastal environment</v-card-title>
          <data-table :data="coastalEnvironment" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-title class="subtitle-1 font-weight-bold">Risk</v-card-title>
          <data-table :data="riskData" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-title class="subtitle-1 font-weight-bold">Measures</v-card-title>
          <data-table :data="measuresData" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import DataTable from "@/components/data-table";

export default {
  components: {
    DataTable
  },
  data() {
    return {
      activeTab: ''
    }
  },
  props: {
    dataResults: {
      type: Object,
      required: true
    },
    coastalEnvironment: {
      type: Object,
      required: true
    },
    riskData: {
      type: Object,
      required: true
    },
    measuresData: {
      type: Object,
      required: true
    }
  }
}
</script>
