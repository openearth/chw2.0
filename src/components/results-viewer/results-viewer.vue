<template>
  <div>
    <v-tabs fixed-tabs v-model="activeTab">
      <v-tab>Hazard</v-tab>
      <v-tab>Risk</v-tab>
      <v-tab>Measures</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <data-table :data="hazardData" />
      </v-tab-item>
      <v-tab-item>
        <data-table :data="riskData" />
      </v-tab-item>
      <v-tab-item>
        <data-table :data="measuresData" />
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
    hazardData: {
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
