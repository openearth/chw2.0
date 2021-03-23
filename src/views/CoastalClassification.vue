<template>
  <div>
    <div class="pa-4 pb-0">
      <h2 class="h2">Coastal classification</h2>
      <v-divider class="mt-4" />
    </div>

    <div class="pa-4" v-if="error">
      <v-alert type="error">
        <span v-if="error.code">
          {{ error.code }}
        </span>
        {{ error.message || 'There was an error getting the results' }}
      </v-alert>
    </div>

    <div v-if="!error && showWizard" class="pa-4">
      <selection-wizard />
    </div>

    <template v-if="!error && !showWizard">
      <template v-if="loading">
        <v-row class="py-4" justify="center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
      </template>

      <div v-if="Object.keys(data).length && !loading" class="pa-4">
        <p>
          The coastal classification is displayed below with the line representing the specific coastal location. The information displayed is the coastal classification layers, coastal type, hazard profile, risk parameters and relevant hazard management measures. Please note that the classification is based on global datasets and can deviate from the local situation. If you want to make use of special national datasets, please get in touch with us at 
          <a
            href="https://coastalhazardwheel.org"
            rel="noopener noreferrer"
            target="_blank"
            >coastalhazardwheel.org</a
          >
        </p>

        <results-viewer :data="data" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import ResultsViewer from '@/components/results-viewer';
import SelectionWizard from '@/components/selection-wizard';

export default {
  components: {
    ResultsViewer,
    SelectionWizard,
  },
  data() {
    return {
      activeTab: '',
    };
  },
  watch: {
    selectedCoordinate(value) {
      if (value.length) {
        this.getSelection();
      }
    },
    lineCoordinates(value) {
      if (value && value.length === 2) {
        this.getDataForSelection();
      }
    },
  },
  computed: {
    ...mapState({
      selectedCoordinate: (state) => state.selection.selectedCoordinate,
      lineCoordinates: (state) => state.selection.lineCoordinates,
      data: (state) => state.selection.data,
      loading: (state) => state.selection.loading,
      error: (state) => state.selection.error,
    }),
    showWizard() {
      const hasSelectedCoordinate = this.selectedCoordinate;
      const wizardParam =
        this.$route.params.wizard === undefined
          ? true
          : this.$route.params.wizard;

      return wizardParam && !hasSelectedCoordinate;
    },
  },
  async mounted() {
    const { map } = this.$root;

    this.SET_ENABLED(true);

    if (map) {
      map.getCanvas().style.cursor = 'crosshair';
    }
  },
  beforeDestroy() {
    const { map } = this.$root;

    this.SET_LINE_COORDINATES([]);
    this.SET_ENABLED(false);

    map.getCanvas().style.cursor = 'pointer';
  },
  methods: {
    ...mapActions({
      getSelection: 'selection/getSelection',
      getDataForSelection: 'selection/getDataForSelection',
    }),
    ...mapMutations({
      SET_ENABLED: 'selection/SET_ENABLED',
      SET_LINE_COORDINATES: 'selection/SET_LINE_COORDINATES',
    }),
  },
};
</script>
