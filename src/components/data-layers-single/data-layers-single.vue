<template>
  <v-radio-group
    class="radio-tree"
    @change="changed"
    v-model="input"
    :mandatory="false"
    
  >
    <v-treeview
      :items="layers"
      @update:open="opened"
      dense
      shaped
      hoverable
      open-all
    >
      <template
        v-slot:label="{ item }"
      >
      <div class="d-flex align-center">
        <v-radio
          v-if="item.layer"
          :label="item.name"
          :value="valueFor(item)"
        ></v-radio>
      </div>
      </template>
    </v-treeview>
  </v-radio-group>
</template>

<script>
import findInTree from '@/lib/find-in-tree'

export default {
  props: {
    layers: Array,
    value: null,
    activeLegendLayer: {
      type: String,
      required: true
    }
  },
  data: () => ({
    input: 'chw2-vector:coast_segments_flooding', // 
    selected: 'chw2-vector:coast_segments_flooding'
  }),
  mounted() {
    this.selectFirst()
  },
  methods: {
    selectFirst() {
      console.log('this.layers in select first', this.layers)
      this.selected = this.layers[4].layer 
      this.opened()
      this.$emit('change', findInTree(this.layers, 'id', this.selected))
    },
    changed (value) {
      this.selected = this.valueFor(value)
      if (this.selected === 5) {
        this.$store.commit("mapbox/CLEAR_WMS_HAZARD_LAYERS")
      }
      else{
      this.$emit('change', findInTree(this.layers, 'id', this.selected))
      } 
    },
    valueFor (value) {
      // eslint-disable-next-line no-prototype-builtins
      if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
        value = value.id
      }
      return value
    },
    opened () {
      if (!this.input && this.selected) {
        const selected = findInTree(this.layers, 'id', this.selected)
        if (selected) {
          this.input = this.valueFor(selected)
        }
      }
    },
    handleLegendClick(id) {
      this.$emit('legendChange', id)
    }
  }
}
</script>
<style>
.radio-tree {
  margin: 0;
}
.radio-tree.v-input--radio-group > .v-input__control {
  width: 100%;
}

.radio-tree.v-input--radio-group > .v-input__control > .v-input__slot {
  margin: 0;
}

.radio-tree.v-input--radio-group .v-treeview-node__label {
  overflow: visible;
}

.v-treeview-node__level:empty {
  display: none;
}

.v-treeview-node__children .v-treeview-node__level {
  display: block;
}
</style>