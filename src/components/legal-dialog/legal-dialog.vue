<template>
  <v-dialog
    scrollable
    persistent
    v-model="showDialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :max-width="640"
  >
    <v-card class="d-flex flex-column" style="max-height: 100%;overflow:hidden">
      <v-card-title class="pa-5">
        <v-toolbar-title>Coastal Hazard Wheel User Agreement Deltares</v-toolbar-title>
      </v-card-title>

      <div class="px-5 flex-grow-1 overflow-y-auto" v-html="content" />

      <v-card-actions>
        <div class="pa-2" style="width:100%">
          <form action="" submit.prevent>
            <v-checkbox color= "#1b396d" 
              label="I agree with the Conditions of Use"
              class="ma-0"
              v-model="accepted"
              hide-details
            />
            
          </form>
          <div class="mt-2 d-flex">
            <v-spacer></v-spacer>
            <v-btn 
              color="primary"
              :disabled="!allAccepted"
              @click="onStartClick"
            >
              I agree
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import content from '../../content/legal.md'

export default {
  data: () => ({
    content,
    accepted: false,
    
  }),
  computed: {
    ...mapState({
      acceptedLegal: state => state.acceptedLegal
    }),
    showDialog() {
      return !this.acceptedLegal
    },
    allAccepted() {
      console.log('this.accepted')
      return this.accepted;
    },
  },
  methods: {
    ...mapMutations(['SET_ACCEPTED_LEGAL']),
    onStartClick() {
      this.SET_ACCEPTED_LEGAL(true)
    },
  },
};
</script>
