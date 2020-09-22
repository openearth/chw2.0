<template>
  <div>
    <div class="px-4 pt-4">
      <h2 class="h2">
        Modelling
      </h2>

      <v-divider class="mt-4 mb-4" />

      <selection-wizard v-if="wizard" @complete="handleWizardComplete" />
    </div>

    <template v-if="!wizard">
      <template v-if="loading">
        <v-row
          class="py-4"
          justify="center"
        >
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </template>
      <results-viewer
        v-if="Object.keys(data).length && !loading"
        :hazardData="hazardData"
        :riskData="riskData"
        :measuresData="measuresData"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ResultsViewer from '@/components/results-viewer'
import SelectionWizard from '@/components/selection-wizard'

export default {
  components: {
    ResultsViewer,
    SelectionWizard
  },
  data() {
    return {
      activeTab: "",
      wizard: true,
    };
  },
  watch: {
    coordinates(value) {
      if (value.length === 2) {
        this.getDataForSelection()
      }
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
  mounted() {
    if (this.coordinates.length >= 1) {
      this.wizard = false
    }
  },
  methods: {
    ...mapActions({
      getDataForSelection: "selection/getDataForSelection",
    }),
    handleWizardComplete() {
      this.wizard = false
    }
  },
};
</script>
