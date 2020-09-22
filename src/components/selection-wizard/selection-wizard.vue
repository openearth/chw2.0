<template>
  <div>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1">
        Zoom in
      </v-stepper-step>

      <v-stepper-content step="1">
        <p>
          Please zoom in to your area of interest somewhere on the coast, you
          can do this either by zooming with you mousewheel or by typing in the
          area of interest in the search bar.
        </p>

        <v-btn @click="zoomCompleted = true" class="primary">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">
        Select first point
      </v-stepper-step>

      <v-stepper-content step="2">
        <p>
          Set the first point of your transect in see in front of the coast.
        </p>

        <v-card>
          <img src="@/assets/step1.png" width="100%" class="d-flex" />
        </v-card>
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="3">Select second point</v-stepper-step>

      <v-stepper-content step="3">
        <p>
          Set the second (and end) point of your transect.
        </p>

        <v-card>
          <img src="@/assets/step2.png" width="100%" class="d-flex" />
        </v-card>
      </v-stepper-content>

      <v-stepper-step :complete="step === 4" step="4">Info</v-stepper-step>

      <v-stepper-content step="4">
        <p>
          The points form a line that is used to derive coastal characteristics.
          These characteristics are the basis for a description of the coastal
          environment. Bear in mind that the data used is global data and there
          can deviate from the local situation. In general the global data can
          be quite coarse. If you want to use your own datasets, please get in
          contact with the <a href="https://coastalhazardwheel.org" rel="noopener noreferrer" target="_blank">coastalhazardwheel.org</a> foundation.
        </p>

        <v-btn @click="handleCompleteClick" class="primary">See results</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      zoomCompleted: false,
    };
  },
  computed: {
    ...mapState({
      coordinates: (state) => state.selection.coordinates,
    }),
    step() {
      if (this.zoomCompleted) {
        return this.coordinates.length + 2
      } else {
        return 1;
      }
    },
  },
  watch: {
    step(value) {
      // disable selection on step 1
      this.SET_ENABLED(!(value === 1))
    }
  },
  mounted() {
    this.SET_ENABLED(false)
  },
  methods: {
    ...mapMutations({
      SET_ENABLED: 'selection/SET_ENABLED'
    }),
    handleCompleteClick() {
      this.$emit("complete");
    }
  }
};
</script>
