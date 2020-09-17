<template>
  <div>
    <h2 class="h2">
      Modelling
    </h2>

    <v-divider class="mt-4 mb-4" />

    <p>
      To start, select 2 coordinates using the [add tool icon] tool in the map
    </p>

    <template v-if="loading">
      <v-row
        class="py-4"
        justify="center"
      >
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-row>
    </template>

    <template v-if="Object.keys(data).length && !loading">
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
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import DataTable from "@/components/data-table";

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      activeTab: "",
    };
  },
  watch: {
    coordinates() {
      this.getDataForSelection()
    }
  },
  computed: {
    ...mapState({
      coordinates: (state) => state.selection.coordinates,
      data: (state) => state.selection.data,
      loading: (state) => state.selection.loading,
    }),
    ...mapGetters({
      hazardData: "selection/hazardData",
      riskData: "selection/riskData",
      measuresData: "selection/measuresData",
    }),
  },
  methods: {
    ...mapActions({
      getDataForSelection: "selection/getDataForSelection",
    }),
  },
};
</script>
