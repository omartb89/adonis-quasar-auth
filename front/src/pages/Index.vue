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
    <q-btn
      label="mail"
      flat
      @click="mailer('melissa.torres@get.tur.cu')"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useHerald } from '../resources/useHerald'
export default defineComponent({
  name: 'PageIndex',
  setup () {
    const { positive, mailer } = useHerald()
    return {
      positive,
      mailer
    }
  }
})
</script>
