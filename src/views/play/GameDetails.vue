<template>
  <v-card class="mb-3 text-center">
    <v-card-text>
      <div class="">
        {{ game.title }} - {{ game.date | formatDate }}
      </div>
      <div class="" v-if="question != undefined">
        Current Question: #{{question.order}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'view-play-game',
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    
  }
}
</script>
