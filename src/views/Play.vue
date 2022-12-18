<template>
  <v-container>

    <GameDetails/>
    <Question v-if="question != undefined"/>

  </v-container>
</template>

<script>
import GameDetails from '@/components/GameDetails'
import Question from '@/components/Question'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'

export default {
  name: 'view-play',
  components: {
    GameDetails,
    Question
  },
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    isSessionActive: function () {
      return this.$store.getters.isSessionActive() && this.$store.getters.getPlayPlayer() != undefined
    }
  },
  mounted () {
    this.getLevels()
    this.getQuestTypes()
  },
  methods: {
    getLevels: function () {
      apiLevels.getAll()
        .then(data => {
          this.$store.commit('SET_PLAY_LEVELS', data.levels)
        })
    },
    getQuestTypes: function () {
      apiQuestTypes.getAll()
        .then(data => {
          this.$store.commit('SET_PLAY_QUEST_TYPES', data.quest_types)
        })
    }
  }
}
</script>
