<template>
  <v-treeview
    :items="layers"
    @input="handleChange"
    selectable
    open-all
  ></v-treeview>
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
  methods: {
    handleChange(ids) {
      const layers = ids.map(id => findInTree(this.layers, 'id', id)) 
      this.$emit('change', layers)
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