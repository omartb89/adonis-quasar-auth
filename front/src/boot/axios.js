import { boot } from 'quasar/wrappers'
import { SessionStorage } from 'quasar'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let api = axios.create({ baseURL: 'http://127.0.0.1:3333/api' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios.create({ baseURL: 'http://127.0.0.1:3333/api' })
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  app.config.globalProperties.$axios.interceptors.request.use((config) => {
    if (!SessionStorage.isEmpty()) {
      const token = SessionStorage.getItem('user').token
      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    config.headers.withCredentials = true
    return config
  })
  api = app.config.globalProperties.$axios
  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
