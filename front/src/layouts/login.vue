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
            class="q-mx-md"
            type="text"
            v-model="formData.email"
            :lazy-rules="true"
            :rules="[
              val => val !== '' || 'This field is required'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="person"></q-icon>
            </template>
          </q-input>
          <q-input
            class="q-mx-md"
            :type="visibility ? 'password' : 'text'"
            v-model="formData.password"
            :lazy-rules="true"
            :rules="[
              val => val !== '' || 'This field is required'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="vpn_key"></q-icon>
            </template>
            <template v-slot:append>
              <q-btn :ripple="false" dense flat :icon="visibility ? 'visibility' : 'visibility_off'" @click="visibility = !visibility"></q-btn>
            </template>
          </q-input>
          <div class="row justify-center">
            <q-btn type="submit" class="bg-dark text-amber" >Accept</q-btn>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useHerald } from 'src/resources/useHerald'
import { api } from 'boot/axios'
import { SessionStorage } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup () {
    const { positive } = useHerald()
    const formData = ref({
      email: '',
      password: ''
    })
    const visibility = ref('false')
    const router = useRouter()
    return {
      formData,
      visibility,
      login () {
        api.post('/login', {
          email: formData.value.email,
          password: formData.value.password
        })
          .then((response) => {
            const data = response.data
            console.log(data)
            SessionStorage.set('user', {
              email: formData.value.email,
              token: data.token
            })
            SessionStorage.set('isAuthenticated', true)
            router.replace('/')
          })
        positive(formData.value.email, 'login')
      },
      testAuth () {
        api.get('/secured')
          .then((result) => {
            console.log(result)
          })
      }
    }
  }
})
</script>
