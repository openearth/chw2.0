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
        <v-radio
          v-if="item.layer"
          :label="item.name"
          :value="valueFor(item)"
        ></v-radio>
        <template v-else>
          {{ item.name }}
        </template>
      </template>
    </v-treeview>
  </v-radio-group>
</template>

<script>
import findInTree from '@/lib/find-in-tree'


export default {
  props: {
    layers: Array,
    value: null
  },
  data: () => ({
    input: null,
    selected: null
  }),
  mounted() {
    this.selectFirst()
  },
  methods: {
    selectFirst() {
      this.selected = this.layers[0].layer || this.layers[0].children[0]?.layer
      this.opened()
      this.$emit('change', findInTree(this.layers, 'id', this.selected))
    },
    changed (value) {
      this.selected = this.valueFor(value)
      this.$emit('change', findInTree(this.layers, 'id', this.selected))
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