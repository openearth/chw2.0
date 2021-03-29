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
        <v-toolbar-title>Coastal Hazard Wheel App User Agreement</v-toolbar-title>
      </v-card-title>

      <div class="px-5 flex-grow-1 overflow-y-auto" v-html="content" />

      <v-card-actions>
          <form action="" submit.prevent style="width:100%" >
            <div class="d-flex pa-2" >
              <v-btn 
                color="primary"
                @click="onStartClick"
                class="ml-auto"
              >
                I agree
              </v-btn>
           </div>
          </form>
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
