<template>
  <div>
    <q-card class="absolute-center" style="width: 450px">
      <q-form greedy @submit="register ? signIn() : login()">
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
            type="email"
            v-model="formData.email"
            :lazy-rules="true"
            :rules="[
              val => val !== '' || 'This field is required',
              val => secureMail(val) || 'This is not a valid mail format'
            ]"
          >
            <template v-slot:prepend>
              <q-icon dense name="person"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            class="q-mx-md"
            :type="visibility ? 'text' : 'password'"
            v-model="formData.password"
            :lazy-rules="true"
            :rules="[
              val => val !== '' || 'This field is required',
              val => securePassword(val) || 'Password should contain at least eight characters, a capital letter and a digit'
            ]"
          >
            <template v-slot:prepend>
              <q-icon dense name="vpn_key"></q-icon>
            </template>
            <template v-slot:append>
              <q-btn :ripple="false" no-caps dense flat label="Forgot Password?" class="text-caption" @click="info('This function is not yet implemented')"></q-btn>
              <q-btn :ripple="false" dense flat :icon="visibility ? 'visibility' : 'visibility_off'" @click="visibility = !visibility"></q-btn>
            </template>
          </q-input>
          <q-input
            dense
            v-if="register"
            :lazy-rules="register"
            :rules="!register || [
              val => val !== '' || 'This field is required',
              val => securePasswordConfirmation(val, formData.password) || 'Password fields did not matched'
            ]"
            class="q-mx-md"
            :type="visibility2 ? 'text' : 'password'"
            v-model="formData.password_confirmation"
          >
            <template v-slot:prepend>
              <q-icon name="vpn_key"></q-icon>
            </template>
            <template v-slot:append>
              <q-btn
                :ripple="false"  dense flat :icon="visibility2 ? 'visibility' : 'visibility_off'" @click="visibility2 = !visibility2"></q-btn>
            </template>
          </q-input>
          <div class="row justify-center q-mt-md">
            <q-btn no-caps type="submit" color="dark" text-color="amber" label="Accept"/>
            <q-btn no-caps flat color="dark" @click="register = !register" :label="register ? 'Sign in' : 'Sign up'"/>
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
    const { positive, negative, info, mailer, unverified } = useHerald()
    const { secureMail, securePassword, securePasswordConfirmation } = useSentinel()
    const formData = ref({
      email: '',
      password: '',
      password_confirmation: ''
    })
    const altLabel = ref('Sing up')
    const visibility = ref(false)
    const visibility2 = ref(false)
    const register = ref(false)
    const router = useRouter()
    return {
      formData,
      altLabel,
      register,
      visibility,
      visibility2,
      secureMail,
      securePassword,
      securePasswordConfirmation,
      info,
      mailer,
      unverified,
      login () {
        api.post('/login', {
          email: formData.value.email,
          password: formData.value.password
        })
          .then((response) => {
            const data = response.data
            console.log(data)
            if (!data) {
              unverified(formData.value.email, {
                email: formData.value.email
              })
            } else {
              SessionStorage.set('user', {
                email: formData.value.email,
                token: data.token
              })
              SessionStorage.set('isAuthenticated', true)
              router.replace('/')
              positive('user', 'login', formData.value.email)
            }
          })
          .catch((error) => {
            negative(error.response.data, 'warning', error.response.status)
          })
      },
      signIn () {
        api.post('/register', {
          email: formData.value.email,
          password: formData.value.password,
          password_confirmation: formData.value.password_confirmation
        })
          .then(() => {
            positive('user', 'add', formData.value.email)
            setTimeout(mailer, 5000, formData.value.email)
          })
          .catch((error) => {
            error.response.data.errors.forEach((element) => {
              negative(element.message, 'error', error.response.status)
            })
          })
      }
    }
  }
})
</script>
