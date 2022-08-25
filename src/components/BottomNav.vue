<template>
  <v-bottom-navigation fixed horizontal grow height="36"
    color="teal" v-model="page" @change="gotoPage">

    <v-btn text value="home">
      <span>All Games Score</span>
      <v-icon>mdi-counter</v-icon>
    </v-btn>

    <v-btn text value="play">
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
  mounted () {
    if (this.$router.currentRoute.name != 'TotalScores') {
      this.page = 'play'
    } else {
      this.page = 'home'
    }
  },
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
