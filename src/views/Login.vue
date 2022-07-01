<template>
  <div id="biblequiz-login">
    <h1 class="my-5 text-center">Bible Quiz</h1>
    <v-card class="mx-auto" max-width="360px">
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">

          <v-text-field label="Name" placeholder="Enter name"
            v-model="form.data.name"
            outlined required hide-details>
          </v-text-field>

          <v-alert v-if="form.message != ''" dense>
            {{ form.message }}
          </v-alert>

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from '@/store'
import apiAuth from '@/api/auth'

export default {
  name: 'view-auth-login',
  data: () => ({
    form: {
      data: {
        name: ''
      },
      valid: false,
      showPassword: false,
      submitting: false,
      message: '',
      success: false
    }
  }),
  methods: {
    login: function () {
      this.form.submitting = true
      this.form.message = ''
      apiAuth.login(this.form.data)
        .then(data => {
          this.form.message = data.message
          store.dispatch('session-login', data)
        })
        .catch(err => {
          console.log(err)
          this.form.message = err.message
        })
        .finally(() => {
          this.form.submitting = false
        })
    }
  }
}
</script>
