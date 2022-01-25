<template>
  <div>
    <q-btn
      label="add"
      flat
      @click="positive('agency', 'add', 'GET')"
    /><q-btn
      label="edit"
      flat
      @click="positive('agency', 'edit', 'GET')"
    /><q-btn
      label="delete"
      flat
      @click="positive('agency', 'delete', 'GET')"
    /><q-btn
      label="download"
      flat
      @click="positive('agency', 'download', 'GET')"/>
    <q-btn
      label="upload"
      flat
      @click="positive('agency', 'upload', 'GET')"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useHerald } from '../resources/useHerald'
export default defineComponent({
  name: 'PageIndex',
  setup () {
    const { positive } = useHerald()
    return {
      positive
    }
  }
})
</script>
