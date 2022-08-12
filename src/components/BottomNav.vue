<template>
  <v-bottom-navigation fixed grow color="teal">

    <v-btn>
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn>
      <span>Play</span>
      <v-icon>mdi-play</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'component-bottom-navigation',
  computed: {
    ...mapGetters([
      'isSessionActive'
    ])
  },
  data: () => ({
    page: 'home'
  }),
  methods: {
    gotoPage: function () {

    }
  }
}
</script>
