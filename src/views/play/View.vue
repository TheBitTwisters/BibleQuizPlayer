<template>
  <div>

    <Login v-if="!isSessionActive"/>
    <div v-else>

      <GameDetails/>
      <Question v-if="question != undefined"/>

    </div>

  </div>
</template>

<script>
import Login from './Login'
import GameDetails from './GameDetails'
import Question from './Question'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'

export default {
  name: 'view-play',
  components: {
    Login,
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
