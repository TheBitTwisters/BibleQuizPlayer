<template>
  <v-card v-if="question">

    <v-card-text>
      Current Question:
      #{{question.order}}
      {{getLevelByID(question.level_id).name}} |
      {{getQuestTypeByID(question.type_id).name}} |
      {{question.score}}PTS
    </v-card-text>

    <v-divider></v-divider>

    <v-card-title style="word-break: break-word;">
      {{ question.question }}
    </v-card-title>

    <v-divider v-if="question.submitted_answer"></v-divider>
    <v-card-text class="teal white--text" v-if="question.submitted_answer">
      Submitted answer: {{ question.submitted_answer }}
    </v-card-text>

    <v-divider></v-divider>

    <MultipleChoices v-if="choices.length == 4"/>
    <TrueFalse v-if="choices.length == 2"/>
    <Identification v-if="choices.length == 1"/>

  </v-card>
</template>

<script>
import MultipleChoices from './QTypes/MultipleChoices'
import TrueFalse from './QTypes/TrueFalse'
import Identification from './QTypes/Identification'

export default {
  name: 'view-play-question',
  components: {
    MultipleChoices,
    TrueFalse,
    Identification
  },
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
  methods: {
    getLevelByID: function (level_id) {
      for (let level of this.$store.getters.getPlayLevels()) {
        if (level_id == level.id) {
          return level
        }
      }
      return { name: '' }
    },
    getQuestTypeByID: function (type_id) {
      for (let type of this.$store.getters.getPlayQuestTypes()) {
        if (type_id == type.id) {
          return type
        }
      }
      return { name: '' }
    }
  }
}
</script>
