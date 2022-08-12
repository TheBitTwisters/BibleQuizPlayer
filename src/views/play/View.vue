<template>
  <div>

    <Login v-if="!isSessionActive"/>
    <div v-else>

      <p>Welcome, {{ player.name }}</p>

    </div>

  </div>
</template>

<script>
import Login from './Login'

export default {
  name: 'view-play',
  components: {
    Login
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
      return this.$store.getters.isSessionActive()
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
