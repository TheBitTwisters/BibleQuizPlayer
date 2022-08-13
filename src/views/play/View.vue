<template>
  <div>

    <Login v-if="!isSessionActive"/>
    <div v-else>

      <div v-if="player != undefined">
        <span>Welcome, {{ player.name }}.</span>
        <v-spacer></v-spacer>
        <v-btn text @click="logout">Logout?</v-btn>
      </div>

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
    player: function () {
      return this.$store.getters.getPlayPlayer()
    },
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    isSessionActive: function () {
      return this.$store.getters.isSessionActive() && this.player != undefined
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
    },
    logout: function () {
      this.$store.commit('SET_PLAY_PLAYER', undefined)
      this.$router.go()
    }
  }
}
</script>
