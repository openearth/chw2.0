<template>
  <div>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1">
        Select first point
      </v-stepper-step>

      <v-stepper-content step="1">
        <p>Select the first point on the [?] side of the coast.</p>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">Select second point</v-stepper-step>

      <v-stepper-content step="2">
        <p>Select the second point on the [?] side of the coast.</p>
      </v-stepper-content>

      <v-stepper-step step="3">Inspect results</v-stepper-step>

      <v-stepper-content step="3">
        <p>The results are shown in 3 tabs: hazard, risk, measures</p>
        <v-btn color="primary" @click="handleCompleteClick">Go to results</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      coordinates: state => state.selection.coordinates
    }),
    step() {
      return this.coordinates.length + 1
    }
  },
  methods: {
    handleCompleteClick() {
      this.$emit('complete')
    }
  }
};
</script>
