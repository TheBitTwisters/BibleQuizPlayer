<template>
  <div class="biblequiz-dashboard text-center">
    <h1 class="my-5">Bible Quiz</h1>

    <v-list>
      <template v-for="game in games">
        <v-list-item :key="game.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ game.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ game.date | formatDate }}
            </v-list-item-subtitle>
            <v-btn @click="joinGame(game.id)">
              Join Game
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="game.id"></v-divider>
      </template>
    </v-list>

  </div>
</template>

<script>
import store from '@/store'
import apiGames from '@/api/games'

export default {
  name: 'view-dashboard',
  data: () => ({
    games: []
  }),
  mounted () {
    this.getPlayGames()
  },
  methods: {
    getPlayGames: function () {
      apiGames.getPlayGames()
        .then(response => {
          this.games = response.games
        }).catch(err => {
          console.log(err)
        })
    },
    joinGame: function (game_id) {
      store.dispatch('play-game', { game_id: game_id })
    }
  }
}
</script>
