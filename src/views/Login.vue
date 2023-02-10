<template>
  <v-container>
    <v-card>
      <v-card-title>
        Play Bible Quiz
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">

          <v-text-field label="Access Code" placeholder="Enter access code" class="mb-3"
            v-model="form.data.pass"
            dense outlined required hide-details>
          </v-text-field>

          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn @click="login">
              Play
            </v-btn>
          </div>

        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import apiAuth from '@/api/auth'

export default {
  name: 'view-login',
  data: () => ({
    form: {
      data: {
        pass: ''
      },
      valid: false,
      submitting: false,
      success: false
    }
  }),
  methods: {
    login: function () {
      this.form.submitting = true
      this.form.message = ''
      apiAuth.login(this.form.data)
        .then(data => {
          this.$store.commit('SET_SESSION', data.session)
          this.$store.commit('SET_PLAY_PLAYER', data.player)
          this.$store.commit('SET_PLAY_GAME', data.game)
          this.$router.push('/play')
        })
        .catch(err => {
          console.log(err)
          this.$store.commit('SHOW_SNACKBAR', {
            status: 'error',
            message: err.message
          })
        })
    }
  }
}
</script>
