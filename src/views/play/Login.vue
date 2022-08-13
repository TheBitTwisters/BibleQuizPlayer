<template>
  <v-card>
    <v-card-title>
      Login
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">

        <v-text-field label="Name" placeholder="Enter access name"
          v-model="form.data.pass"
          outlined required hide-details>
        </v-text-field>

        <v-btn @click="login">
          Login
        </v-btn>

        <v-alert v-if="form.message != ''" dense>
          {{ form.message }}
        </v-alert>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import apiAuth from '@/api/auth'

export default {
  name: 'view-play-login',
  data: () => ({
    form: {
      data: {
        pass: ''
      },
      valid: false,
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
          this.$store.commit('SET_SESSION', data.session)
          this.$store.commit('SET_PLAY_PLAYER', data.player)
          this.$store.commit('SET_PLAY_GAME', data.game)
          this.$router.go()
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
