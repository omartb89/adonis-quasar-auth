<template>
  <div>
    <q-btn no-caps flat label="Register" class="text-blue absolute-top-right" @click="testAuth"></q-btn>
    <q-card class="absolute-center" style="width: 450px">
      <q-form greedy @submit="login">
        <q-card-section>
          <div class="row justify-center items-center">
            <q-avatar size="sm"><q-img src="../assets/adonisjs-original.svg"></q-img></q-avatar>
            <span class="text-h6">donis & </span>
            <q-img class="q-mx-sm" fit="contain" width="30%" src="../assets/logotype.svg"></q-img>
            <q-avatar size="sm"><q-img src="../assets/logo.svg"></q-img></q-avatar>
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            dense
            class="q-mx-md"
            type="text"
            v-model="formData.email"
            :lazy-rules="true"
            :rules="[
              val => val !== '' || 'This field is required'
            ]"
          >
            <template v-slot:prepend>
              <q-icon dense name="person"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            class="q-mx-md"
            :type="visibility ? 'password' : 'text'"
            v-model="formData.password"
            :lazy-rules="true"
            :rules="[
              val => val !== '' || 'This field is required'
            ]"
          >
            <template v-slot:prepend>
              <q-icon dense name="vpn_key"></q-icon>
            </template>
            <template v-slot:append>
              <q-btn :ripple="false" dense flat :icon="visibility ? 'visibility' : 'visibility_off'" @click="visibility = !visibility"></q-btn>
            </template>
          </q-input>
          <q-input
            dense
            v-if="register"
            class="q-mx-md"
            :type="visibility2 ? 'password' : 'text'"
            v-model="formData.password_confirmation"
          >
            <template v-slot:prepend>
              <q-icon name="vpn_key"></q-icon>
            </template>
            <template v-slot:append>
              <q-btn :ripple="false" dense flat :icon="visibility2 ? 'visibility' : 'visibility_off'" @click="visibility2 = !visibility2"></q-btn>
            </template>
          </q-input>
          <div class="row justify-center">
            <q-checkbox dense label="Register" v-model="register"/>
          </div>
          <div class="row justify-center">
            <q-btn no-caps type="submit" class="bg-dark text-amber q-mt-md" >Accept</q-btn>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useHerald } from 'src/resources/useHerald'
import { useSentinel } from 'src/resources/useSentinel'
import { api } from 'boot/axios'
import { SessionStorage } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup () {
    const { positive, negative } = useHerald()
    // eslint-disable-next-line no-unused-vars
    const { securePassword } = useSentinel()
    const formData = ref({
      email: '',
      password: '',
      password_confirmation: ''
    })
    const visibility = ref('false')
    const visibility2 = ref('false')
    const register = ref(false)
    const router = useRouter()
    return {
      formData,
      register,
      visibility,
      visibility2,
      login () {
        api.post('/login', {
          email: formData.value.email,
          password: formData.value.password
        })
          .then((response) => {
            const data = response.data
            SessionStorage.set('user', {
              email: formData.value.email,
              token: data.token
            })
            SessionStorage.set('isAuthenticated', true)
            router.replace('/')
            positive('user', 'login', formData.value.email)
          })
          .catch((error) => {
            negative(error.response.data, 'warning', error.response.status)
          })
      },
      testAuth () {
        api.get('/secured')
          .then((result) => {
            console.log(result)
          }).catch((error) => {
            error.response.data.errors.forEach((element) => {
              negative(element.message, 'error', error.response.status)
            })
          })
      }
    }
  }
})
</script>
