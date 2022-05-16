<template>
  <q-table
    dense
    :title="tableName"
    :rows="dataProps"
    :pagination="paginator"
  >
  </q-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'TableMaker',
  props: {
    title: {
      String,
      default: ''
    },
    data: {
      Array,
      default: []
    },
    pagination: {
      Object,
      default: {}
    }
  },
  setup (props) {
    const tableName = ref(props.title)
    const dataProps = ref(props.data)
    const paginator = ref(props.pagination)
    return {
      tableName,
      dataProps,
      paginator
    }
  }
})
</script>
