<template>
  <div id="biblequiz-player-play">

    <div class="title my-5">
      Bible Quiz -
      {{ game.title }}
    </div>

    <v-card v-if="question">

      <v-card-title v-text="question.question">
      </v-card-title>

      <v-card-text v-if="choices.length == 4">
        <v-btn-toggle
          v-model="choiceIndex"
          @change="submitAnswer()">
          <v-btn>
            A
          </v-btn>
          <v-btn>
            B
          </v-btn>
          <v-btn>
            C
          </v-btn>
          <v-btn>
            D
          </v-btn>
        </v-btn-toggle>
      </v-card-text>

      <v-card-text v-if="choices.length == 2">
        <v-btn-toggle
          v-model="choiceIndex"
          @change="submitAnswer()">
          <v-btn>
            True
          </v-btn>
          <v-btn>
            False
          </v-btn>
        </v-btn-toggle>
      </v-card-text>

      <v-card-text v-if="choices.length == 1">
        <v-textarea outlined v-model="textAnswer">
        </v-textarea>
      </v-card-text>

      <v-card-text v-if="answeredQuestionID > 0">
        Answer submitted
      </v-card-text>

    </v-card>

  </div>
</template>

<script>
import store from '@/store'
import apiAnswers from '@/api/answers'

export default {
  name: 'view-play',
  props: {
    game_id: {
      type: String || Number
    }
  },
  data: () => ({
    choiceLabel: '',
    textAnswer: '',
    answeredQuestionID: 0
  }),
  computed: {
    game: () => store.state.play.game,
    question: () => store.state.play.question,
    choices: () => store.state.play.question.choices,
    player: () => store.state.session.player
  },
  watch: {
    question: function (v) {
      if (v.id != this.answeredQuestionID) {
        this.answeredQuestionID = 0
        this.choiceIndex = null
        this.textAnswer = ''
      }
    }
  },
  mounted () {
    var self = this
    setInterval(function () {
      store.dispatch('play-game', { game_id: self.game_id })
    }, 1000)
  },
  methods: {
    submitAnswer: function () {
      var answer = '', self = this
      if (this.choices.length >= 4) {
        if (this.choiceIndex == 3) answer = 'D'
        if (this.choiceIndex == 2) answer = 'C'
        if (this.choiceIndex == 1) answer = 'B'
        if (this.choiceIndex == 0) answer = 'A'
      } else if (this.choices.length >= 2) {
        if (this.choiceIndex == 1) answer = 'False'
        if (this.choiceIndex == 0) answer = 'True'
      } else {
        answer = this.textAnswer
      }
      apiAnswers.submitAnswer({
        game_id: this.game.id,
        question_id: this.question.id,
        player_id: this.player.id,
        answer: answer
      }).then(response => {
        this.answeredQuestionID = self.question.id
        alert(response.message)
      })
    }
  }
}
</script>
