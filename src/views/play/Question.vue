<template>
  <v-card v-if="question">

    <v-card-title style="word-break: break-word;">
      {{ question.question }}
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text v-if="choices.length == 4">
      <v-btn-toggle block
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
      <v-btn-toggle block
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
</template>

<script>
import apiAQuestions from '@/api/questions'

export default {
  name: 'view-play',
  data: () => ({
    choiceIndex: null,
    choiceLabel: '',
    textAnswer: '',
    answeredQuestionID: 0
  }),
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    choices: function () {
      return this.$store.getters.getPlayCurrentQuestionChoices()
    },
    player: function () {
      return this.$store.getters.getPlayPlayer()
    }
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
      apiAQuestions.submitAnswer({
        game_id: this.game.id,
        question_id: this.question.id,
        player_id: this.player.id,
        answer: answer
      }).then(response => {
        this.answeredQuestionID = self.question.id
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
      }).catch(err => {
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
