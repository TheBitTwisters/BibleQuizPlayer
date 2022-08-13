<template>
  <v-card class="mb-3 text-center">
    <v-card-text>
      <div class="">
        {{ game.title }} - {{ game.date | formatDate }}
      </div>
      <div v-if="question != undefined">
        Current Question: #{{question.order}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import apiGames from '@/api/games'

export default {
  name: 'view-play-game',
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
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
    }
  }
}
</script>
