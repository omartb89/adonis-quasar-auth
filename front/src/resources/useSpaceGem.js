import { Screen } from 'quasar'
import { computed } from 'vue'
export const useSpaceGem = () => {
  const smallScreen = computed(() => {
    return Screen.lt.md
  })
  const extraSmallScreen = computed(() => {
    return Screen.lt.sm
  })
  return {
    smallScreen,
    extraSmallScreen
  }
}
