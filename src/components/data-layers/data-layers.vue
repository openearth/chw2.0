<template>
  <v-radio-group
    class="radio-tree"
    @change="changed"
    v-model="input"
    :mandatory="false"
  >
    <v-treeview
      :items="items"
      @update:open="opened"
      dense
      shaped
      hoverable
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
export default {
  props: {
    items: Array,
    value: null // accept any type
  },
  data: () => ({
    input: null,
    selected: null
  }),
  methods: {
    changed (value) {
      this.selected = this.valueFor(value)
      this.$emit('change', this.findInTree(this.selected))
    },
    valueFor (value) {
      // eslint-disable-next-line no-prototype-builtins
      if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
        value = value.id
      }

      return value
    },
    findInTree (value, path = '*', key = null, items = null) {
      if (!key) {
        key = this.id
      }
      if (!key) {
        key = 'id'
      }
      if (!items) {
        items = this.items
      }
      if (items && items.length) {
        if (typeof value === 'object') {
          value = value[key]
        }
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (!item) {
            continue
          }
          if (item[key] === value) {
            return item
          }
          else if (item.children && item.children.length) {
            let checkChildren = true
            if (Array.isArray(path)) {
              const pathIndex = path.findIndex(check => (check === item[key]))
              if (pathIndex !== -1) {
                path.splice(pathIndex, 1)
              }
              else {
                checkChildren = false
              }
            }
            if (checkChildren) {
              const foundInChild = this.findInTree(value, path, key, item.children)
              if (foundInChild) {
                return foundInChild
              }
            }
          }
        }
      }
      return null
    },
    opened (list) {
      if (!this.input && this.selected) {
        const selected = this.findInTree(this.selected, list)
        if (selected) {
          this.input = this.valueFor(selected)
        }
      }
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
</style>