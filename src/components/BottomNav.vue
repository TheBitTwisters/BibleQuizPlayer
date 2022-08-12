<template>
  <v-bottom-navigation fixed grow color="teal" v-model="page" @change="gotoPage">

    <v-btn value="home">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn value="play">
      <span>Play</span>
      <v-icon>mdi-play</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'component-bottom-navigation',
  data: () => ({
    page: 'home'
  }),
  methods: {
    gotoPage: function (page) {
      switch (page) {
        case 'home':
          if (this.$router.currentRoute.name != 'TotalScores')
            this.$router.push('/')
          break
        case 'play':
          if (this.$router.currentRoute.name != 'Play')
            this.$router.push('/play')
          break;
      }
    }
  }
}
</script>
