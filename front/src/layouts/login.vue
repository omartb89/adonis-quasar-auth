<template>
  <div>
    <q-btn no-caps flat label="Register" class="text-blue absolute-top-right" @click="testAuth"></q-btn>
    <q-card class="absolute-center" style="width: 450px">
      <q-form greedy @submit="login">
        <q-card-section align="center">
          Adonis && Quasar Auth
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
            :type="visibility ? 'text' : 'password'"
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
              <q-btn :ripple="false" dense flat :icon="visibility ? 'visibility_off' : 'visibility'" @click="visibility = !visibility"></q-btn>
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
import { api } from 'boot/axios'
import { Notify, SessionStorage } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup () {
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
            SessionStorage.set('Authenticated', true)
            router.replace('/')
          })
        Notify.create({
          /* message: `The email is ${email.value} and its password is ${password.value}`, */
          message: `The email is ${formData.value.email} and its password is ${formData.value.password}`,
          type: 'positive'
        })
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
