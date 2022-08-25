<template>
  <v-card class="mb-3">

    <v-list dense>
      <v-list-item>
        {{ game.title }}
        <v-spacer></v-spacer>
        {{ game.date | formatDate }}
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Player</v-list-item-subtitle>
          <v-list-item-title>{{ player.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click="showLogoutDialog = true">
          Change
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- Dialog: Logout -->
    <v-dialog v-model="showLogoutDialog" persistent max-width="320">
      <v-card>
        <v-card-title>Change Player?</v-card-title>
        <v-card-text>Are you sure you want to change player?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showLogoutDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text  @click="logout">
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
import apiGames from '@/api/games'

export default {
  name: 'view-play-game',
  data: () => ({
    showLogoutDialog: false
  }),
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    player: function () {
      return this.$store.getters.getPlayPlayer()
    }
  },
  mounted () {
    this.getGameDetails()
  },
  methods: {
    getGameDetails: function () {
      apiGames.getDetails({ game_id: this.game.id })
        .then(data => {
          this.$store.commit('SET_PLAY_GAME', data.game)
          apiGames.getQuestions({ game_id: this.game.id })
            .then(dataQ => {
              this.$store.commit('SET_PLAY_QUESTIONS', dataQ.questions)
            })
        })
      this.$store.dispatch('play-refresh-game')
    },
    logout: function () {
      this.$store.commit('SET_PLAY_PLAYER', undefined)
      this.$router.go()
    }
  }
}
</script>
