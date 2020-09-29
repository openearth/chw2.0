<template>
  <div>
    <div v-if="wizard" class="pa-4">
      <selection-wizard @complete="handleWizardComplete" />
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

      <div v-if="Object.keys(data).length && !loading" class="pa-4">
        <p>
          The points form a line that is used to derive coastal characteristics.
          These characteristics are the basis for a description of the coastal
          environment. Bear in mind that the data used is global data and there
          can deviate from the local situation. In general the global data can
          be quite coarse. If you want to use your own datasets, please get in
          contact with the <a href="https://coastalhazardwheel.org" rel="noopener noreferrer" target="_blank">coastalhazardwheel.org</a> foundation.
        </p>

        <results-viewer
          :dataResults="dataResults"
          :coastalEnvironment="coastalEnvironment"
          :riskData="riskData"
          :measuresData="measuresData"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
      dataResults: "selection/dataResults",
      coastalEnvironment: "selection/coastalEnvironment",
      riskData: "selection/riskData",
      measuresData: "selection/measuresData",
    }),
  },
  beforeMount() {
    this.SET_ENABLED(true)

    if (this.coordinates.length >= 1 || this.$route.params.wizard === false) {
      this.wizard = false
    }
  },
  beforeDestroy() {
    this.SET_COORDINATES([])
    this.SET_ENABLED(false)
  },
  methods: {
    ...mapActions({
      getDataForSelection: "selection/getDataForSelection",
    }),
    ...mapMutations({
      SET_ENABLED: 'selection/SET_ENABLED',
      SET_COORDINATES: 'selection/SET_COORDINATES'
    }),
    handleWizardComplete() {
      this.wizard = false
    }
  },
};
</script>
