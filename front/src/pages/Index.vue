<template>
  <div>
    <q-btn
      label="Test"
      flat
      @click="positive('Omar', 'login')"
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
